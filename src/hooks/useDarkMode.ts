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
    
    if (isDarkMode) {
      root.classList.add('dark');
      html?.classList.add('dark');
    } else {
      root.classList.remove('dark');
      html?.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', isDarkMode.toString());

    // Forzar la actualización de los estilos
    requestAnimationFrame(() => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      void document.body.offsetHeight;
    });
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
};