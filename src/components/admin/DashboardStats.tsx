
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { format, startOfDay, endOfDay } from 'date-fns';

const fetchStatsForDate = async (date: Date) => {
    const startDate = startOfDay(date).toISOString();
    const endDate = endOfDay(date).toISOString();

    const { data, error, count } = await supabase
        .from('booking_requests')
        .select('*', { count: 'exact' })
        .gte('created_at', startDate)
        .lte('created_at', endDate);

    if (error) throw new Error(error.message);
    
    const completedOrders = data.filter(d => d.status === 'completed').length;
    const totalAmount = data.reduce((sum, order) => {
        if (order.status === 'completed' && order.payment_amount) {
            return sum + order.payment_amount;
        }
        return sum;
    }, 0);

    return {
        totalOrders: count ?? 0,
        completedOrders,
        totalAmount,
    };
};


export const DashboardStats = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    const { data: stats, isLoading } = useQuery({
        queryKey: ['dashboard-stats', date ? format(date, 'yyyy-MM-dd') : 'today'],
        queryFn: () => fetchStatsForDate(date || new Date()),
        enabled: !!date,
    });

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold">Daily Stats</h2>
                <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? '...' : stats?.totalOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? '...' : stats?.completedOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{isLoading ? '...' : `$${((stats?.totalAmount ?? 0) / 100).toFixed(2)}`}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
