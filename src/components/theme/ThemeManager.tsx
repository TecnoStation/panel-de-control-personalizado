import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ColorOption } from './types';

export const useThemeManager = () => {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

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
      
      // Aplicar estilos de gradiente al sidebar
      const style = document.createElement('style');
      style.textContent = `
        .sidebar-gradient,
        [data-sidebar="header"],
        [data-sidebar="content"],
        [data-sidebar="footer"] {
          background-image: var(--theme-gradient);
          backdrop-filter: blur(10px);
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
    
    toast({
      title: "Tema actualizado",
      description: "El color del tema ha sido cambiado exitosamente.",
      duration: 2000,
    });

    setSelectedColor(color);
  };

  return {
    selectedColor,
    setSelectedColor,
    changeTheme,
  };
};