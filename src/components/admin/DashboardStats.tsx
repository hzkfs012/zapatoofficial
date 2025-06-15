
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { subDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { StatBarChart } from './StatBarChart';

const fetchStatsForDateRange = async (dateRange: DateRange) => {
    if (!dateRange.from) {
        return { daily: [], totals: { totalOrders: 0, completedOrders: 0, totalAmount: 0 } };
    }
    const from = format(dateRange.from, 'yyyy-MM-dd');
    const to = dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : from;
    
    const { data, error } = await supabase
        .rpc('get_daily_stats_in_range', { start_date: from, end_date: to });

    if (error) {
        console.error('Error fetching daily stats:', error);
        throw new Error(error.message);
    }
    
    const totals = (data || []).reduce((acc, day) => {
        acc.totalOrders += day.total_orders;
        acc.completedOrders += day.completed_orders;
        acc.totalAmount += day.revenue;
        return acc;
    }, { totalOrders: 0, completedOrders: 0, totalAmount: 0 });

    return { daily: data || [], totals };
};

export const DashboardStats = () => {
    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 29),
        to: new Date(),
    });
    
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard-stats', date],
        queryFn: () => fetchStatsForDateRange(date!),
        enabled: !!date?.from,
    });

    const stats = data?.totals;
    const dailyData = (data?.daily ?? []).map(item => ({
        ...item,
        revenue: item.revenue / 100, // convert from cents
    }));

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold">Dashboard Stats</h2>
                <DateRangePicker date={date} setDate={setDate} />
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
                        <div className="text-2xl font-bold">{isLoading ? '...' : `₹${((stats?.totalAmount ?? 0) / 100).toFixed(2)}`}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <StatBarChart
                    title="Total Orders"
                    description="Daily total orders."
                    data={dailyData}
                    dataKey="total_orders"
                    color="hsl(var(--chart-1))"
                />
                <StatBarChart
                    title="Completed Orders"
                    description="Daily completed orders."
                    data={dailyData}
                    dataKey="completed_orders"
                    color="hsl(var(--chart-2))"
                />
                <StatBarChart
                    title="Revenue"
                    description="Daily revenue."
                    data={dailyData}
                    dataKey="revenue"
                    color="hsl(var(--chart-3))"
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
            </div>
        </div>
    );
};
