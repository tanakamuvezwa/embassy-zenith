import React, { useState } from 'react';
import { Search, UserCheck, MapPin, Flag, Eye } from 'lucide-react';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Individual {
  id: string;
  name: string;
  nationality: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Under Review';
  entryDate: string;
  visaType: string;
  passportNumber: string;
  purpose: string;
  contactInfo?: string;
  notes?: string;
}

const initialIndividuals: Individual[] = [
  {
    id: 'ID001',
    name: 'John Doe',
    nationality: 'American',
    location: 'Malabo, Equatorial Guinea',
    status: 'Active',
    entryDate: '2024-01-15',
    visaType: 'Business',
    passportNumber: 'US1234567',
    purpose: 'Business meetings',
    contactInfo: 'john.doe@company.com',
    notes: 'Regular business visitor'
  },
  {
    id: 'ID002',
    name: 'Jane Smith',
    nationality: 'British',
    location: 'Bata, Equatorial Guinea',
    status: 'Active',
    entryDate: '2024-01-10',
    visaType: 'Tourist',
    passportNumber: 'UK9876543',
    purpose: 'Tourism',
    contactInfo: 'jane.smith@email.com'
  },
  {
    id: 'ID003',
    name: 'Peter Jones',
    nationality: 'Spanish',
    location: 'Malabo, Equatorial Guinea',
    status: 'Under Review',
    entryDate: '2024-01-20',
    visaType: 'Work',
    passportNumber: 'ES5555555',
    purpose: 'Employment',
    contactInfo: 'peter.jones@company.es',
    notes: 'Work permit verification in progress'
  },
  {
    id: 'ID004',
    name: 'Fatima Diallo',
    nationality: 'French',
    location: 'Malabo, Equatorial Guinea',
    status: 'Inactive',
    entryDate: '2023-12-01',
    visaType: 'Student',
    passportNumber: 'FR7777777',
    purpose: 'Studies',
    contactInfo: 'fatima.diallo@university.fr',
    notes: 'Completed studies and departed'
  }
];

export default function InCountryCheck() {
  const { t } = useTranslation();
  const [individuals, setIndividuals] = useState<Individual[]>(initialIndividuals);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [nationalityFilter, setNationalityFilter] = useState('all');
  const [selectedIndividual, setSelectedIndividual] = useState<Individual | null>(null);

  const filteredIndividuals = individuals.filter(individual => {
    const matchesSearch = individual.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         individual.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         individual.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || individual.status.toLowerCase().replace(' ', '') === statusFilter;
    const matchesNationality = nationalityFilter === 'all' || individual.nationality.toLowerCase() === nationalityFilter;
    
    return matchesSearch && matchesStatus && matchesNationality;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-guinea-green/10 text-guinea-green border-guinea-green/20';
      case 'Inactive': return 'bg-guinea-red/10 text-guinea-red border-guinea-red/20';
      case 'Under Review': return 'bg-guinea-yellow/10 text-guinea-yellow border-guinea-yellow/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const uniqueNationalities = [...new Set(individuals.map(ind => ind.nationality))];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('inCountryCheck')}</h1>
          <p className="text-muted-foreground mt-2">{t('inCountryCheckById')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search & Filter Individuals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={`${t('filterByName')} or ${t('filterById')}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">{t('active')}</SelectItem>
                  <SelectItem value="inactive">{t('inactive')}</SelectItem>
                  <SelectItem value="underreview">Under Review</SelectItem>
                </SelectContent>
              </Select>

              <Select value={nationalityFilter} onValueChange={setNationalityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Nationalities</SelectItem>
                  {uniqueNationalities.map((nationality) => (
                    <SelectItem key={nationality} value={nationality.toLowerCase()}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2" />
                Individuals in Country ({filteredIndividuals.length})
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-green rounded-full mr-2"></div>
                  Active: {individuals.filter(i => i.status === 'Active').length}
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-yellow rounded-full mr-2"></div>
                  Under Review: {individuals.filter(i => i.status === 'Under Review').length}
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-red rounded-full mr-2"></div>
                  Inactive: {individuals.filter(i => i.status === 'Inactive').length}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredIndividuals.length === 0 ? (
              <div className="text-center py-8">
                <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('noDataFound')}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('individualId')}</TableHead>
                    <TableHead>{t('name')}</TableHead>
                    <TableHead>{t('nationality')}</TableHead>
                    <TableHead>{t('location')}</TableHead>
                    <TableHead>Visa Type</TableHead>
                    <TableHead>Entry Date</TableHead>
                    <TableHead>{t('checkStatus')}</TableHead>
                    <TableHead>{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIndividuals.map((individual) => (
                    <TableRow key={individual.id}>
                      <TableCell className="font-medium">{individual.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="bg-primary/10 rounded-full p-2">
                            <UserCheck className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{individual.name}</div>
                            <div className="text-sm text-muted-foreground">{individual.passportNumber}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Flag className="h-4 w-4 mr-2 text-muted-foreground" />
                          {individual.nationality}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {individual.location}
                        </div>
                      </TableCell>
                      <TableCell>{individual.visaType}</TableCell>
                      <TableCell>{individual.entryDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(individual.status)}>
                          {individual.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedIndividual(individual)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Individual Details - {selectedIndividual?.id}</DialogTitle>
                              <DialogDescription>
                                Complete information for {selectedIndividual?.name}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedIndividual && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">{t('individualId')}</label>
                                    <p className="text-sm text-muted-foreground">{selectedIndividual.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">{t('name')}</label>
                                    <p className="text-sm text-muted-foreground">{selectedIndividual.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">{t('nationality')}</label>
                                    <p className="text-sm text-muted-foreground">{selectedIndividual.nationality}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Passport Number</label>
                                    <p className="text-sm text-muted-foreground">{selectedIndividual.passportNumber}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">{t('location')}</label>
                                    <p className="text-sm text-muted-foreground">{selectedIndividual.location}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Visa Type</label>
                                    <p className="text-sm text-muted-foreground">{selectedIndividual.visaType}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Entry Date</label>
                                    <p className="text-sm text-muted-foreground">{selectedIndividual.entryDate}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">{t('checkStatus')}</label>
                                    <Badge className={getStatusColor(selectedIndividual.status)}>
                                      {selectedIndividual.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Purpose of Visit</label>
                                  <p className="text-sm text-muted-foreground mt-1">{selectedIndividual.purpose}</p>
                                </div>
                                {selectedIndividual.contactInfo && (
                                  <div>
                                    <label className="text-sm font-medium">Contact Information</label>
                                    <p className="text-sm text-muted-foreground mt-1">{selectedIndividual.contactInfo}</p>
                                  </div>
                                )}
                                {selectedIndividual.notes && (
                                  <div>
                                    <label className="text-sm font-medium">Notes</label>
                                    <p className="text-sm text-muted-foreground mt-1">{selectedIndividual.notes}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}