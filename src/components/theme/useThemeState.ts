import { useState, useEffect } from 'react';
import { ColorOption } from './types';
import { colors } from './colorData';

const CUSTOM_GRADIENTS_KEY = 'custom-gradients';
const DEFAULT_COLOR: ColorOption = {
  name: "Default",
  primary: "267 77% 74%",
  sidebar: "267 77% 74%"
};

export const useThemeState = (themeManager: any) => {
  const [open, setOpen] = useState(false);
  const [customColor, setCustomColor] = useState("#9b87f5");
  const [customGradients, setCustomGradients] = useState<ColorOption[]>([]);

  useEffect(() => {
    if (!themeManager) return;

    const initializeTheme = () => {
      try {
        const savedGradients = localStorage.getItem(CUSTOM_GRADIENTS_KEY);
        if (savedGradients) {
          setCustomGradients(JSON.parse(savedGradients));
        }

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

  return {
    open,
    setOpen,
    customColor,
    setCustomColor,
    customGradients,
    setCustomGradients,
    DEFAULT_COLOR,
    CUSTOM_GRADIENTS_KEY,
  };
};