import React from 'react';
import { Button } from '@/components/ui/button';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
}

const Contacts: React.FC = () => {
  const sampleContacts: Contact[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', category: 'Business' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', category: 'Student' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', phone: '555-123-4567', category: 'Tourist' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Contacts</h1>
      <div className="flex justify-end mb-4">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mr-2">Add Contact</Button>
        <Button variant="destructive">Delete Contact</Button>
      </div>
      <div className="bg-card text-card-foreground rounded-lg shadow-md p-4">
        <ul>
          {sampleContacts.map((contact) => (
            <li key={contact.id} className="border-b border-border py-2 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.email} | {contact.phone} | {contact.category}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;