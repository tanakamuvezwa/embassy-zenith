import React from 'react';

const Employees: React.FC = () => {
  // Sample employee data
  const [employees, setEmployees] = React.useState([
    { id: 1, name: 'John Smith', position: 'Consular Officer' },
    { id: 2, name: 'Jane Doe', position: 'Administrative Assistant' },
    { id: 3, name: 'Peter Jones', position: 'Visa Specialist' },
  ]);

  // Basic functions for adding and deleting (placeholders)
  const addEmployee = () => {
    alert('Add Employee functionality will be implemented here.');
    // In a real application, you would open a modal or navigate to a form
  };

  const deleteEmployee = (id: number) => {
    alert(`Delete Employee with ID ${id} functionality will be implemented here.`);
    // In a real application, you would confirm deletion and update the state/backend
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Employees</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={addEmployee}
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
        >
          Add Employee
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold text-foreground mb-3">Employee List</h2>
        <ul>
          {employees.map(employee => (
            <li key={employee.id} className="border-b border-secondary last:border-b-0 py-2 flex justify-between items-center">
              <div>
                <span className="font-medium text-foreground">ID:</span> {employee.id}, <span className="font-medium text-foreground">Name:</span> {employee.name}, <span className="font-medium text-foreground">Position:</span> {employee.position}
              </div>
              <button onClick={() => deleteEmployee(employee.id)} className="text-destructive hover:text-destructive/80 text-sm">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Employees;