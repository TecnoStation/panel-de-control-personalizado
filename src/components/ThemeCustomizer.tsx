import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "./theme/ColorPicker";
import { GradientPicker } from "./theme/GradientPicker";
import { CustomColorPicker } from "./theme/CustomColorPicker";
import { GradientCustomizer } from "./theme/GradientCustomizer";
import { colors, gradients } from "./theme/colorData";
import { ThemeProvider } from "./theme/ThemeContext";
import { useThemeManager } from "./theme/ThemeManager";
import { ColorOption } from "./theme/types";

const CUSTOM_GRADIENTS_KEY = "custom-gradients";

export const ThemeCustomizer = () => {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#9b87f5");
  const [customGradients, setCustomGradients] = useState<ColorOption[]>([]);
  const themeManager = useThemeManager();

  // Inicializar el tema con un color por defecto
  useEffect(() => {
    const savedGradients = localStorage.getItem(CUSTOM_GRADIENTS_KEY);
    if (savedGradients) {
      setCustomGradients(JSON.parse(savedGradients));
    }

    // Asegurar que siempre haya un color seleccionado
    const defaultColor = colors[0] || {
      name: "Default",
      primary: "0 0% 0%",
      sidebar: "0 0% 0%"
    };
    
    if (!themeManager.selectedColor) {
      themeManager.setSelectedColor(defaultColor);
      themeManager.changeTheme(defaultColor);
    }
  }, []);

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
    const newColor: ColorOption = {
      name: "Personalizado",
      primary: hslColor,
      sidebar: hslColor
    };
    
    if (themeManager && typeof themeManager.setSelectedColor === 'function') {
      themeManager.setSelectedColor(newColor);
    }
  };

  const handleCustomGradient = (gradient: string) => {
    if (!gradient || !themeManager || typeof themeManager.setSelectedColor !== 'function') return;
    
    const newGradient: ColorOption = {
      name: "Gradiente Personalizado",
      value: gradient
    };
    themeManager.setSelectedColor(newGradient);
  };

  const handleSaveGradient = (gradient: string, name: string) => {
    if (!gradient || !name || !themeManager) return;
    
    const newGradient: ColorOption = {
      name,
      value: gradient,
      isCustom: true
    };
    
    const updatedGradients = [...customGradients, newGradient];
    setCustomGradients(updatedGradients);
    localStorage.setItem(CUSTOM_GRADIENTS_KEY, JSON.stringify(updatedGradients));
  };

  const handleThemeChange = () => {
    if (!themeManager || !themeManager.selectedColor) return;
    
    themeManager.changeTheme(themeManager.selectedColor);
    setOpen(false);
  };

  const getCurrentGradient = (): string | undefined => {
    if (!themeManager || !themeManager.selectedColor) return undefined;
    
    const color = themeManager.selectedColor;
    return typeof color === 'object' && color !== null && 'value' in color ? color.value : undefined;
  };

  const allGradients = [...gradients, ...customGradients];

  return (
    <ThemeProvider value={themeManager}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="fixed bottom-4 right-4 rounded-full shadow-lg gradient-bg"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Personalizar tema</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="solid">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="solid">Sólidos</TabsTrigger>
              <TabsTrigger value="gradient">Degradados</TabsTrigger>
              <TabsTrigger value="custom">Color</TabsTrigger>
              <TabsTrigger value="customGradient">Degradado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="solid">
              <ColorPicker
                colors={colors}
                selectedColor={themeManager.selectedColor}
                onColorSelect={themeManager.setSelectedColor}
              />
            </TabsContent>

            <TabsContent value="gradient" className="max-h-[300px] overflow-y-auto">
              <GradientPicker
                gradients={allGradients}
                selectedColor={themeManager.selectedColor}
                onColorSelect={themeManager.setSelectedColor}
              />
            </TabsContent>

            <TabsContent value="custom">
              <CustomColorPicker
                customColor={customColor}
                onCustomColorChange={handleCustomColorChange}
              />
            </TabsContent>

            <TabsContent value="customGradient">
              <GradientCustomizer 
                onGradientChange={handleCustomGradient}
                onSaveGradient={handleSaveGradient}
                currentGradient={getCurrentGradient()}
              />
            </TabsContent>
          </Tabs>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleThemeChange}
              disabled={!themeManager?.selectedColor}
              className="gradient-bg"
            >
              Elegir color
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};