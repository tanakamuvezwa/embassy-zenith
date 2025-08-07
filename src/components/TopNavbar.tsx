import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSelector } from "./LanguageSelector";
import { GlobalSearch } from "./GlobalSearch";
import equatorialGuineaFlag from "@/assets/equatorial-guinea-flag.svg";

export function TopNavbar() {
  const { t } = useTranslation();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        
        {/* Embassy Branding */}
        <div className="flex items-center space-x-3">
          <img 
            src={equatorialGuineaFlag} 
            alt="Equatorial Guinea Flag" 
            className="h-8 w-12 object-cover rounded-sm border border-border"
          />
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-foreground">
              Embassy of Equatorial Guinea
            </h1>
            <p className="text-xs text-muted-foreground">Administration Panel</p>
          </div>
        </div>
        
        <GlobalSearch />
      </div>

      <div className="flex items-center space-x-3">
        <LanguageSelector />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover border border-border shadow-lg" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{t('adminUser')}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@embassy.gov
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
              {t('settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-destructive focus:text-destructive">
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}