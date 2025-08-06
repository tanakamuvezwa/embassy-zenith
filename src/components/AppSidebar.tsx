import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  FileText, 
  Users,
  Settings,
  Building2 as EmbassyIcon, // Renamed for clarity
  UserCheck, // Icon for In Country check
  Plane, // Icon for Visa Applications
  BriefcaseBusiness, // Icon for Business Visas
  GraduationCap, // Icon for Student Visas
  Globe, // Icon for Tourist Visas
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

  const visaMenu = {
    title: t("visaApplications"),
    icon: Plane,
    items: [
      { title: t("businessVisas"), url: "/visa-applications/business", icon: BriefcaseBusiness },
      { title: t("studentVisas"), url: "/visa-applications/student", icon: GraduationCap },
      { title: t("touristVisas"), url: "/visa-applications/tourist", icon: Globe },
    ]
  };

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent hover:text-accent-foreground";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-embassy-navy">
        <div className="p-4 border-b border-embassy-blue/20">
          <div className="flex items-center space-x-2">
            <EmbassyIcon className="h-8 w-8 text-embassy-gold" />
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
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-4 py-2 text-white transition-colors ${isActive 
                            ? "bg-embassy-blue text-white font-medium"
                            : "hover:bg-embassy-blue/20"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />                      
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>        
        {/* Added Modules Group */}
        {/* Adjusted padding and removed unnecessary mt-auto as the logout button is now at the bottom */}
        <div className="p-4 border-t border-embassy-blue/20">
           <SidebarGroup>
             <SidebarGroupLabel className=\"text-embassy-blue font-medium px-4 py-2\">
               {!collapsed && "Modules"}
             </SidebarGroupLabel>
             <SidebarGroupContent>
               <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className={`flex items-center space-x-3 px-4 py-2 text-white transition-colors ${currentPath.startsWith("/visa-applications") ? "bg-embassy-blue text-white font-medium" : "hover:bg-embassy-blue/20"}`}>
                     <visaMenu.icon className="h-5 w-5" />
                     {!collapsed && <span>{visaMenu.title}</span>}
                   </SidebarMenuButton>
                   <SidebarGroupContent>
                     {visaMenu.items.map((item) => (<SidebarMenuItem key={item.title}>
                         <SidebarMenuButton asChild>
                           <NavLink to={item.url} className={({ isActive }) => `flex items-center space-x-3 px-8 py-2 text-white transition-colors ${isActive ? "bg-embassy-blue text-white font-medium" : "hover:bg-embassy-blue/20"}`}>
                             <item.icon className="h-4 w-4" />
                             {!collapsed && <span>{item.title}</span>}
                           </NavLink>
                         </SidebarMenuButton>
                       </SidebarMenuItem>))}
                   </SidebarGroupContent>
                </SidebarMenuItem>
               </SidebarMenu>
             </SidebarGroupContent>
           </SidebarGroup>
          {/* Logout Button - Moved to the bottom */}
          <SidebarMenuButton asChild>
            <button className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-embassy-blue/20 transition-colors w-full mt-4">
              <LogOut className="h-5 w-5" /> {/* Use the LogOut icon */}
              {!collapsed && <span>{t('logout')}</span>} {/* Display Logout text */}
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}