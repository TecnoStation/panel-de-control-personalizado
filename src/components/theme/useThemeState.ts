import { useState, useEffect } from 'react';
import { ColorOption } from './types';
import { colors } from './colorData';

const CUSTOM_GRADIENTS_KEY = 'custom-gradients';
const DEFAULT_COLOR: ColorOption = {
  name: "Default",
  primary: "267 77% 74%",
  sidebar: "267 77% 74%"
};

export const useThemeState = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [customColor, setCustomColor] = useState<string>("#9b87f5");
  const [customGradients, setCustomGradients] = useState<ColorOption[]>([]);

  useEffect(() => {
    try {
      const savedGradients = localStorage.getItem(CUSTOM_GRADIENTS_KEY);
      if (savedGradients) {
        setCustomGradients(JSON.parse(savedGradients));
      }
    } catch (error) {
      console.error("Error loading saved gradients:", error);
      setCustomGradients([]);
    }
  }, []);

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