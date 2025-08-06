import React, { useState } from 'react';
import { Search, GraduationCap, Eye, Download, MoreHorizontal } from 'lucide-react';
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

interface StudentVisaApplication {
  id: string;
  applicantName: string;
  passportNumber: string;
  nationality: string;
  university: string;
  program: string;
  studyLevel: 'Bachelor' | 'Master' | 'PhD' | 'Exchange';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  submissionDate: string;
  processingDate?: string;
  validUntil?: string;
  documents: string[];
  contactEmail: string;
  duration: string;
  notes?: string;
}

const initialApplications: StudentVisaApplication[] = [
  {
    id: 'SV001',
    applicantName: 'Alice Smith',
    passportNumber: 'US2345678',
    nationality: 'American',
    university: 'Universidad Nacional de Guinea Ecuatorial',
    program: 'International Relations',
    studyLevel: 'Master',
    status: 'Approved',
    submissionDate: '2023-08-15',
    processingDate: '2023-08-25',
    validUntil: '2025-08-25',
    documents: ['Passport', 'Acceptance Letter', 'Financial Proof', 'Academic Transcripts', 'Medical Certificate'],
    contactEmail: 'alice.smith@email.com',
    duration: '2 years',
    notes: 'Scholarship recipient'
  },
  {
    id: 'SV002',
    applicantName: 'Bob Johnson',
    passportNumber: 'CA3456789',
    nationality: 'Canadian',
    university: 'Instituto Tecnológico de Malabo',
    program: 'Computer Science',
    studyLevel: 'Bachelor',
    status: 'Pending',
    submissionDate: '2024-01-10',
    documents: ['Passport', 'University Acceptance', 'Bank Statements', 'High School Diploma'],
    contactEmail: 'bob.johnson@email.com',
    duration: '4 years'
  },
  {
    id: 'SV003',
    applicantName: 'Charlie Brown',
    passportNumber: 'AU4567890',
    nationality: 'Australian',
    university: 'Universidad de Bata',
    program: 'Environmental Science',
    studyLevel: 'PhD',
    status: 'Under Review',
    submissionDate: '2024-01-05',
    documents: ['Passport', 'Research Proposal', 'Academic References', 'Financial Guarantee', 'Language Certificate'],
    contactEmail: 'charlie.brown@email.com',
    duration: '3 years',
    notes: 'Research visa required'
  },
  {
    id: 'SV004',
    applicantName: 'Diana Prince',
    passportNumber: 'UK5678901',
    nationality: 'British',
    university: 'Universidad Nacional de Guinea Ecuatorial',
    program: 'Spanish Language and Culture',
    studyLevel: 'Exchange',
    status: 'Rejected',
    submissionDate: '2024-01-01',
    processingDate: '2024-01-08',
    documents: ['Passport', 'Exchange Agreement', 'Insurance'],
    contactEmail: 'diana.prince@email.com',
    duration: '6 months',
    notes: 'Incomplete financial documentation'
  }
];

export default function StudentVisas() {
  const { t } = useTranslation();
  const [applications, setApplications] = useState<StudentVisaApplication[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<StudentVisaApplication | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase().replace(' ', '') === statusFilter;
    const matchesLevel = levelFilter === 'all' || app.studyLevel.toLowerCase() === levelFilter;
    
    return matchesSearch && matchesStatus && matchesLevel;
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bachelor': return 'bg-blue-100 text-blue-800';
      case 'Master': return 'bg-purple-100 text-purple-800';
      case 'PhD': return 'bg-indigo-100 text-indigo-800';
      case 'Exchange': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('studentVisas')}</h1>
          <p className="text-muted-foreground mt-2">{t('studentVisaApplications')}</p>
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
                  placeholder="Search by name, passport, university, or program..."
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

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Student Visa Applications ({filteredApplications.length})
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
                  <TableHead>Student</TableHead>
                  <TableHead>University & Program</TableHead>
                  <TableHead>Study Level</TableHead>
                  <TableHead>Duration</TableHead>
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
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{application.applicantName}</div>
                          <div className="text-sm text-muted-foreground">{application.nationality}</div>
                          <div className="text-sm text-muted-foreground">{application.passportNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{application.university}</div>
                        <div className="text-sm text-muted-foreground">{application.program}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLevelColor(application.studyLevel)}>
                        {application.studyLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{application.duration}</TableCell>
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
                              <DialogTitle>Student Visa Application - {selectedApplication?.id}</DialogTitle>
                              <DialogDescription>
                                Complete details for {selectedApplication?.applicantName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Student Name</label>
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
                                    <label className="text-sm font-medium">University</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.university}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Program</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.program}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Study Level</label>
                                    <Badge className={getLevelColor(selectedApplication.studyLevel)}>
                                      {selectedApplication.studyLevel}
                                    </Badge>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Duration</label>
                                    <p className="text-sm text-muted-foreground">{selectedApplication.duration}</p>
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