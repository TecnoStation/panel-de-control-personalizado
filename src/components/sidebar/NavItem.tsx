import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SubItem {
  label: string;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  subItems?: SubItem[];
}

export const NavItem = ({ icon: Icon, label, subItems }: NavItemProps) => {
  if (subItems) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <a className={cn("nav-item w-full")}>
            <Icon className="w-5 h-5" />
            {label}
            <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 collapsible-chevron" />
          </a>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-6 mt-1 space-y-1 py-1">
            {subItems.map((subItem) => (
              <a
                key={subItem.label}
                className="nav-item text-sm pl-6"
                href="#"
              >
                {subItem.label}
              </a>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a className={cn("nav-item")}>
      <Icon className="w-5 h-5" />
      {label}
    </a>
  );
};