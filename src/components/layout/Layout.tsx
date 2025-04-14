
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  BarChart, 
  Layers, 
  Home 
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
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Sidebar for larger screens */}
        <aside className="w-full md:w-64 bg-sidebar text-sidebar-foreground md:min-h-screen">
          <div className="p-4 flex flex-col h-full">
            <div className="mb-8 mt-4">
              <h1 className="text-xl font-bold">Kampanya Yönetimi</h1>
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
                      "flex items-center py-3 px-4 rounded-md transition-colors",
                      {
                        "bg-sidebar-accent text-sidebar-accent-foreground": isActive,
                        "hover:bg-sidebar-accent/50": !isActive,
                      }
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-auto p-4 border-t border-sidebar-border">
              <p className="text-sm opacity-70">Admin Panel v1.0</p>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </DataProvider>
  );
};

export default Layout;
