import React, { useState } from 'react';
import { Plus, Search, Eye, UserPlus, Calendar, Mail, Phone } from 'lucide-react';
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

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'Applied' | 'Screening' | 'Interview' | 'Offered' | 'Hired' | 'Rejected';
  applicationDate: string;
  interviewDate?: string;
  experience: string;
  notes?: string;
}

const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+240 222 555 001',
    position: 'Consular Officer',
    status: 'Interview',
    applicationDate: '2024-01-10',
    interviewDate: '2024-01-20',
    experience: '5 years in diplomatic services',
    notes: 'Strong candidate with relevant experience'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+240 222 555 002',
    position: 'Administrative Assistant',
    status: 'Offered',
    applicationDate: '2024-01-08',
    experience: '3 years in administration',
    notes: 'Excellent organizational skills'
  },
  {
    id: 3,
    name: 'Peter Jones',
    email: 'peter.jones@email.com',
    phone: '+240 222 555 003',
    position: 'Visa Specialist',
    status: 'Screening',
    applicationDate: '2024-01-15',
    experience: '2 years in visa processing',
  },
  {
    id: 4,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+240 222 555 004',
    position: 'Security Officer',
    status: 'Applied',
    applicationDate: '2024-01-18',
    experience: '7 years in security services',
  }
];

export default function Recruitment() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newCandidate, setNewCandidate] = useState<Partial<Candidate>>({
    name: '',
    email: '',
    phone: '',
    position: '',
    status: 'Applied',
    experience: '',
    notes: ''
  });

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddCandidate = async () => {
    if (!newCandidate.name || !newCandidate.email || !newCandidate.position) {
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
      
      const candidate: Candidate = {
        id: Math.max(...candidates.map(c => c.id)) + 1,
        name: newCandidate.name!,
        email: newCandidate.email!,
        phone: newCandidate.phone || '',
        position: newCandidate.position!,
        status: newCandidate.status as Candidate['status'] || 'Applied',
        applicationDate: new Date().toISOString().split('T')[0],
        experience: newCandidate.experience || '',
        notes: newCandidate.notes || ''
      };

      setCandidates([...candidates, candidate]);
      setNewCandidate({
        name: '',
        email: '',
        phone: '',
        position: '',
        status: 'Applied',
        experience: '',
        notes: ''
      });
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Candidate added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add candidate",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-guinea-blue/10 text-guinea-blue border-guinea-blue/20';
      case 'Screening': return 'bg-guinea-yellow/10 text-guinea-yellow border-guinea-yellow/20';
      case 'Interview': return 'bg-embassy-blue/10 text-embassy-blue border-embassy-blue/20';
      case 'Offered': return 'bg-guinea-green/10 text-guinea-green border-guinea-green/20';
      case 'Hired': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-guinea-red/10 text-guinea-red border-guinea-red/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('recruitment')}</h1>
            <p className="text-muted-foreground mt-2">{t('recruitmentManagement')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-embassy-navy hover:bg-embassy-navy/90">
                <Plus className="h-4 w-4 mr-2" />
                {t('addCandidate')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t('addCandidate')}</DialogTitle>
                <DialogDescription>
                  Add a new candidate to the recruitment pipeline
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')} *</Label>
                  <Input
                    id="name"
                    value={newCandidate.name || ''}
                    onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCandidate.email || ''}
                    onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    value={newCandidate.phone || ''}
                    onChange={(e) => setNewCandidate({...newCandidate, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">{t('position')} *</Label>
                  <Select value={newCandidate.position || ''} onValueChange={(value) => setNewCandidate({...newCandidate, position: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consular Officer">Consular Officer</SelectItem>
                      <SelectItem value="Administrative Assistant">Administrative Assistant</SelectItem>
                      <SelectItem value="Visa Specialist">Visa Specialist</SelectItem>
                      <SelectItem value="Security Officer">Security Officer</SelectItem>
                      <SelectItem value="Finance Officer">Finance Officer</SelectItem>
                      <SelectItem value="IT Specialist">IT Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Textarea
                    id="experience"
                    value={newCandidate.experience || ''}
                    onChange={(e) => setNewCandidate({...newCandidate, experience: e.target.value})}
                    placeholder="Brief description of relevant experience"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newCandidate.notes || ''}
                    onChange={(e) => setNewCandidate({...newCandidate, notes: e.target.value})}
                    placeholder="Additional notes about the candidate"
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button onClick={handleAddCandidate} disabled={isLoading}>
                  {isLoading ? t('loading') : t('save')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search & Filter Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, position, or email..."
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
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offered">Offered</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
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
                <UserPlus className="h-5 w-5 mr-2" />
                {t('candidateList')} ({filteredCandidates.length})
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-blue rounded-full mr-2"></div>
                  Applied: {candidates.filter(c => c.status === 'Applied').length}
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-green rounded-full mr-2"></div>
                  Offered: {candidates.filter(c => c.status === 'Offered').length}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('candidate')}</TableHead>
                  <TableHead>{t('position')}</TableHead>
                  <TableHead>{t('applicationStatus')}</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>{t('interviewDate')}</TableHead>
                  <TableHead>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <UserPlus className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span>{candidate.email}</span>
                          </div>
                          {candidate.phone && (
                            <div className="text-sm text-muted-foreground flex items-center space-x-2">
                              <Phone className="h-3 w-3" />
                              <span>{candidate.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(candidate.status)}>
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {candidate.applicationDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      {candidate.interviewDate ? (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {candidate.interviewDate}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not scheduled</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedCandidate(candidate)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Candidate Details - {selectedCandidate?.name}</DialogTitle>
                            <DialogDescription>
                              Complete information for {selectedCandidate?.name}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedCandidate && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">{t('name')}</label>
                                  <p className="text-sm text-muted-foreground">{selectedCandidate.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">{t('email')}</label>
                                  <p className="text-sm text-muted-foreground">{selectedCandidate.email}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">{t('phone')}</label>
                                  <p className="text-sm text-muted-foreground">{selectedCandidate.phone || 'Not provided'}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">{t('position')}</label>
                                  <p className="text-sm text-muted-foreground">{selectedCandidate.position}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">{t('applicationStatus')}</label>
                                  <Badge className={getStatusColor(selectedCandidate.status)}>
                                    {selectedCandidate.status}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Application Date</label>
                                  <p className="text-sm text-muted-foreground">{selectedCandidate.applicationDate}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Experience</label>
                                <p className="text-sm text-muted-foreground mt-1">{selectedCandidate.experience || 'No experience provided'}</p>
                              </div>
                              {selectedCandidate.notes && (
                                <div>
                                  <label className="text-sm font-medium">Notes</label>
                                  <p className="text-sm text-muted-foreground mt-1">{selectedCandidate.notes}</p>
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
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}