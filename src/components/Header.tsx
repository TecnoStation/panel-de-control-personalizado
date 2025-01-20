import { Button } from "@/components/ui/button";
import { Settings, Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const Header = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="flex justify-between items-center p-4 border-b bg-background text-foreground">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="block md:hidden text-foreground hover:text-foreground dark:text-white dark:hover:text-white"
          onClick={() => setOpenMobile(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">My Organization</h1>
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button variant="outline" className="hidden md:flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Organization settings
        </Button>
        <Button className="button-gradient">
          <span className="hidden md:inline">Create a new scenario</span>
          <span className="md:hidden">New</span>
        </Button>
      </div>
    </div>
  );
};