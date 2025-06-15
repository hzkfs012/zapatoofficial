
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EditBookingForm } from './EditBookingForm';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

type Booking = Database['public']['Tables']['booking_requests']['Row'];

const bookingsPerPage = 10;

const fetchBookings = async (page: number) => {
    const from = page * bookingsPerPage;
    const to = from + bookingsPerPage - 1;
    const { data, error, count } = await supabase
        .from('booking_requests')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) throw new Error(error.message);
    return { data, count };
};


export const BookingsTable = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const { data, isLoading, error } = useQuery({
        queryKey: ['bookings', currentPage],
        queryFn: () => fetchBookings(currentPage),
    });

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    if (isLoading) return <div>Loading bookings...</div>;
    if (error) return <div>Error loading bookings: {(error as Error).message}</div>;

    const bookings = data?.data ?? [];
    const totalBookings = data?.count ?? 0;
    const totalPages = Math.ceil(totalBookings / bookingsPerPage);

    const handleEditClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsEditDialogOpen(true);
    };

    return (
        <>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                                <TableCell>
                                    <div className="font-medium">{booking.name}</div>
                                    <div className="text-sm text-muted-foreground">{booking.email}</div>
                                </TableCell>
                                <TableCell>{booking.service}</TableCell>
                                <TableCell><Badge variant="outline">{booking.status}</Badge></TableCell>
                                <TableCell><Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>{booking.payment_status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    {booking.payment_amount 
                                    ? `$${(booking.payment_amount / 100).toFixed(2)}`
                                    : 'N/A'}
                                </TableCell>
                                <TableCell>{new Date(booking.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleEditClick(booking)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
             <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(old => Math.max(old - 1, 0))}
                    disabled={currentPage === 0}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(old => (old + 1 < totalPages ? old + 1 : old))}
                    disabled={currentPage + 1 >= totalPages}
                >
                    Next
                </Button>
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Booking</DialogTitle>
                    </DialogHeader>
                    {selectedBooking && (
                        <EditBookingForm 
                            booking={selectedBooking} 
                            onSuccess={() => {
                                setIsEditDialogOpen(false);
                                toast.success('Booking updated successfully!');
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
