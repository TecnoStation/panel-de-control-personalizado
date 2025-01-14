import { Button } from "@/components/ui/button";
import { ColorOption } from "./types";

interface ColorPickerProps {
  colors: ColorOption[];
  selectedColor: ColorOption | null;
  onColorSelect: (color: ColorOption) => void;
}

export const ColorPicker = ({ colors, selectedColor, onColorSelect }: ColorPickerProps) => {
  return (
    <div className="grid grid-cols-4 gap-3 py-3">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onColorSelect(color)}
          className={`group relative aspect-square rounded-full ${
            selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
          style={{ background: 'primary' in color ? `hsl(${color.primary})` : color.value }}
        >
          <span className="sr-only">{color.name}</span>
          <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>
  );
};