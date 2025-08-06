import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Contact, Mail, Phone, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: 'Business' | 'Government' | 'Embassy' | 'Media' | 'Academic' | 'Other';
  organization?: string;
  position?: string;
  address?: string;
  notes?: string;
  status: 'Active' | 'Inactive';
  lastContact?: string;
}

const initialContacts: ContactInfo[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@techcorp.com',
    phone: '+1-555-123-4567',
    category: 'Business',
    organization: 'Tech Corporation',
    position: 'CEO',
    address: '123 Business Ave, New York, NY',
    status: 'Active',
    lastContact: '2024-01-15',
    notes: 'Interested in trade partnerships'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    phone: '+44-20-7946-0958',
    category: 'Academic',
    organization: 'London University',
    position: 'Professor of International Relations',
    address: 'University Campus, London, UK',
    status: 'Active',
    lastContact: '2024-01-10',
    notes: 'Research collaboration on African studies'
  },
  {
    id: 3,
    name: 'Peter Jones',
    email: 'peter.jones@news.com',
    phone: '+33-1-42-86-83-00',
    category: 'Media',
    organization: 'International News Network',
    position: 'Foreign Correspondent',
    address: 'Paris, France',
    status: 'Active',
    lastContact: '2024-01-08',
    notes: 'Covers African politics and economics'
  },
  {
    id: 4,
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@gov.es',
    phone: '+34-91-379-17-00',
    category: 'Government',
    organization: 'Spanish Ministry of Foreign Affairs',
    position: 'Deputy Director',
    address: 'Madrid, Spain',
    status: 'Inactive',
    lastContact: '2023-12-20',
    notes: 'Former contact, position changed'
  }
];

export default function Contacts() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ContactInfo[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newContact, setNewContact] = useState<Partial<ContactInfo>>({
    name: '',
    email: '',
    phone: '',
    category: 'Business',
    organization: '',
    position: '',
    address: '',
    notes: '',
    status: 'Active'
  });

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.position?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || contact.category.toLowerCase() === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const contact: ContactInfo = {
        id: Math.max(...contacts.map(c => c.id)) + 1,
        name: newContact.name!,
        email: newContact.email!,
        phone: newContact.phone || '',
        category: newContact.category as ContactInfo['category'] || 'Business',
        organization: newContact.organization || '',
        position: newContact.position || '',
        address: newContact.address || '',
        notes: newContact.notes || '',
        status: newContact.status as 'Active' | 'Inactive' || 'Active',
        lastContact: new Date().toISOString().split('T')[0]
      };

      setContacts([...contacts, contact]);
      setNewContact({
        name: '',
        email: '',
        phone: '',
        category: 'Business',
        organization: '',
        position: '',
        address: '',
        notes: '',
        status: 'Active'
      });
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Contact added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add contact",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-guinea-green/10 text-guinea-green border-guinea-green/20'
      : 'bg-guinea-red/10 text-guinea-red border-guinea-red/20';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Business': return 'bg-blue-100 text-blue-800';
      case 'Government': return 'bg-purple-100 text-purple-800';
      case 'Embassy': return 'bg-embassy-navy/10 text-embassy-navy';
      case 'Media': return 'bg-orange-100 text-orange-800';
      case 'Academic': return 'bg-green-100 text-green-800';
      case 'Other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('contacts')}</h1>
            <p className="text-muted-foreground mt-2">{t('contactManagement')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-embassy-navy hover:bg-embassy-navy/90">
                <Plus className="h-4 w-4 mr-2" />
                {t('addContact')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t('addContact')}</DialogTitle>
                <DialogDescription>
                  Add a new contact to your directory
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')} *</Label>
                  <Input
                    id="name"
                    value={newContact.name || ''}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email || ''}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    value={newContact.phone || ''}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newContact.category || 'Business'} onValueChange={(value) => setNewContact({...newContact, category: value as ContactInfo['category']})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Embassy">Embassy</SelectItem>
                      <SelectItem value="Media">Media</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={newContact.organization || ''}
                    onChange={(e) => setNewContact({...newContact, organization: e.target.value})}
                    placeholder="Enter organization name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">{t('position')}</Label>
                  <Input
                    id="position"
                    value={newContact.position || ''}
                    onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                    placeholder="Enter position/title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={newContact.address || ''}
                    onChange={(e) => setNewContact({...newContact, address: e.target.value})}
                    placeholder="Enter address"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newContact.notes || ''}
                    onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    placeholder="Additional notes"
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button onClick={handleAddContact} disabled={isLoading}>
                  {isLoading ? t('loading') : t('save')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search & Filter Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, organization, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="embassy">Embassy</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Contact className="h-5 w-5 mr-2" />
                {t('contactList')} ({filteredContacts.length})
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-green rounded-full mr-2"></div>
                  Active: {contacts.filter(c => c.status === 'Active').length}
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-red rounded-full mr-2"></div>
                  Inactive: {contacts.filter(c => c.status === 'Inactive').length}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Organization & Position</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Contact className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          {contact.address && (
                            <div className="text-sm text-muted-foreground">{contact.address}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {contact.organization && (
                          <div className="flex items-center font-medium text-sm">
                            <Building className="h-3 w-3 mr-1" />
                            {contact.organization}
                          </div>
                        )}
                        {contact.position && (
                          <div className="text-sm text-muted-foreground">{contact.position}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(contact.category)}>
                        {contact.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {contact.lastContact || 'Never'}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}