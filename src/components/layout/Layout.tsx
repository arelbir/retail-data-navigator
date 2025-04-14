
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  BarChart, 
  Layers, 
  Home,
  ChevronRight,
  PanelLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DataProvider } from "@/context/DataContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

const Layout = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Ana Sayfa", icon: Home },
    { path: "/kampanya-analizi", label: "Kampanya Analizi", icon: BarChart },
    { path: "/ara-kategori", label: "Ara Kategori", icon: Layers },
  ];

  return (
    <DataProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex flex-col md:flex-row bg-background">
          {/* Shadcn Sidebar */}
          <Sidebar variant="sidebar" side="left">
            <SidebarHeader className="p-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h1 className="text-lg font-semibold">Kampanya Yönetimi</h1>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        tooltip={item.label}
                      >
                        <Link to={item.path} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon className="mr-3 h-[18px] w-[18px]" />
                            <span>{item.label}</span>
                          </div>
                          {isActive && <ChevronRight className="h-4 w-4" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>
            
            <SidebarFooter className="mt-auto p-4 border-t border-sidebar-border">
              <p className="text-xs opacity-60">Admin Panel v1.0</p>
              <SidebarTrigger className="mt-2 ml-auto block md:hidden" />
            </SidebarFooter>
          </Sidebar>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto bg-secondary/30">
            <div className="container py-6 md:py-8 px-4 md:px-8 max-w-7xl mx-auto animate-fade-in">
              <div className="md:hidden flex items-center mb-4">
                <SidebarTrigger />
              </div>
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </DataProvider>
  );
};

export default Layout;
