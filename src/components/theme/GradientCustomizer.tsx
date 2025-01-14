import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface GradientCustomizerProps {
  onGradientChange: (gradient: string) => void;
  onSaveGradient: (gradient: string, name: string) => void;
  currentGradient?: string;
}

const directions = [
  { value: "90deg", label: "Horizontal" },
  { value: "180deg", label: "Vertical" },
  { value: "45deg", label: "Diagonal ↗" },
  { value: "135deg", label: "Diagonal ↘" },
];

const extractColorsFromGradient = (gradient: string) => {
  const matches = gradient.match(/#[a-fA-F0-9]{6}/g);
  return matches || ["#9b87f5", "#7E69AB"];
};

const extractDirectionFromGradient = (gradient: string) => {
  const match = gradient.match(/\d+deg/);
  return match ? match[0] : "90deg";
};

export const GradientCustomizer = ({ onGradientChange, onSaveGradient, currentGradient }: GradientCustomizerProps) => {
  const { toast } = useToast();
  const [startColor, setStartColor] = useState("#9b87f5");
  const [endColor, setEndColor] = useState("#7E69AB");
  const [direction, setDirection] = useState("90deg");
  const [gradientName, setGradientName] = useState("");

  useEffect(() => {
    if (currentGradient) {
      const [start, end] = extractColorsFromGradient(currentGradient);
      const dir = extractDirectionFromGradient(currentGradient);
      setStartColor(start);
      setEndColor(end);
      setDirection(dir);
    }
  }, [currentGradient]);

  const handleChange = () => {
    const gradient = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    onGradientChange(gradient);
  };

  const handleSave = () => {
    if (!gradientName.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un nombre para el degradado",
        variant: "destructive",
      });
      return;
    }

    const gradient = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    onSaveGradient(gradient, gradientName);
    setGradientName("");
    
    toast({
      title: "¡Éxito!",
      description: "Degradado guardado en la paleta",
    });
  };

  return (
    <div className="space-y-4 p-2">
      <div className="space-y-2">
        <Label>Color Inicial</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={startColor}
            onChange={(e) => {
              setStartColor(e.target.value);
              handleChange();
            }}
            className="w-full h-10 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Color Final</Label>
        <div className="flex gap-2">
          <input
            type="color"
            value={endColor}
            onChange={(e) => {
              setEndColor(e.target.value);
              handleChange();
            }}
            className="w-full h-10 cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Dirección del Degradado</Label>
        <Select
          value={direction}
          onValueChange={(value) => {
            setDirection(value);
            handleChange();
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona la dirección" />
          </SelectTrigger>
          <SelectContent>
            {directions.map((dir) => (
              <SelectItem key={dir.value} value={dir.value}>
                {dir.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 p-4 rounded-lg border" style={{ backgroundImage: `linear-gradient(${direction}, ${startColor}, ${endColor})` }}>
        <p className="text-center text-white font-medium">Vista previa</p>
      </div>

      <div className="space-y-2">
        <Label>Nombre del Degradado</Label>
        <div className="flex gap-2">
          <input
            type="text"
            value={gradientName}
            onChange={(e) => setGradientName(e.target.value)}
            placeholder="Mi degradado personalizado"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button onClick={handleSave} className="gradient-bg">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};