import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarHeader,
  useSidebar 
} from "@/components/ui/sidebar";
import { UserDropdown } from "./sidebar/UserDropdown";
import { NavItem } from "./sidebar/NavItem";
import { navItems } from "./sidebar/navItems";

export const Sidebar = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <ShadcnSidebar>
      <SidebarHeader className="sidebar-gradient">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between px-4">
            <UserDropdown />
            <button
              onClick={() => setOpenMobile(false)}
              className="md:hidden text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="sidebar-gradient flex-1">
        <nav className="flex-1 p-3 space-y-1 custom-scrollbar">
          {navItems.map((item, index) => (
            <div key={item.label}>
              {index === 11 && <hr className="my-2 border-white" />}
              {index === 14 && <hr className="my-2 border-white" />}
              <NavItem {...item} />
            </div>
          ))}
        </nav>
      </SidebarContent>
    </ShadcnSidebar>
  );
};