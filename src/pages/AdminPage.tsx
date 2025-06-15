
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AdminPage = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="p-4 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user?.email}</p>
        </div>
        <Button onClick={signOut} variant="outline">Logout</Button>
      </header>
      <main>
        <p className="p-4 border-2 border-dashed rounded-lg text-center text-muted-foreground">
          Booking management dashboard and table will be added here soon.
        </p>
      </main>
    </div>
  );
};

export default AdminPage;
