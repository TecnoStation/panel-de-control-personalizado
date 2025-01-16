import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ColorOption } from './types';

const THEME_COLOR_KEY = 'theme-color';

export const useThemeManager = () => {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_COLOR_KEY);
      return savedTheme ? JSON.parse(savedTheme) : null;
    }
    return null;
  });

  const changeTheme = (color: ColorOption) => {
    const root = document.documentElement;
    
    if ('value' in color) {
      // Aplicar gradiente
      root.style.setProperty("--theme-gradient", color.value);
      
      // Limpiar variables de color sólido
      root.style.removeProperty("--primary");
      root.style.removeProperty("--sidebar-background");
      root.style.removeProperty("--sidebar-primary");
      root.style.removeProperty("--sidebar-ring");
      
      // Aplicar estilos de gradiente al sidebar y otros elementos
      const style = document.createElement('style');
      style.textContent = `
        .sidebar-gradient,
        [data-sidebar="header"],
        [data-sidebar="content"],
        [data-sidebar="footer"],
        .gradient-bg {
          background-image: var(--theme-gradient) !important;
          background-color: transparent !important;
        }
        
        .number-gradient {
          background-image: var(--theme-gradient) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          color: transparent !important;
        }
      `;
      
      const oldStyle = document.getElementById('theme-style');
      if (oldStyle) {
        oldStyle.remove();
      }
      
      style.id = 'theme-style';
      document.head.appendChild(style);
      
    } else if (color.primary && color.sidebar) {
      // Aplicar colores sólidos
      root.style.setProperty("--primary", color.primary);
      root.style.setProperty("--sidebar-background", color.sidebar);
      root.style.setProperty("--sidebar-primary", color.primary);
      root.style.setProperty("--sidebar-ring", color.primary);
      
      // Crear gradiente para colores sólidos
      const gradient = `linear-gradient(135deg, hsl(${color.primary}), hsl(${color.primary}))`;
      root.style.setProperty("--theme-gradient", gradient);
      
      const oldStyle = document.getElementById('theme-style');
      if (oldStyle) {
        oldStyle.remove();
      }
    }
    
    // Mantener colores de texto consistentes
    root.style.setProperty("--sidebar-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-primary-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-accent", "0 0% 100% / 0.1");
    root.style.setProperty("--sidebar-accent-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-border", "0 0% 100% / 0.1");
    
    // Guardar el tema en localStorage
    localStorage.setItem(THEME_COLOR_KEY, JSON.stringify(color));
    
    toast({
      title: "Tema actualizado",
      description: "El color del tema ha sido cambiado exitosamente.",
      duration: 2000,
    });

    setSelectedColor(color);
  };

  // Aplicar el tema guardado al cargar la página
  useEffect(() => {
    if (selectedColor) {
      changeTheme(selectedColor);
    }
  }, []);

  return {
    selectedColor,
    setSelectedColor,
    changeTheme,
  };
};