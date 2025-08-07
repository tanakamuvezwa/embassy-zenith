import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', shortCode: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', shortCode: 'ES' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', shortCode: 'TR' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', shortCode: 'FR' },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          <span className="text-base mr-1">{currentLanguage.flag}</span>
          {currentLanguage.shortCode}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-popover border border-border shadow-lg" align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center space-x-3 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
              i18n.language === language.code ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{language.shortCode}</span>
              <span className="text-xs text-muted-foreground">{language.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}