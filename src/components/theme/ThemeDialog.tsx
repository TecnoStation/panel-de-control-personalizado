import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "./ColorPicker";
import { GradientPicker } from "./GradientPicker";
import { CustomColorPicker } from "./CustomColorPicker";
import { GradientCustomizer } from "./GradientCustomizer";
import { ColorOption } from "./types";

interface ThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedColor: ColorOption | null;
  onColorSelect: (color: ColorOption) => void;
  customColor: string;
  onCustomColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGradientChange: (gradient: string) => void;
  onSaveGradient: (gradient: string, name: string) => void;
  onThemeChange: () => void;
  allGradients: ColorOption[];
  colors: ColorOption[];
  currentGradient?: string;
}

export const ThemeDialog = ({
  open,
  onOpenChange,
  selectedColor,
  onColorSelect,
  customColor,
  onCustomColorChange,
  onGradientChange,
  onSaveGradient,
  onThemeChange,
  allGradients,
  colors,
  currentGradient,
}: ThemeDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Personalizar tema</DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="solid">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="solid">Sólidos</TabsTrigger>
          <TabsTrigger value="gradient">Degradados</TabsTrigger>
          <TabsTrigger value="custom">Color</TabsTrigger>
          <TabsTrigger value="customGradient">Degradado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solid">
          <ColorPicker
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={onColorSelect}
          />
        </TabsContent>

        <TabsContent value="gradient" className="max-h-[300px] overflow-y-auto">
          <GradientPicker
            gradients={allGradients}
            selectedColor={selectedColor}
            onColorSelect={onColorSelect}
          />
        </TabsContent>

        <TabsContent value="custom">
          <CustomColorPicker
            customColor={customColor}
            onCustomColorChange={onCustomColorChange}
          />
        </TabsContent>

        <TabsContent value="customGradient">
          <GradientCustomizer 
            onGradientChange={onGradientChange}
            onSaveGradient={onSaveGradient}
            currentGradient={currentGradient}
          />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end mt-4">
        <Button 
          onClick={onThemeChange}
          disabled={!selectedColor}
          className="gradient-bg"
        >
          Elegir color
        </Button>
      </div>
    </DialogContent>
  );
};