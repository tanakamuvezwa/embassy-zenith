import React, { useState } from 'react';
import { Calendar, Clock, Plus, Search, Filter, User, Phone, Mail, MapPin, MoreVertical, Check, X, Edit } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: number;
  title: string;
  applicantName: string;
  email: string;
  phone: string;
  type: 'Visa Interview' | 'Document Review' | 'Business Meeting' | 'Consular Service' | 'Emergency';
  status: 'Scheduled' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
  date: string;
  time: string;
  duration: number; // in minutes
  location: string;
  notes?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdAt: string;
}

const initialAppointments: Appointment[] = [
  {
    id: 1,
    title: 'Tourist Visa Interview',
    applicantName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    type: 'Visa Interview',
    status: 'Scheduled',
    date: '2024-01-16',
    time: '10:00',
    duration: 60,
    location: 'Interview Room 1',
    notes: 'Bring all required documents including bank statements',
    priority: 'Medium',
    createdAt: '2024-01-10'
  },
  {
    id: 2,
    title: 'Business Partnership Meeting',
    applicantName: 'Maria Rodriguez',
    email: 'maria@techcorp.com',
    phone: '+34-91-123-4567',
    type: 'Business Meeting',
    status: 'Confirmed',
    date: '2024-01-16',
    time: '14:30',
    duration: 90,
    location: 'Conference Room A',
    notes: 'Trade agreement discussion',
    priority: 'High',
    createdAt: '2024-01-08'
  },
  {
    id: 3,
    title: 'Emergency Document Service',
    applicantName: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+44-20-7946-0958',
    type: 'Emergency',
    status: 'In Progress',
    date: '2024-01-15',
    time: '16:00',
    duration: 30,
    location: 'Emergency Services Desk',
    notes: 'Lost passport replacement',
    priority: 'Urgent',
    createdAt: '2024-01-15'
  }
];

export default function Appointments() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    title: '',
    applicantName: '',
    email: '',
    phone: '',
    type: 'Visa Interview',
    status: 'Scheduled',
    date: '',
    time: '',
    duration: 60,
    location: '',
    notes: '',
    priority: 'Medium'
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status.toLowerCase().replace(' ', '').includes(statusFilter);
    const matchesType = typeFilter === 'all' || appointment.type.toLowerCase().replace(' ', '').includes(typeFilter);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddAppointment = async () => {
    if (!newAppointment.applicantName || !newAppointment.email || !newAppointment.date || !newAppointment.time) {
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
      
      const appointment: Appointment = {
        id: Math.max(...appointments.map(a => a.id)) + 1,
        title: newAppointment.title || `${newAppointment.type} - ${newAppointment.applicantName}`,
        applicantName: newAppointment.applicantName!,
        email: newAppointment.email!,
        phone: newAppointment.phone || '',
        type: newAppointment.type as Appointment['type'] || 'Visa Interview',
        status: 'Scheduled',
        date: newAppointment.date!,
        time: newAppointment.time!,
        duration: newAppointment.duration || 60,
        location: newAppointment.location || 'Main Office',
        notes: newAppointment.notes || '',
        priority: newAppointment.priority as Appointment['priority'] || 'Medium',
        createdAt: new Date().toISOString().split('T')[0]
      };

      setAppointments([...appointments, appointment]);
      setNewAppointment({
        title: '',
        applicantName: '',
        email: '',
        phone: '',
        type: 'Visa Interview',
        status: 'Scheduled',
        date: '',
        time: '',
        duration: 60,
        location: '',
        notes: '',
        priority: 'Medium'
      });
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (id: number, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    toast({
      title: "Success",
      description: `Appointment status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Confirmed': return 'bg-guinea-green/10 text-guinea-green border-guinea-green/20';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-guinea-red/10 text-guinea-red border-guinea-red/20';
      case 'No Show': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Visa Interview': return 'bg-embassy-navy/10 text-embassy-navy';
      case 'Document Review': return 'bg-purple-100 text-purple-800';
      case 'Business Meeting': return 'bg-blue-100 text-blue-800';
      case 'Consular Service': return 'bg-green-100 text-green-800';
      case 'Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Appointments & Schedules</h1>
            <p className="text-muted-foreground mt-2">Manage embassy appointments and meetings</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-embassy-navy hover:bg-embassy-navy/90">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Create a new appointment or meeting
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicantName">Applicant Name *</Label>
                    <Input
                      id="applicantName"
                      value={newAppointment.applicantName || ''}
                      onChange={(e) => setNewAppointment({...newAppointment, applicantName: e.target.value})}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newAppointment.email || ''}
                      onChange={(e) => setNewAppointment({...newAppointment, email: e.target.value})}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newAppointment.phone || ''}
                      onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Appointment Type</Label>
                    <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({...newAppointment, type: value as Appointment['type']})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Visa Interview">Visa Interview</SelectItem>
                        <SelectItem value="Document Review">Document Review</SelectItem>
                        <SelectItem value="Business Meeting">Business Meeting</SelectItem>
                        <SelectItem value="Consular Service">Consular Service</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newAppointment.date || ''}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time || ''}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select value={newAppointment.duration?.toString()} onValueChange={(value) => setNewAppointment({...newAppointment, duration: parseInt(value)})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newAppointment.location || ''}
                      onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                      placeholder="e.g., Interview Room 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newAppointment.priority} onValueChange={(value) => setNewAppointment({...newAppointment, priority: value as Appointment['priority']})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes || ''}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    placeholder="Additional notes or requirements"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAppointment} disabled={isLoading}>
                  {isLoading ? 'Scheduling...' : 'Schedule Appointment'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search & Filter Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or title..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="visainterview">Visa Interview</SelectItem>
                  <SelectItem value="documentreview">Document Review</SelectItem>
                  <SelectItem value="businessmeeting">Business Meeting</SelectItem>
                  <SelectItem value="consularservice">Consular Service</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Appointments</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-embassy-navy" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Confirmation</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.status === 'Scheduled').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Urgent Appointments</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(apt => apt.priority === 'Urgent').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-foreground">{appointments.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-guinea-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Appointments ({filteredAppointments.length})
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Type & Title</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{appointment.applicantName}</div>
                          <div className="flex items-center text-sm text-muted-foreground space-x-2">
                            <Mail className="h-3 w-3" />
                            <span>{appointment.email}</span>
                          </div>
                          {appointment.phone && (
                            <div className="flex items-center text-sm text-muted-foreground space-x-2">
                              <Phone className="h-3 w-3" />
                              <span>{appointment.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Badge className={getTypeColor(appointment.type)}>
                          {appointment.type}
                        </Badge>
                        <div className="font-medium mt-1">{appointment.title}</div>
                        {appointment.notes && (
                          <div className="text-sm text-muted-foreground mt-1 truncate max-w-xs">
                            {appointment.notes}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{appointment.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {appointment.time} ({appointment.duration}min)
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(appointment.priority)}>
                        {appointment.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover border border-border shadow-lg" align="end">
                          <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Confirmed')}>
                            <Check className="h-4 w-4 mr-2" />
                            Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'In Progress')}>
                            <Clock className="h-4 w-4 mr-2" />
                            Start
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Completed')}>
                            <Check className="h-4 w-4 mr-2" />
                            Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'Cancelled')}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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