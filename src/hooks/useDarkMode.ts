import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const html = document.querySelector('html');
    
    const applyTheme = () => {
      if (isDarkMode) {
        root.classList.add('dark');
        html?.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        root.classList.remove('dark');
        html?.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      
      // Limpiar estilos inline
      document.body.style.removeProperty('background-color');
      document.body.style.removeProperty('color');
      
      // Forzar actualización de variables CSS
      root.style.setProperty('--background', isDarkMode ? '222.2 84% 4.9%' : '0 0% 100%');
      root.style.setProperty('--foreground', isDarkMode ? '210 40% 98%' : '222.2 84% 4.9%');
    };

    // Aplicar tema inmediatamente
    applyTheme();
    
    // Forzar re-render después de un frame
    requestAnimationFrame(() => {
      applyTheme();
    });
    
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};