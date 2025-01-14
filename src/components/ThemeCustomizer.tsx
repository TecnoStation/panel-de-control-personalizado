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

const gradients = [
  { 
    name: "Atardecer",
    value: "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)"
  },
  {
    name: "Océano Profundo",
    value: "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)"
  },
  {
    name: "Primavera",
    value: "linear-gradient(184.1deg, rgba(249,255,182,1) 44.7%, rgba(226,255,172,1) 67.2%)"
  },
  {
    name: "Amanecer",
    value: "linear-gradient(90deg, hsla(29, 92%, 70%, 1) 0%, hsla(0, 87%, 73%, 1) 100%)"
  },
  {
    name: "Lavanda",
    value: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)"
  },
  {
    name: "Bosque",
    value: "linear-gradient(108deg, rgba(242,245,139,1) 17.7%, rgba(148,197,20,0.68) 91.2%)"
  },
  {
    name: "Cielo",
    value: "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)"
  },
  {
    name: "Desierto",
    value: "linear-gradient(111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58%)"
  }
];

type ColorOption = {
  name: string;
  primary: string;
  sidebar: string;
} | {
  name: string;
  value: string;
  isGradient?: boolean;
};

export const ThemeCustomizer = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#9b87f5");
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [colorType, setColorType] = useState<"solid" | "gradient">("solid");

  const changeTheme = (color: ColorOption) => {
    const root = document.documentElement;
    
    if ('value' in color) {
      // Es un gradiente
      root.style.setProperty("--primary", color.value);
      root.style.setProperty("--sidebar-background", color.value);
      root.style.setProperty("--sidebar-primary", color.value);
      root.style.setProperty("--sidebar-ring", color.value);
    } else {
      // Es un color sólido
      root.style.setProperty("--primary", color.primary);
      root.style.setProperty("--sidebar-background", color.sidebar);
      root.style.setProperty("--sidebar-primary", color.primary);
      root.style.setProperty("--sidebar-ring", color.primary);
    }
    
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

  const handleColorSelect = (color: ColorOption) => {
    setSelectedColor(color);
  };

  const handleApplyColor = () => {
    if (selectedColor) {
      changeTheme(selectedColor);
    }
  };

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
        <Tabs defaultValue="solid">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="solid" onClick={() => setColorType("solid")}>
              Sólidos
            </TabsTrigger>
            <TabsTrigger value="gradient" onClick={() => setColorType("gradient")}>
              Degradados
            </TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="solid">
            <div className="grid grid-cols-4 gap-4 py-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorSelect(color)}
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

          <TabsContent value="gradient">
            <div className="grid grid-cols-2 gap-4 py-4">
              {gradients.map((gradient) => (
                <button
                  key={gradient.name}
                  onClick={() => handleColorSelect(gradient)}
                  className={`group relative h-20 rounded-lg ${
                    selectedColor === gradient ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  style={{ background: gradient.value }}
                >
                  <span className="sr-only">{gradient.name}</span>
                  <div className="absolute inset-0 rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-2 left-2 text-xs text-white font-medium drop-shadow-md">
                    {gradient.name}
                  </span>
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