import { 
  List, 
  FileText, 
  Package, 
  Settings, 
  Users, 
  MessageSquare 
} from "lucide-react";

export const navItems = [
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