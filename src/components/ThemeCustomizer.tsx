import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const colors = [
  { name: "Púrpura", primary: "267 77% 74%", sidebar: "267 77% 74%" },
  { name: "Azul Océano", primary: "199 89% 48%", sidebar: "199 89% 48%" },
  { name: "Verde Esmeralda", primary: "142 71% 45%", sidebar: "142 71% 45%" },
  { name: "Rojo Rubí", primary: "0 84% 60%", sidebar: "0 84% 60%" },
  { name: "Naranja", primary: "24 95% 64%", sidebar: "24 95% 64%" },
  { name: "Rosa", primary: "316 73% 52%", sidebar: "316 73% 52%" },
  { name: "Magenta", primary: "322 81% 61%", sidebar: "322 81% 61%" },
  { name: "Índigo", primary: "245 58% 51%", sidebar: "245 58% 51%" },
];

export const ThemeCustomizer = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#9b87f5");
  const [selectedColor, setSelectedColor] = useState<{ name: string; primary: string; sidebar: string } | null>(null);

  const changeTheme = (color: { name: string; primary: string; sidebar: string }) => {
    const root = document.documentElement;
    
    root.style.setProperty("--primary", color.primary);
    root.style.setProperty("--sidebar-background", color.sidebar);
    root.style.setProperty("--sidebar-primary", color.primary);
    root.style.setProperty("--sidebar-ring", color.primary);
    
    root.style.setProperty("--sidebar-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-primary-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-accent", "0 0% 100% / 0.1");
    root.style.setProperty("--sidebar-accent-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-border", "0 0% 100% / 0.1");
    
    toast({
      title: "Tema actualizado",
      description: "El color del tema ha sido cambiado exitosamente.",
      duration: 2000,
    });

    setOpen(false);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    
    // Convertir el color hex a HSL
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      
      h *= 60;
    }

    const hslColor = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    setSelectedColor({ name: "Personalizado", primary: hslColor, sidebar: hslColor });
  };

  const handlePresetColorClick = (color: typeof colors[0]) => {
    setSelectedColor(color);
  };

  const handleApplyColor = () => {
    if (selectedColor) {
      changeTheme(selectedColor);
    }
  };

  const allColors = [...colors];
  if (selectedColor && selectedColor.name === "Personalizado") {
    allColors.push(selectedColor);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-lg"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Personalizar tema</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="presets">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Preestablecidos</TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          <TabsContent value="presets">
            <div className="grid grid-cols-4 gap-4 py-4">
              {allColors.map((color, index) => (
                <button
                  key={color.name || index}
                  onClick={() => handlePresetColorClick(color)}
                  className={`group relative aspect-square rounded-full ${
                    selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  style={{ background: `hsl(${color.primary})` }}
                >
                  <span className="sr-only">{color.name}</span>
                  <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="custom">
            <div className="py-4 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="custom-color" className="text-sm font-medium">
                  Selecciona un color personalizado
                </label>
                <input
                  type="color"
                  id="custom-color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end mt-4">
          <Button onClick={handleApplyColor} disabled={!selectedColor}>
            Elegir color
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};