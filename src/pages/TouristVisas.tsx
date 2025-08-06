import React, { useState } from 'react';
import { Search, Globe, Eye, Download, MoreHorizontal, MapPin, Calendar } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TouristVisaApplication {
  id: string;
  applicantName: string;
  passportNumber: string;
  nationality: string;
  purpose: string;
  plannedStay: string;
  accommodation: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  submissionDate: string;
  processingDate?: string;
  validUntil?: string;
  documents: string[];
  contactEmail: string;
  travelDates: {
    arrival: string;
    departure: string;
  };
  notes?: string;
}

const initialApplications: TouristVisaApplication[] = [
  {
    id: 'TV001',
    applicantName: 'Sarah Johnson',
    passportNumber: 'CA1234567',
    nationality: 'Canadian',
    purpose: 'Tourism and sightseeing',
    plannedStay: '14 days',
    accommodation: 'Hotel Malabo Plaza',
    status: 'Approved',
    submissionDate: '2024-01-10',
    processingDate: '2024-01-15',
    validUntil: '2024-07-15',
    documents: ['Passport', 'Photos', 'Hotel Booking', 'Travel Insurance', 'Flight Tickets'],
    contactEmail: 'sarah.johnson@email.com',
    travelDates: {
      arrival: '2024-02-01',
      departure: '2024-02-15'
    },
    notes: 'First-time visitor to Equatorial Guinea'
  },
  {
    id: 'TV002',
    applicantName: 'Michael Brown',
    passportNumber: 'US9876543',
    nationality: 'American',
    purpose: 'Wildlife photography',
    plannedStay: '21 days',
    accommodation: 'Eco Lodge Bata',
    status: 'Pending',
    submissionDate: '2024-01-18',
    documents: ['Passport', 'Photography Equipment List', 'Accommodation Booking', 'Travel Insurance'],
    contactEmail: 'michael.brown@photographer.com',
    travelDates: {
      arrival: '2024-02-10',
      departure: '2024-03-03'
    }
  },
  {
    id: 'TV003',
    applicantName: 'Emma Wilson',
    passportNumber: 'AU5555555',
    nationality: 'Australian',
    purpose: 'Cultural exploration',
    plannedStay: '10 days',
    accommodation: 'Guesthouse Central Malabo',
    status: 'Under Review',
    submissionDate: '2024-01-20',
    documents: ['Passport', 'Travel Itinerary', 'Accommodation Proof', 'Bank Statements'],
    contactEmail: 'emma.wilson@email.com',
    travelDates: {
      arrival: '2024-02-15',
      departure: '2024-02-25'
    },
    notes: 'Interested in local art and culture'
  },
  {
    id: 'TV004',
    applicantName: 'Hans Mueller',
    passportNumber: 'DE7777777',
    nationality: 'German',
    purpose: 'Beach vacation',
    plannedStay: '7 days',
    accommodation: 'Coastal Resort Bata',
    status: 'Rejected',
    submissionDate: '2024-01-12',
    processingDate: '2024-01-17',
    documents: ['Passport', 'Resort Booking'],
    contactEmail: 'hans.mueller@email.de',
    travelDates: {
      arrival: '2024-02-05',
      departure: '2024-02-12'
    },
    notes: 'Insufficient travel insurance documentation'
  }
];

export default function TouristVisas() {
  const { t } = useTranslation();
  const [applications, setApplications] = useState<TouristVisaApplication[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<TouristVisaApplication | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '') === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-guinea-green/10 text-guinea-green border-guinea-green/20';
      case 'Pending': return 'bg-guinea-yellow/10 text-guinea-yellow border-guinea-yellow/20';
      case 'Under Review': return 'bg-guinea-blue/10 text-guinea-blue border-guinea-blue/20';
      case 'Rejected': return 'bg-guinea-red/10 text-guinea-red border-guinea-red/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('touristVisas')}</h1>
          <p className="text-muted-foreground mt-2">{t('touristVisaApplications')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search & Filter Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, passport, or purpose..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="underreview">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Tourist Visa Applications ({filteredApplications.length})
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-yellow rounded-full mr-2"></div>
                  Pending: {applications.filter(a => a.status === 'Pending').length}
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-green rounded-full mr-2"></div>
                  Approved: {applications.filter(a => a.status === 'Approved').length}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Tourist</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Travel Dates</TableHead>
                  <TableHead>Stay Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{application.applicantName}</div>
                          <div className="text-sm text-muted-foreground">{application.nationality}</div>
                          <div className="text-sm text-muted-foreground">{application.passportNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div>
                        <div className="font-medium text-sm">{application.purpose}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {application.accommodation}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {application.travelDates.arrival}
                        </div>
                        <div className="text-muted-foreground">
                          to {application.travelDates.departure}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{application.plannedStay}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{application.submissionDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Tourist Visa Application - {selectedApplication?.id}</DialogTitle>
                              <DialogDescription>
                                Complete details for {selectedApplication?.applicantName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Tourist Name</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.applicantName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Passport Number</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.passportNumber}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Nationality</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.nationality}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Contact Email</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.contactEmail}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Purpose of Visit</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.purpose}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Planned Stay</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.plannedStay}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Accommodation</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.accommodation}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Badge className={getStatusColor(selectedApplication.status)}>
                                      {selectedApplication.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Arrival Date</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.travelDates.arrival}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Departure Date</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.travelDates.departure}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Submission Date</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.submissionDate}</p>
                                  </div>
                                  {selectedApplication.validUntil && (
                                    <div>
                                      <label className="text-sm font-medium">Valid Until</label>
                                      <p className="text-sm text-muted-foreground">{selectedApplication.validUntil}</p>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Submitted Documents</label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedApplication.documents.map((doc, index) => (
                                      <Badge key={index} variant="outline">{doc}</Badge>
                                    ))}
                                  </div>
                                </div>
                                {selectedApplication.notes && (
                                  <div>
                                    <label className="text-sm font-medium">Notes</label>
                                    <p className="text-sm text-muted-foreground mt-1">{selectedApplication.notes}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download Documents
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Approve Application
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Request Additional Info
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Reject Application
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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