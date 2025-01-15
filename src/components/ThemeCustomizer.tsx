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

// Color por defecto garantizado
const DEFAULT_COLOR: ColorOption = {
  name: "Default",
  primary: "267 77% 74%",
  sidebar: "267 77% 74%"
};

export const ThemeCustomizer = () => {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#9b87f5");
  const [customGradients, setCustomGradients] = useState<ColorOption[]>([]);
  const themeManager = useThemeManager();

  // Verificación temprana de themeManager
  if (!themeManager) {
    console.error("ThemeManager no está disponible");
    return null;
  }

  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Cargar gradientes personalizados
        const savedGradients = localStorage.getItem(CUSTOM_GRADIENTS_KEY);
        if (savedGradients) {
          setCustomGradients(JSON.parse(savedGradients));
        }

        // Garantizar un color inicial
        if (!themeManager.selectedColor) {
          const initialColor = colors[0] || DEFAULT_COLOR;
          themeManager.setSelectedColor(initialColor);
          themeManager.changeTheme(initialColor);
        }
      } catch (error) {
        console.error("Error initializing theme:", error);
        themeManager.setSelectedColor(DEFAULT_COLOR);
        themeManager.changeTheme(DEFAULT_COLOR);
      }
    };

    initializeTheme();
  }, [themeManager]);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    
    // Convertir hex a HSL
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
    
    themeManager.setSelectedColor(newColor);
  };

  const handleCustomGradient = (gradient: string) => {
    if (!gradient) return;
    
    const newGradient: ColorOption = {
      name: "Gradiente Personalizado",
      value: gradient
    };
    themeManager.setSelectedColor(newGradient);
  };

  const handleSaveGradient = (gradient: string, name: string) => {
    if (!gradient || !name) return;
    
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
    if (!themeManager.selectedColor) return;
    
    themeManager.changeTheme(themeManager.selectedColor);
    setOpen(false);
  };

  const getCurrentGradient = (): string | undefined => {
    if (!themeManager.selectedColor) return undefined;
    
    const color = themeManager.selectedColor;
    if (typeof color !== 'object') return undefined;
    
    return 'value' in color ? color.value : undefined;
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