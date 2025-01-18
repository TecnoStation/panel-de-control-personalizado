import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";

const Menu = lazy(() => import("./pages/Menu"));
const Categories = lazy(() => import("./pages/Categories"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const News = lazy(() => import("./pages/News"));
const Products = lazy(() => import("./pages/Products"));
const Pages = lazy(() => import("./pages/Pages"));
const Slider = lazy(() => import("./pages/Slider"));
const Promotions = lazy(() => import("./pages/Promotions"));
const Templates = lazy(() => import("./pages/Templates"));
const Videos = lazy(() => import("./pages/Videos"));
const Distribution = lazy(() => import("./pages/Distribution"));
const Solutions = lazy(() => import("./pages/Solutions"));
const BestSellers = lazy(() => import("./pages/BestSellers"));
const Administrators = lazy(() => import("./pages/Administrators"));
const Clients = lazy(() => import("./pages/Clients"));
const Orders = lazy(() => import("./pages/Orders"));
const Comments = lazy(() => import("./pages/Comments"));

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="p-8 space-y-4">
    <Skeleton className="h-8 w-[250px]" />
    <Skeleton className="h-[200px] w-full" />
    <Skeleton className="h-[200px] w-full" />
  </div>
);

export default function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDarkMode ? 'dark' : ''}>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex w-full min-h-screen bg-background text-foreground transition-colors duration-300">
              <Sidebar />
              <div className="flex-1">
                <Toaster />
                <Sonner />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/categorias" element={<Categories />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/noticias" element={<News />} />
                    <Route path="/productos" element={<Products />} />
                    <Route path="/paginas" element={<Pages />} />
                    <Route path="/slider" element={<Slider />} />
                    <Route path="/promociones" element={<Promotions />} />
                    <Route path="/plantillas" element={<Templates />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/distribucion" element={<Distribution />} />
                    <Route path="/soluciones" element={<Solutions />} />
                    <Route path="/mas-vendidos" element={<BestSellers />} />
                    <Route path="/administradores" element={<Administrators />} />
                    <Route path="/clientes" element={<Clients />} />
                    <Route path="/pedidos" element={<Orders />} />
                    <Route path="/comentarios" element={<Comments />} />
                  </Routes>
                </Suspense>
              </div>
              <ThemeCustomizer />
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </div>
    </QueryClientProvider>
  );
}
