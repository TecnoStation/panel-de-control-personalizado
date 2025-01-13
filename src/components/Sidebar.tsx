import { Home, Users, Share2, Layout, Link, Webhook, MoreHorizontal, Book, Bell, HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar as ShadcnSidebar, SidebarContent, SidebarHeader, SidebarFooter, useSidebar } from "@/components/ui/sidebar";

const navItems = [
  { icon: Home, label: "Organization", active: true },
  { icon: Users, label: "Team" },
  { icon: Share2, label: "Scenarios" },
  { icon: Layout, label: "Templates" },
  { icon: Link, label: "Connections" },
  { icon: Webhook, label: "Webhooks" },
  { icon: MoreHorizontal, label: "More" },
];

const bottomNavItems = [
  { icon: Book, label: "Resource Hub" },
  { icon: Share2, label: "What's New" },
  { icon: Bell, label: "Notifications" },
  { icon: HelpCircle, label: "Help" },
];

export const Sidebar = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <ShadcnSidebar>
      <SidebarHeader className="sidebar-gradient">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-white font-semibold">MY ORGANIZATION</h2>
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
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={cn("nav-item", item.active && "active")}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-3 space-y-1">
          {bottomNavItems.map((item) => (
            <a key={item.label} href="#" className="nav-item">
              <item.icon className="w-5 h-5" />
              {item.label}
            </a>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="sidebar-gradient">
        <div className="p-4 border-t border-white/10">
          <a href="#" className="nav-item">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              OL
            </div>
            <span className="text-white">oliver lozada</span>
          </a>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};