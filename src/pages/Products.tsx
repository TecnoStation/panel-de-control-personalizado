import { Button } from "@/components/ui/button";

const Products = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button>Alta de Productos</Button>
      </div>
    </div>
  );
};

export default Products;