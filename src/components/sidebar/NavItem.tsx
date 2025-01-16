import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path?: string;
}

export const NavItem = ({ icon: Icon, label, path }: NavItemProps) => {
  return (
    <Link to={path || "/"} className={cn("nav-item")}>
      <Icon className="w-5 h-5" />
      {label}
    </Link>
  );
};