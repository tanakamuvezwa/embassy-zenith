import React, { useState } from 'react';
import { Search, BriefcaseBusiness, Eye, Download, MoreHorizontal } from 'lucide-react';
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

interface BusinessVisaApplication {
  id: string;
  applicantName: string;
  passportNumber: string;
  nationality: string;
  company: string;
  purpose: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  submissionDate: string;
  processingDate?: string;
  validUntil?: string;
  documents: string[];
  contactEmail: string;
  notes?: string;
}

const initialApplications: BusinessVisaApplication[] = [
  {
    id: 'BV001',
    applicantName: 'John Doe',
    passportNumber: 'US1234567',
    nationality: 'American',
    company: 'Tech Solutions Inc.',
    purpose: 'Business meetings and contract negotiations',
    status: 'Pending',
    submissionDate: '2024-01-15',
    documents: ['Passport', 'Invitation Letter', 'Company Registration', 'Financial Statements'],
    contactEmail: 'john.doe@techsolutions.com',
    notes: 'Urgent processing requested'
  },
  {
    id: 'BV002',
    applicantName: 'Jane Smith',
    passportNumber: 'UK9876543',
    nationality: 'British',
    company: 'Global Trade Ltd.',
    purpose: 'Market research and partnership discussions',
    status: 'Approved',
    submissionDate: '2024-01-10',
    processingDate: '2024-01-18',
    validUntil: '2024-07-18',
    documents: ['Passport', 'Business License', 'Invitation Letter', 'Travel Insurance'],
    contactEmail: 'jane.smith@globaltrade.co.uk'
  },
  {
    id: 'BV003',
    applicantName: 'Pierre Dubois',
    passportNumber: 'FR5555555',
    nationality: 'French',
    company: 'Energy Solutions SARL',
    purpose: 'Oil and gas industry consultation',
    status: 'Under Review',
    submissionDate: '2024-01-12',
    documents: ['Passport', 'Professional Credentials', 'Company Certificate', 'Project Documents'],
    contactEmail: 'pierre.dubois@energysolutions.fr',
    notes: 'Requires technical expertise verification'
  },
  {
    id: 'BV004',
    applicantName: 'Maria Rodriguez',
    passportNumber: 'ES7777777',
    nationality: 'Spanish',
    company: 'Construction Hispana S.A.',
    purpose: 'Infrastructure project assessment',
    status: 'Rejected',
    submissionDate: '2024-01-08',
    processingDate: '2024-01-16',
    documents: ['Passport', 'Company Documents', 'Project Proposal'],
    contactEmail: 'maria.rodriguez@construccion.es',
    notes: 'Incomplete documentation - missing financial guarantees'
  }
];

export default function BusinessVisas() {
  const { t } = useTranslation();
  const [applications, setApplications] = useState<BusinessVisaApplication[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<BusinessVisaApplication | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
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
          <h1 className="text-3xl font-bold text-foreground">{t('businessVisas')}</h1>
          <p className="text-muted-foreground mt-2">{t('businessVisaApplications')}</p>
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
                  placeholder="Search by name, passport, or company..."
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
                <BriefcaseBusiness className="h-5 w-5 mr-2" />
                Business Visa Applications ({filteredApplications.length})
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
                  <TableHead>Applicant</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Purpose</TableHead>
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
                          <BriefcaseBusiness className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{application.applicantName}</div>
                          <div className="text-sm text-muted-foreground">{application.nationality}</div>
                          <div className="text-sm text-muted-foreground">{application.passportNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{application.company}</TableCell>
                    <TableCell className="max-w-xs truncate">{application.purpose}</TableCell>
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
                              <DialogTitle>Business Visa Application - {selectedApplication?.id}</DialogTitle>
                              <DialogDescription>
                                Complete details for {selectedApplication?.applicantName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Applicant Name</label>
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
                                    <label className="text-sm font-medium">Company</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.company}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Contact Email</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.contactEmail}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Badge className={getStatusColor(selectedApplication.status)}>
                                      {selectedApplication.status}
                                    </Badge>
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
                                  <label className="text-sm font-medium">Purpose of Visit</label>
                                  <p className="text-sm text-muted-foreground mt-1">{selectedApplication.purpose}</p>
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