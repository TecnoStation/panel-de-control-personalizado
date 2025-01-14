import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GradientCustomizerProps {
  onGradientChange: (gradient: string) => void;
}

const directions = [
  { value: "90deg", label: "Horizontal" },
  { value: "180deg", label: "Vertical" },
  { value: "45deg", label: "Diagonal ↗" },
  { value: "135deg", label: "Diagonal ↘" },
];

export const GradientCustomizer = ({ onGradientChange }: GradientCustomizerProps) => {
  const [startColor, setStartColor] = useState("#9b87f5");
  const [endColor, setEndColor] = useState("#7E69AB");
  const [direction, setDirection] = useState("90deg");

  const handleChange = () => {
    const gradient = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    onGradientChange(gradient);
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
    </div>
  );
};