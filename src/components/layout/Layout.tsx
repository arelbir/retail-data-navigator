
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  BarChart, 
  Layers, 
  Home,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DataProvider } from "@/context/DataContext";

const Layout = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Ana Sayfa", icon: Home },
    { path: "/kampanya-analizi", label: "Kampanya Analizi", icon: BarChart },
    { path: "/ara-kategori", label: "Ara Kategori", icon: Layers },
  ];

  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-background">
        {/* Sidebar for larger screens */}
        <aside className="w-full md:w-64 bg-sidebar flex-shrink-0 text-sidebar-foreground md:min-h-screen shadow-sm border-r border-sidebar-border">
          <div className="p-6 flex flex-col h-full">
            <div className="mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h1 className="text-lg font-semibold">Kampanya Yönetimi</h1>
              </div>
            </div>
            
            <nav className="space-y-1 flex-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors",
                      {
                        "bg-primary/10 text-primary font-medium": isActive,
                        "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground": !isActive,
                      }
                    )}
                  >
                    <div className="flex items-center">
                      <Icon className={cn("mr-3 h-[18px] w-[18px]", {
                        "text-primary": isActive,
                        "text-sidebar-foreground/60": !isActive
                      })} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4 text-primary" />}
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-auto p-4 border-t border-sidebar-border">
              <p className="text-xs opacity-60">Admin Panel v1.0</p>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto bg-secondary/30">
          <div className="container py-6 md:py-8 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </DataProvider>
  );
};

export default Layout;
