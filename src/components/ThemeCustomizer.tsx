import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ThemeProvider } from "./theme/ThemeContext";
import { useThemeManager } from "./theme/ThemeManager";
import { ThemeDialog } from "./theme/ThemeDialog";
import { useThemeState } from "./theme/useThemeState";
import { colors, gradients } from "./theme/colorData";
import { ColorOption } from "./theme/types";

export const ThemeCustomizer = () => {
  const themeManager = useThemeManager();
  
  // Verificación temprana si themeManager no está disponible
  if (!themeManager) {
    console.log('ThemeManager no está disponible');
    return null;
  }

  const themeState = useThemeState();
  
  // Verificación temprana si themeState no está disponible
  if (!themeState) {
    console.log('ThemeState no está disponible');
    return null;
  }

  const {
    open,
    setOpen,
    customColor,
    setCustomColor,
    customGradients,
    setCustomGradients,
    CUSTOM_GRADIENTS_KEY,
  } = themeState;

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    
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
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
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
    const color = themeManager.selectedColor;
    if (!color) return undefined;
    
    // Type guard para verificar si el color tiene la propiedad 'value'
    if (typeof color === 'object' && color !== null && 'value' in color) {
      return color.value;
    }
    
    return undefined;
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
        <ThemeDialog
          open={open}
          onOpenChange={setOpen}
          selectedColor={themeManager.selectedColor}
          onColorSelect={themeManager.setSelectedColor}
          customColor={customColor}
          onCustomColorChange={handleCustomColorChange}
          onGradientChange={handleCustomGradient}
          onSaveGradient={handleSaveGradient}
          onThemeChange={handleThemeChange}
          allGradients={allGradients}
          colors={colors}
          currentGradient={getCurrentGradient()}
        />
      </Dialog>
    </ThemeProvider>
  );
};