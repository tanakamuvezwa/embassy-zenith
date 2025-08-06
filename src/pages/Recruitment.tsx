import React from 'react';
import { Button } from "@/components/ui/button";

interface Candidate {
  id: number;
  name: string;
  status: 'Waiting' | 'Potential' | 'Interviewing' | 'Offered' | 'Rejected';
}

const Recruitment: React.FC = () => {
  // Sample data for potential candidates
  const [candidates, setCandidates] = React.useState<Candidate[]>([
    { id: 1, name: 'John Doe', status: 'Potential' },
    { id: 2, name: 'Jane Smith', status: 'Waiting' },
    { id: 3, name: 'Peter Jones', status: 'Potential' },
  ]);

  // Basic function to simulate adding a candidate
  const addCandidate = () => {
    const newCandidate: Candidate = {
      id: candidates.length + 1,
      name: `New Candidate ${candidates.length + 1}`,
      status: 'Waiting',
    };
    setCandidates([...candidates, newCandidate]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Recruitment</h1>
      <Button onClick={addCandidate} className="bg-primary text-primary-foreground hover:bg-primary/90 mb-4">Add Candidate</Button>
      <ul className="bg-white shadow rounded-lg p-4">
        {candidates.map(candidate => (
          <li key={candidate.id} className="border-b border-gray-200 py-2 last:border-b-0 text-foreground">{candidate.name} - <span className={`font-medium ${candidate.status === 'Potential' ? 'text-embassy-blue' : 'text-embassy-neutral'}`}>{candidate.status}</span></li>
        ))}
      </ul>
    </div>
  );
};

export default Recruitment;