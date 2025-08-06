import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, Building, Calendar } from 'lucide-react';
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
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'Active' | 'Inactive';
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Smith',
    position: 'Consular Officer',
    department: 'Consular Services',
    email: 'john.smith@embassy.gov',
    phone: '+240 222 123 456',
    hireDate: '2022-01-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Doe',
    position: 'Administrative Assistant',
    department: 'Administration',
    email: 'jane.doe@embassy.gov',
    phone: '+240 222 123 457',
    hireDate: '2021-06-10',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Peter Jones',
    position: 'Visa Specialist',
    department: 'Visa Services',
    email: 'peter.jones@embassy.gov',
    phone: '+240 222 123 458',
    hireDate: '2023-03-20',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Maria Garcia',
    position: 'Security Officer',
    department: 'Security',
    email: 'maria.garcia@embassy.gov',
    phone: '+240 222 123 459',
    hireDate: '2020-11-05',
    status: 'Inactive'
  }
];

export default function Employees() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.department || !newEmployee.email) {
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
      
      const employee: Employee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        name: newEmployee.name!,
        position: newEmployee.position!,
        department: newEmployee.department!,
        email: newEmployee.email!,
        phone: newEmployee.phone || '',
        hireDate: new Date().toISOString().split('T')[0],
        status: newEmployee.status as 'Active' | 'Inactive' || 'Active'
      };

      setEmployees([...employees, employee]);
      setNewEmployee({
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        status: 'Active'
      });
      setIsAddDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Employee added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-guinea-green/10 text-guinea-green border-guinea-green/20'
      : 'bg-guinea-red/10 text-guinea-red border-guinea-red/20';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('employees')}</h1>
            <p className="text-muted-foreground mt-2">{t('employeeManagement')}</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-embassy-navy hover:bg-embassy-navy/90">
                <Plus className="h-4 w-4 mr-2" />
                {t('addEmployee')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t('addEmployee')}</DialogTitle>
                <DialogDescription>
                  Add a new employee to the embassy staff
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')} *</Label>
                  <Input
                    id="name"
                    value={newEmployee.name || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">{t('position')} *</Label>
                  <Input
                    id="position"
                    value={newEmployee.position || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    placeholder="Enter position"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">{t('department')} *</Label>
                  <Select value={newEmployee.department || ''} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consular Services">Consular Services</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                      <SelectItem value="Visa Services">Visa Services</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEmployee.email || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    value={newEmployee.phone || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button onClick={handleAddEmployee} disabled={isLoading}>
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
              Search Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, position, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {t('employeeList')} ({filteredEmployees.length})
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-green rounded-full mr-2"></div>
                  Active: {employees.filter(e => e.status === 'Active').length}
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-guinea-red rounded-full mr-2"></div>
                  Inactive: {employees.filter(e => e.status === 'Inactive').length}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('employeeId')}</TableHead>
                  <TableHead>{t('name')}</TableHead>
                  <TableHead>{t('position')}</TableHead>
                  <TableHead>{t('department')}</TableHead>
                  <TableHead>{t('email')}</TableHead>
                  <TableHead>{t('hireDate')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">EMP-{employee.id.toString().padStart(3, '0')}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.phone}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        {employee.department}
                      </div>
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {employee.hireDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
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
                          onClick={() => handleDeleteEmployee(employee.id)}
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