import React, { useState, useEffect } from 'react';
import { Search, FileText, User, Calendar, Phone, Mail, Building, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface SearchResult {
  id: string;
  type: 'visa' | 'contact' | 'appointment' | 'document' | 'article';
  title: string;
  subtitle?: string;
  description?: string;
  status?: string;
  date?: string;
  icon: React.ReactNode;
  url: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'visa',
    title: 'John Doe - Tourist Visa Application',
    subtitle: 'Application #TV-2024-001',
    description: 'Pending document review',
    status: 'Pending',
    date: '2024-01-15',
    icon: <FileText className="h-4 w-4" />,
    url: '/visa-applications/tourist'
  },
  {
    id: '2',
    type: 'contact',
    title: 'Maria Rodriguez',
    subtitle: 'Spanish Ministry of Foreign Affairs',
    description: 'maria.rodriguez@gov.es',
    status: 'Active',
    icon: <User className="h-4 w-4" />,
    url: '/contacts'
  },
  {
    id: '3',
    type: 'appointment',
    title: 'Business Partnership Meeting',
    subtitle: 'Conference Room A',
    description: 'Trade agreement discussion',
    date: '2024-01-16 14:30',
    icon: <Calendar className="h-4 w-4" />,
    url: '/appointments'
  },
  {
    id: '4',
    type: 'document',
    title: 'Visa Requirements Guide 2024',
    subtitle: 'Embassy Documentation',
    description: 'Updated visa application requirements',
    date: '2024-01-10',
    icon: <FileText className="h-4 w-4" />,
    url: '/articles'
  }
];

export function GlobalSearch() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const filtered = mockSearchResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredResults(filtered);
  }, [searchQuery]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'visa': return 'bg-embassy-navy/10 text-embassy-navy';
      case 'contact': return 'bg-blue-100 text-blue-800';
      case 'appointment': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-purple-100 text-purple-800';
      case 'article': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': case 'Approved': return 'bg-guinea-green/10 text-guinea-green';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': case 'Cancelled': return 'bg-guinea-red/10 text-guinea-red';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder={t('searchPlaceholder')}
            className="pl-10 w-80 bg-background cursor-pointer"
            readOnly
            onClick={() => setOpen(true)}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Global Search
          </DialogTitle>
        </DialogHeader>
        
        <Command className="rounded-lg border-none">
          <CommandInput 
            placeholder="Search across all embassy data..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-96">
            <CommandEmpty>
              {searchQuery ? 'No results found.' : 'Start typing to search...'}
            </CommandEmpty>
            
            {filteredResults.length > 0 && (
              <>
                <CommandGroup heading="Search Results">
                  {filteredResults.map((result) => (
                    <CommandItem 
                      key={result.id} 
                      className="p-4 cursor-pointer hover:bg-accent"
                      onSelect={() => {
                        setOpen(false);
                        // Navigate to result URL
                        window.location.href = result.url;
                      }}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className="bg-primary/10 rounded-full p-2 mt-1">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm truncate">{result.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge className={getTypeColor(result.type)}>
                                {result.type}
                              </Badge>
                              {result.status && (
                                <Badge className={getStatusColor(result.status)}>
                                  {result.status}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {result.subtitle && (
                            <p className="text-sm text-muted-foreground">{result.subtitle}</p>
                          )}
                          {result.description && (
                            <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                          )}
                          {result.date && (
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {result.date}
                            </div>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}