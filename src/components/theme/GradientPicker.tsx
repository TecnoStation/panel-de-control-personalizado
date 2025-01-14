import { ColorOption } from "./types";

interface GradientPickerProps {
  gradients: ColorOption[];
  selectedColor: ColorOption | null;
  onColorSelect: (color: ColorOption) => void;
}

export const GradientPicker = ({ gradients, selectedColor, onColorSelect }: GradientPickerProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 py-2">
      {gradients.map((gradient) => (
        <button
          key={gradient.name}
          onClick={() => onColorSelect(gradient)}
          className={`group relative h-10 rounded-lg ${
            selectedColor === gradient ? 'ring-2 ring-primary ring-offset-2' : ''
          }`}
          style={{ background: 'value' in gradient ? gradient.value : '' }}
        >
          <span className="sr-only">{gradient.name}</span>
          <div className="absolute inset-0 rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-1 left-2 text-[10px] text-white font-medium drop-shadow-md">
            {gradient.name}
          </span>
        </button>
      ))}
    </div>
  );
};