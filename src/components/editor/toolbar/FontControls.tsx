import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FontControlsProps {
  onFontSizeChange: (size: string) => void;
  onFontFamilyChange: (family: string) => void;
  onColorChange: (color: string) => void;
}

const fontSizes = ['8', '10', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48'];
const fontFamilies = [
  'Arial',
  'Times New Roman',
  'Helvetica',
  'Courier New',
  'Georgia',
  'Verdana'
];
const colors = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#808080', '#800000', '#808000', '#008000', '#800080', '#008080', '#000080'
];

export const FontControls = ({
  onFontSizeChange,
  onFontFamilyChange,
  onColorChange
}: FontControlsProps) => {
  return (
    <>
      <Select onValueChange={onFontSizeChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Tamaño" />
        </SelectTrigger>
        <SelectContent>
          {fontSizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size}px
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onFontFamilyChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Fuente" />
        </SelectTrigger>
        <SelectContent>
          {fontFamilies.map((family) => (
            <SelectItem key={family} value={family}>
              {family}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onColorChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Color" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((color) => (
            <SelectItem key={color} value={color}>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color }}
                />
                {color}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};