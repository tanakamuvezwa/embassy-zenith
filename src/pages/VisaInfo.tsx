import React, { useState } from 'react';
import { Search, Filter, Eye, Download, MoreHorizontal } from 'lucide-react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const visaApplications = [
  {
    id: 'V001',
    name: 'John Smith',
    passport: 'US1234567',
    visaType: 'Tourist',
    status: 'Pending',
    submissionDate: '2024-01-15',
    nationality: 'American',
    purpose: 'Tourism',
    documents: ['Passport', 'Photos', 'Hotel Booking']
  },
  {
    id: 'V002',
    name: 'Maria Garcia',
    passport: 'ES9876543',
    visaType: 'Business',
    status: 'Approved',
    submissionDate: '2024-01-14',
    nationality: 'Spanish',
    purpose: 'Business Meeting',
    documents: ['Passport', 'Invitation Letter', 'Company Letter']
  },
  {
    id: 'V003',
    name: 'David Chen',
    passport: 'CN5555555',
    visaType: 'Student',
    status: 'Under Review',
    submissionDate: '2024-01-14',
    nationality: 'Chinese',
    purpose: 'University Studies',
    documents: ['Passport', 'Acceptance Letter', 'Financial Proof']
  },
  {
    id: 'V004',
    name: 'Sarah Johnson',
    passport: 'CA7777777',
    visaType: 'Tourist',
    status: 'Approved',
    submissionDate: '2024-01-13',
    nationality: 'Canadian',
    purpose: 'Vacation',
    documents: ['Passport', 'Photos', 'Travel Insurance']
  },
  {
    id: 'V005',
    name: 'Ahmed Hassan',
    passport: 'EG3333333',
    visaType: 'Work',
    status: 'Rejected',
    submissionDate: '2024-01-13',
    nationality: 'Egyptian',
    purpose: 'Employment',
    documents: ['Passport', 'Work Permit', 'Medical Certificate']
  },
];

export default function VisaInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [visaTypeFilter, setVisaTypeFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = visaApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.passport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter;
    const matchesType = visaTypeFilter === 'all' || app.visaType.toLowerCase() === visaTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visa Applications</h1>
          <p className="text-muted-foreground mt-2">Manage and review visa applications</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Search & Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or passport number..."
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
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={visaTypeFilter} onValueChange={setVisaTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Passport Number</TableHead>
                  <TableHead>Visa Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.passport}</TableCell>
                    <TableCell>{application.visaType}</TableCell>
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
                            <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Application Details - {application?.id}</DialogTitle>
                              <DialogDescription>
                                Complete information for {application?.name}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Full Name</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Passport Number</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.passport}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Nationality</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.nationality}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Visa Type</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.visaType}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Purpose</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.purpose}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Badge className={getStatusColor(selectedApplication.status)}>
                                      {selectedApplication.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Submitted Documents</label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedApplication.documents.map((doc, index) => (
                                      <Badge key={index} variant="outline">{doc}</Badge>
                                    ))}
                                  </div>
                                </div>
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