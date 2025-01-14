import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex-1 min-w-0 bg-background">
          <Header />
          <Dashboard />
        </div>
        <ThemeCustomizer />
      </div>
    </SidebarProvider>
  );
};

export default Index;