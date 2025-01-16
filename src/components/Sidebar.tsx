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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                OL
              </div>
              <span className="text-white font-semibold">oliver lozada</span>
            </div>
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
      </SidebarContent>
    </ShadcnSidebar>
  );
};