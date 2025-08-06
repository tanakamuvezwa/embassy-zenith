import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const InCountryCheck: React.FC = () => {
  // Sample data structure for individuals
  const individuals = [
    { id: 'ID001', name: 'John Doe', nationality: 'Guinean', location: 'Ankara, Turkey', status: 'Active' },
    { id: 'ID002', name: 'Jane Smith', nationality: 'Turkish', location: 'Malabo, Guinea', status: 'Inactive' },
    { id: 'ID003', name: 'Peter Jones', nationality: 'Guinean', location: 'Istanbul, Turkey', status: 'Active' },
    { id: 'ID004', name: 'Fatima Diallo', nationality: 'Guinean', location: 'Conakry, Guinea', status: 'Inactive' },
  ];

  // State for filtering (basic placeholder)
  const [filter, setFilter] = React.useState('');

  // Filtered individuals based on the filter state (basic filtering by name or ID)
  const filteredIndividuals = individuals.filter(individual =>
    individual.name.toLowerCase().includes(filter.toLowerCase()) ||
    individual.id.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">In Country Check by ID</h1>

      {/* Filtering Placeholder */}
      <div className="mb-6">
        <Label htmlFor="filter" className="text-foreground">Filter by Name or ID:</Label>
        <Input
          id="filter"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      {/* Display Individuals */}
      <div className="bg-card p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-primary mb-4">Individuals</h2>
        {filteredIndividuals.length === 0 ? (
          <p className="text-muted-foreground">No individuals found.</p>
        ) : (
          <ul>
            {filteredIndividuals.map(individual => (
              <li key={individual.id} className="border-b border-border py-2 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Placeholder for image/icon */}
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground">
                    {individual.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{individual.name} ({individual.id})</p>
                    <p className="text-muted-foreground text-sm">{individual.nationality} - {individual.location}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${individual.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {individual.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InCountryCheck;