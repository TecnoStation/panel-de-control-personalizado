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
import { useState } from "react";

const colors = [
  { name: "Púrpura", primary: "267 77% 74%", sidebar: "267 77% 74%" },
  { name: "Azul Océano", primary: "199 89% 48%", sidebar: "199 89% 48%" },
  { name: "Verde Esmeralda", primary: "142 71% 45%", sidebar: "142 71% 45%" },
  { name: "Rojo Rubí", primary: "0 84% 60%", sidebar: "0 84% 60%" },
  { name: "Naranja", primary: "24 95% 64%", sidebar: "24 95% 64%" },
  { name: "Rosa", primary: "316 73% 52%", sidebar: "316 73% 52%" },
  { name: "Magenta", primary: "322 81% 61%", sidebar: "322 81% 61%" },
  { name: "Índigo", primary: "245 58% 51%", sidebar: "245 58% 51%" },
  { name: "Cian", primary: "187 100% 42%", sidebar: "187 100% 42%" },
  { name: "Ámbar", primary: "45 93% 47%", sidebar: "45 93% 47%" },
  { name: "Violeta", primary: "280 67% 44%", sidebar: "280 67% 44%" },
  { name: "Lima", primary: "85 81% 44%", sidebar: "85 81% 44%" },
];

export const ThemeCustomizer = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const changeTheme = (color: { primary: string; sidebar: string }) => {
    const root = document.documentElement;
    root.style.setProperty("--primary", color.primary);
    root.style.setProperty("--sidebar-primary", color.primary);
    root.style.setProperty("--sidebar-background", color.sidebar);
    
    // Ajustamos el color del texto para asegurar contraste
    root.style.setProperty("--sidebar-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-accent", "0 0% 100% / 0.1");
    root.style.setProperty("--sidebar-accent-foreground", "0 0% 100%");
    root.style.setProperty("--sidebar-border", "0 0% 100% / 0.1");
    root.style.setProperty("--sidebar-ring", color.primary);
    
    toast({
      title: "Tema actualizado",
      description: "El color del tema ha sido cambiado exitosamente.",
    });

    // Cerramos el modal después de seleccionar el color
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <div className="grid grid-cols-4 gap-4 py-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => changeTheme(color)}
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