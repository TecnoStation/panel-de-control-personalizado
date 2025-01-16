import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ThemeProvider } from "./theme/ThemeContext";
import { useThemeManager } from "./theme/ThemeManager";
import { useThemeState } from "./theme/useThemeState";
import { colors, gradients } from "./theme/colorData";
import { ThemeControls } from "./theme/ThemeControls";
import { useThemeActions } from "./theme/hooks/useThemeActions";
import { useGradientUtils } from "./theme/hooks/useGradientUtils";

export const ThemeCustomizer = () => {
  const themeManager = useThemeManager();
  
  if (!themeManager) {
    console.log('ThemeManager no está disponible');
    return null;
  }

  const themeState = useThemeState();
  
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

  const { handleCustomColorChange, handleCustomGradient, handleSaveGradient } = useThemeActions();
  const { getCurrentGradient } = useGradientUtils(themeManager.selectedColor);

  const handleThemeChange = () => {
    if (!themeManager.selectedColor) return;
    themeManager.changeTheme(themeManager.selectedColor);
    setOpen(false);
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
          <ThemeControls
            selectedColor={themeManager.selectedColor}
            onColorSelect={themeManager.setSelectedColor}
            customColor={customColor}
            onCustomColorChange={(e) => handleCustomColorChange(e, setCustomColor, themeManager.setSelectedColor)}
            onGradientChange={(gradient) => handleCustomGradient(gradient, themeManager.setSelectedColor)}
            onSaveGradient={(gradient, name) => handleSaveGradient(gradient, name, customGradients, setCustomGradients, CUSTOM_GRADIENTS_KEY)}
            onThemeChange={handleThemeChange}
            allGradients={allGradients}
            colors={colors}
            currentGradient={getCurrentGradient()}
          />
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};