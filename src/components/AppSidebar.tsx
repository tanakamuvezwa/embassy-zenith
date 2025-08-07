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
  LogOut,
  UserPlus, // Icon for Recruitment
  Contact, // Icon for Contacts
  CalendarDays // Icon for Appointments
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

  const employeeMenu = {
    title: t("employees"),
    icon: Users,
    items: [
      { title: t("employeeManagement"), url: "/employees", icon: Users },
      { title: t("recruitment"), url: "/employees/recruitment", icon: UserPlus },
    ]
  };

  const visaMenu = {
    title: t("visaApplications"),
    icon: Plane,
    items: [
      { title: t("businessVisas"), url: "/visa-applications/business", icon: BriefcaseBusiness },
      { title: t("studentVisas"), url: "/visa-applications/student", icon: GraduationCap },
      { title: t("touristVisas"), url: "/visa-applications/tourist", icon: Globe },
    ]
  };

  const additionalMenuItems = [
    { title: t("inCountryCheck"), url: "/in-country-check", icon: UserCheck },
    { title: t("contacts"), url: "/contacts", icon: Contact },
    { title: "Appointments", url: "/appointments", icon: CalendarDays },
  ];

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
                <SidebarMenuItem key={item.title}>
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>        
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-embassy-blue font-medium px-4 py-2">
            {!collapsed && "Modules"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Employee Management */}
              <SidebarMenuItem>
                <SidebarMenuButton className={`flex items-center space-x-3 px-4 py-2 text-white transition-colors ${currentPath.startsWith("/employees") ? "bg-embassy-blue text-white font-medium" : "hover:bg-embassy-blue/20"}`}>
                  <employeeMenu.icon className="h-5 w-5" />
                  {!collapsed && <span>{employeeMenu.title}</span>}
                </SidebarMenuButton>
                {!collapsed && (
                  <SidebarGroupContent>
                    {employeeMenu.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={item.url} className={({ isActive }) => `flex items-center space-x-3 px-8 py-2 text-white transition-colors ${isActive ? "bg-embassy-blue text-white font-medium" : "hover:bg-embassy-blue/20"}`}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarGroupContent>
                )}
              </SidebarMenuItem>
              
              {/* Visa Applications */}
              <SidebarMenuItem>
                <SidebarMenuButton className={`flex items-center space-x-3 px-4 py-2 text-white transition-colors ${currentPath.startsWith("/visa-applications") ? "bg-embassy-blue text-white font-medium" : "hover:bg-embassy-blue/20"}`}>
                  <visaMenu.icon className="h-5 w-5" />
                  {!collapsed && <span>{visaMenu.title}</span>}
                </SidebarMenuButton>
                {!collapsed && (
                  <SidebarGroupContent>
                    {visaMenu.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink to={item.url} className={({ isActive }) => `flex items-center space-x-3 px-8 py-2 text-white transition-colors ${isActive ? "bg-embassy-blue text-white font-medium" : "hover:bg-embassy-blue/20"}`}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarGroupContent>
                )}
              </SidebarMenuItem>
              
              {/* Additional Menu Items */}
              {additionalMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Logout Button */}
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