interface CustomColorPickerProps {
  customColor: string;
  onCustomColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomColorPicker = ({ customColor, onCustomColorChange }: CustomColorPickerProps) => {
  return (
    <div className="py-3 space-y-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="custom-color" className="text-sm font-medium">
          Selecciona un color personalizado
        </label>
        <input
          type="color"
          id="custom-color"
          value={customColor}
          onChange={onCustomColorChange}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>
    </div>
  );
};