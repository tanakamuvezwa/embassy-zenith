import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample data structure for Business Visa Applications
const businessVisaApplications = [
  { id: 1, applicantName: 'John Doe', visaType: 'Business', status: 'Pending', submissionDate: '2023-10-26' },
  { id: 2, applicantName: 'Jane Smith', visaType: 'Business', status: 'Approved', submissionDate: '2023-10-20' },
  { id: 3, applicantName: 'Peter Jones', visaType: 'Business', status: 'Rejected', submissionDate: '2023-10-15' },
];

const BusinessVisaApplications: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Business Visa Applications</h1>

      {/* Placeholder for Filtering Options */}
      <div className="mb-4 flex space-x-4">
        <Input placeholder="Filter by applicant name..." className="max-w-sm" />
        {/* Add more filter inputs or dropdowns as needed */}
      </div>

      {/* Display Data */}
      <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Applicant Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Visa Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Submission Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {businessVisaApplications.map((application) => (
              <tr key={application.id} className="hover:bg-accent hover:text-accent-foreground">
                <td className="px-6 py-4 whitespace-nowrap">{application.applicantName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{application.visaType}</td>
                <td className="px-6 py-4 whitespace-nowrap">{application.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{application.submissionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessVisaApplications;