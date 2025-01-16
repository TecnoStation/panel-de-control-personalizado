import { useToast } from '@/hooks/use-toast';
import { ColorOption } from '../types';

export const useThemeActions = () => {
  const { toast } = useToast();

  const handleCustomColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setCustomColor: (color: string) => void,
    setSelectedColor: (color: ColorOption) => void
  ) => {
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
    
    setSelectedColor(newColor);
  };

  const handleCustomGradient = (
    gradient: string,
    setSelectedColor: (color: ColorOption) => void
  ) => {
    if (!gradient) return;
    
    const newGradient: ColorOption = {
      name: "Gradiente Personalizado",
      value: gradient
    };
    setSelectedColor(newGradient);
  };

  const handleSaveGradient = (
    gradient: string,
    name: string,
    customGradients: ColorOption[],
    setCustomGradients: (gradients: ColorOption[]) => void,
    CUSTOM_GRADIENTS_KEY: string
  ) => {
    if (!gradient || !name) return;
    
    const newGradient: ColorOption = {
      name,
      value: gradient,
      isCustom: true
    };
    
    const updatedGradients = [...customGradients, newGradient];
    setCustomGradients(updatedGradients);
    localStorage.setItem(CUSTOM_GRADIENTS_KEY, JSON.stringify(updatedGradients));
    
    toast({
      title: "Gradiente guardado",
      description: "El gradiente personalizado ha sido guardado exitosamente.",
    });
  };

  return {
    handleCustomColorChange,
    handleCustomGradient,
    handleSaveGradient,
  };
};