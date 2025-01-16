import { ColorOption } from '../types';

export const useGradientUtils = (selectedColor: ColorOption | null) => {
  const getCurrentGradient = (): string | undefined => {
    if (!selectedColor || typeof selectedColor !== 'object') return undefined;
    
    if ('value' in selectedColor && typeof selectedColor.value === 'string') {
      return selectedColor.value;
    }
    
    return undefined;
  };

  return {
    getCurrentGradient,
  };
};