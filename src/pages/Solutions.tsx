import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const Solutions = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Problemas y Soluciones</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="button-gradient">Nuevo Apartado</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo Apartado</DialogTitle>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button type="submit" className="button-gradient">Enviar</Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Solutions;