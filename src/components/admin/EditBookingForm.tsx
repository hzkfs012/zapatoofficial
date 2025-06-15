
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database, Constants } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type Booking = Database['public']['Tables']['booking_requests']['Row'];
type BookingUpdate = Database['public']['Tables']['booking_requests']['Update'];

const formSchema = z.object({
  status: z.enum(Constants.public.Enums.booking_status),
  payment_status: z.enum(Constants.public.Enums.payment_status),
  payment_amount: z.coerce.number().positive().optional().nullable(),
  payment_method: z.string().optional().nullable(),
});

interface EditBookingFormProps {
    booking: Booking;
    onSuccess: () => void;
}

export const EditBookingForm: React.FC<EditBookingFormProps> = ({ booking, onSuccess }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updatedBooking: BookingUpdate) => {
            const { error } = await supabase
                .from('booking_requests')
                .update(updatedBooking)
                .eq('id', booking.id);

            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
            onSuccess();
        },
        onError: (error) => {
            console.error('Error updating booking:', error);
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: booking.status,
            payment_status: booking.payment_status,
            payment_amount: booking.payment_amount ? booking.payment_amount / 100 : undefined,
            payment_method: booking.payment_method,
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate({ 
            status: values.status,
            payment_status: values.payment_status,
            payment_amount: values.payment_amount ? Math.round(values.payment_amount * 100) : null,
            payment_method: values.payment_method,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Booking Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Constants.public.Enums.booking_status.map(status => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="payment_status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a payment status" /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Constants.public.Enums.payment_status.map(status => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="payment_amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Amount ($)</FormLabel>
                            <FormControl>
                                <Input type="number" step="0.01" placeholder="e.g. 50.00" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? null : parseFloat(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Credit Card" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>
        </Form>
    );
};
