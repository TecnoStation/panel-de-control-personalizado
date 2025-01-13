import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const colors = [
  { name: "Púrpura", primary: "267 77% 74%" },
  { name: "Azul", primary: "221 83% 53%" },
  { name: "Verde", primary: "142 71% 45%" },
  { name: "Rojo", primary: "0 84% 60%" },
  { name: "Naranja", primary: "24 95% 64%" },
  { name: "Rosa", primary: "316 73% 52%" },
];

export const ThemeCustomizer = () => {
  const { toast } = useToast();

  const changeTheme = (hsl: string) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", hsl);
    toast({
      title: "Tema actualizado",
      description: "El color del tema ha sido cambiado exitosamente.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full shadow-lg"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Personalizar tema</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => changeTheme(color.primary)}
              className="group relative aspect-square rounded-full"
              style={{ background: `hsl(${color.primary})` }}
            >
              <span className="sr-only">{color.name}</span>
              <div className="absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};