
-- Create a table to store expenses
CREATE TABLE public.expenses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expense_date DATE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('rent', 'credit', 'miscellaneous')),
    amount INTEGER NOT NULL,
    description TEXT
);

-- Add Row Level Security (RLS) to the expenses table
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to manage expenses
CREATE POLICY "Allow authenticated users to manage expenses" 
ON public.expenses
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Drop the old stats function
DROP FUNCTION IF EXISTS public.get_daily_stats_in_range(text, text);

-- Create a new function to get daily stats including expenses
CREATE OR REPLACE FUNCTION public.get_daily_dashboard_stats(start_date text, end_date text)
 RETURNS TABLE(day text, total_orders bigint, completed_orders bigint, revenue bigint, expenses bigint)
 LANGUAGE sql
AS $function$
    WITH days AS (
        SELECT generate_series(start_date::date, end_date::date, '1 day'::interval)::date AS day
    ),
    daily_bookings AS (
        SELECT
            date_trunc('day', created_at)::date AS day,
            count(*) AS total_orders,
            count(*) FILTER (WHERE status = 'completed') AS completed_orders,
            coalesce(sum(payment_amount) FILTER (WHERE status = 'completed' AND payment_status = 'paid'), 0) AS revenue
        FROM booking_requests
        WHERE created_at >= start_date::timestamptz AND created_at < (end_date::timestamptz + '1 day'::interval)
        GROUP BY 1
    ),
    daily_expenses AS (
        SELECT
            expense_date AS day,
            coalesce(sum(amount), 0) AS expenses
        FROM public.expenses
        WHERE expense_date >= start_date::date AND expense_date <= end_date::date
        GROUP BY 1
    )
    SELECT
        to_char(d.day, 'YYYY-MM-DD') AS day,
        coalesce(db.total_orders, 0) AS total_orders,
        coalesce(db.completed_orders, 0) AS completed_orders,
        coalesce(db.revenue, 0) AS revenue,
        coalesce(de.expenses, 0) AS expenses
    FROM days d
    LEFT JOIN daily_bookings db ON d.day = db.day
    LEFT JOIN daily_expenses de ON d.day = de.day
    ORDER BY d.day;
$function$
