import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="block md:hidden">
          <SidebarTrigger />
        </div>
        <h1 className="text-2xl font-semibold">My Organization</h1>
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button variant="outline" className="hidden md:flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Organization settings
        </Button>
        <Button className="bg-primary hover:bg-primary/90">
          <span className="hidden md:inline">Create a new scenario</span>
          <span className="md:hidden">New</span>
        </Button>
      </div>
    </div>
  );
};