import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const Pages = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Páginas</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Nueva Página</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva Página</DialogTitle>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <DialogTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button type="submit">Enviar</Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pages;