import { Button } from "@/components/ui/button";

const News = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Noticias</h1>
        <Button>Crear Noticia</Button>
      </div>
    </div>
  );
};

export default News;