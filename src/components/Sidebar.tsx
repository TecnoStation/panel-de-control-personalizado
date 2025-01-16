import { 
  List, 
  FileText, 
  Package, 
  Settings, 
  Users, 
  MessageSquare, 
  User,
  LogOut,
  ChevronDown,
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarHeader,
  useSidebar 
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    icon: List,
    label: "Categorías",
  },
  {
    icon: FileText,
    label: "Newsletter",
  },
  {
    icon: FileText,
    label: "Noticias",
    subItems: [
      { label: "Crear Noticia" },
      { label: "Lista de Noticias" }
    ]
  },
  {
    icon: Package,
    label: "Productos",
    subItems: [
      { label: "Alta de Productos" },
      { label: "Lista de Productos" }
    ]
  },
  {
    icon: FileText,
    label: "Páginas",
    subItems: [
      { label: "Nueva Página" },
      { label: "Lista de Páginas" }
    ]
  },
  {
    icon: FileText,
    label: "Slider"
  },
  {
    icon: MessageSquare,
    label: "Promociones"
  },
  {
    icon: FileText,
    label: "Plantillas"
  },
  {
    icon: FileText,
    label: "Videos"
  },
  {
    icon: Package,
    label: "Distribución y Aplicaciones"
  },
  {
    icon: Settings,
    label: "Problemas y Soluciones",
    subItems: [
      { label: "Nuevo Apartado" },
      { label: "Lista de Apartados" }
    ]
  },
  {
    icon: Package,
    label: "Productos más vendidos"
  },
  {
    icon: Users,
    label: "Administradores"
  },
  {
    icon: Users,
    label: "Clientes"
  },
  {
    icon: Package,
    label: "Pedidos"
  },
  {
    icon: MessageSquare,
    label: "Comentarios"
  }
];

export const Sidebar = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <ShadcnSidebar>
      <SidebarHeader className="sidebar-gradient">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between px-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                  OL
                </div>
                <span className="text-white font-semibold">oliver lozada</span>
                <ChevronDown className="h-4 w-4 text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div key={item.label}>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                  <a className={cn("nav-item w-full")}>
                    <item.icon className="w-5 h-5" />
                    {item.label}
                    {item.subItems && <ChevronDown className="ml-auto h-4 w-4" />}
                  </a>
                </DropdownMenuTrigger>
                {item.subItems && (
                  <DropdownMenuContent className="w-48 ml-6">
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem
                        key={subItem.label}
                        className="cursor-pointer"
                      >
                        {subItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            </div>
          ))}
        </nav>
      </SidebarContent>
    </ShadcnSidebar>
  );
};