import { createContext, useContext, ReactNode } from 'react';
import { ColorOption } from './types';

interface ThemeContextType {
  selectedColor: ColorOption | null;
  setSelectedColor: (color: ColorOption | null) => void;
  changeTheme: (color: ColorOption) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  value: ThemeContextType;
}

export const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};