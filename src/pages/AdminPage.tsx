
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookingsTable } from '@/components/admin/BookingsTable';
import { DashboardStats } from '@/components/admin/DashboardStats';

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
      <main className="space-y-8">
        <DashboardStats />
        <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">All Bookings</h2>
            <BookingsTable />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
