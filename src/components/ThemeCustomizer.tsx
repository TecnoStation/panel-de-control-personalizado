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
import { ColorPicker } from "./theme/ColorPicker";
import { GradientPicker } from "./theme/GradientPicker";
import { CustomColorPicker } from "./theme/CustomColorPicker";
import { colors, gradients } from "./theme/colorData";
import { ColorOption } from "./theme/types";

export const ThemeCustomizer = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#9b87f5");
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  const changeTheme = (color: ColorOption) => {
    const root = document.documentElement;
    
    if ('value' in color) {
      // Aplicar degradados a todos los elementos relevantes
      const style = document.createElement('style');
      style.textContent = `
        /* Estilos para el sidebar */
        .sidebar-gradient,
        [data-sidebar="header"],
        [data-sidebar="content"],
        [data-sidebar="footer"] {
          background: ${color.value} !important;
          backdrop-filter: blur(10px);
        }

        /* Estilos para números y texto con gradiente */
        .text-primary,
        .number-gradient {
          background: ${color.value} !important;
          background-clip: text !important;
          -webkit-background-clip: text !important;
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
        }

        /* Estilos para botones y elementos con fondo gradiente */
        .bg-primary,
        .button-gradient {
          background: ${color.value} !important;
          color: white !important;
        }

        /* Estilos para hover en elementos con gradiente */
        .bg-primary:hover,
        .button-gradient:hover {
          opacity: 0.9;
          transition: opacity 0.2s ease-in-out;
        }
      `;
      
      // Remover estilos anteriores si existen
      const oldStyle = document.getElementById('gradient-style');
      if (oldStyle) {
        oldStyle.remove();
      }
      
      // Agregar nuevos estilos
      style.id = 'gradient-style';
      document.head.appendChild(style);
      
    } else if (color.primary && color.sidebar) {
      // Para colores sólidos
      root.style.setProperty("--primary", color.primary);
      root.style.setProperty("--sidebar-background", color.sidebar);
      root.style.setProperty("--sidebar-primary", color.primary);
      root.style.setProperty("--sidebar-ring", color.primary);
      
      // Remover cualquier estilo de degradado previo
      const oldStyle = document.getElementById('gradient-style');
      if (oldStyle) {
        oldStyle.remove();
      }
    }
    
    // Mantener los colores de texto y acentos consistentes
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
            <TabsTrigger value="solid">Sólidos</TabsTrigger>
            <TabsTrigger value="gradient">Degradados</TabsTrigger>
            <TabsTrigger value="custom">Personalizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="solid">
            <ColorPicker
              colors={colors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          </TabsContent>

          <TabsContent value="gradient" className="max-h-[300px] overflow-y-auto">
            <GradientPicker
              gradients={gradients}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          </TabsContent>

          <TabsContent value="custom">
            <CustomColorPicker
              customColor={customColor}
              onCustomColorChange={handleCustomColorChange}
            />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end mt-4">
          <Button onClick={() => selectedColor && changeTheme(selectedColor)} disabled={!selectedColor}>
            Elegir color
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};