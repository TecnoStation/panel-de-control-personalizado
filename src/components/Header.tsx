import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-2xl font-semibold">My Organization</h1>
      <div className="flex gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Organization settings
        </Button>
        <Button className="bg-primary hover:bg-primary/90">Create a new scenario</Button>
      </div>
    </div>
  );
};