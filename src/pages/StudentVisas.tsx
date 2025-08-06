import React from 'react';
import { useState } from 'react';

// Define a type for the sample data
type StudentVisaApplication = {
  id: number;
  applicantName: string;
  visaType: 'Student';
  status: 'Pending' | 'Approved' | 'Rejected';
  submissionDate: string;
};

// Sample data
const sampleStudentApplications: StudentVisaApplication[] = [
  { id: 1, applicantName: 'Alice Smith', visaType: 'Student', status: 'Approved', submissionDate: '2023-08-15' },
  { id: 2, applicantName: 'Bob Johnson', visaType: 'Student', status: 'Pending', submissionDate: '2023-09-01' },
  { id: 3, applicantName: 'Charlie Brown', visaType: 'Student', status: 'Rejected', submissionDate: '2023-09-10' },
  { id: 4, applicantName: 'Diana Prince', visaType: 'Student', status: 'Approved', submissionDate: '2023-09-12' },
];

const StudentVisaApplications: React.FC = () => {
  const [applications, setApplications] = useState<StudentVisaApplication[]>(sampleStudentApplications);

  return (
    <div className="container mx-auto p-4 text-foreground">
      <h1 className="text-2xl font-bold text-primary mb-4">Student Visa Applications</h1>

      {/* Placeholder for Filtering Options */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-primary">Filter Options:</h2>
        {/* Add your filter inputs and logic here */}
        <p className="text-muted-foreground">Filtering functionality to be implemented.</p>
      </div>

      <div className="bg-card p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-primary mb-2">Applications</h2>
        <ul className="divide-y divide-border">
          {applications.map(app => (
            <li key={app.id} className="py-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-foreground font-medium">{app.applicantName}</p>
                  <p className="text-muted-foreground text-sm">Status: {app.status}</p>
                  <p className="text-muted-foreground text-sm">Submission Date: {app.submissionDate}</p>
                </div>
                {/* Placeholder for actions like View/Edit/Delete */}
                {/* <button className="text-primary hover:underline text-sm">View</button> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentVisaApplications;