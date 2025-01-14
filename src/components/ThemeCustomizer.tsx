import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "./theme/ColorPicker";
import { GradientPicker } from "./theme/GradientPicker";
import { CustomColorPicker } from "./theme/CustomColorPicker";
import { colors, gradients } from "./theme/colorData";
import { ThemeProvider } from "./theme/ThemeContext";
import { useThemeManager } from "./theme/ThemeManager";

export const ThemeCustomizer = () => {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#9b87f5");
  const themeManager = useThemeManager();

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
    themeManager.setSelectedColor({ name: "Personalizado", primary: hslColor, sidebar: hslColor });
  };

  const handleThemeChange = () => {
    if (themeManager.selectedColor) {
      themeManager.changeTheme(themeManager.selectedColor);
      setOpen(false); // Cerrar el modal después de cambiar el tema
    }
  };

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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="solid">Sólidos</TabsTrigger>
              <TabsTrigger value="gradient">Degradados</TabsTrigger>
              <TabsTrigger value="custom">Personalizado</TabsTrigger>
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
                gradients={gradients}
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
          </Tabs>
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleThemeChange}
              disabled={!themeManager.selectedColor}
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