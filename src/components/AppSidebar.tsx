import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings,
  Building2,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { t } = useTranslation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const menuItems = [
    { title: t("dashboard"), url: "/dashboard", icon: LayoutDashboard },
    { title: t("visaInfo"), url: "/visa-info", icon: Users },
    { title: t("articles"), url: "/articles", icon: FileText },
    { title: t("settings"), url: "/settings", icon: Settings },
  ];

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-embassy-navy">
        <div className="p-4 border-b border-embassy-blue/20">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-embassy-gold" />
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-white">Embassy</h2>
                <p className="text-xs text-embassy-blue">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-embassy-blue font-medium px-4 py-2">
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-4 py-2 text-white transition-colors ${
                          isActive 
                            ? "bg-embassy-blue text-white font-medium" 
                            : "hover:bg-embassy-blue/20"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-embassy-blue/20">
          <SidebarMenuButton asChild>
            <button className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-embassy-blue/20 transition-colors w-full">
              <LogOut className="h-5 w-5" />
              {!collapsed && <span>{t('logout')}</span>}
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}