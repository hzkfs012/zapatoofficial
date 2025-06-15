
-- Alter booking_requests table to allow multiple services
ALTER TABLE public.booking_requests
ALTER COLUMN service TYPE text[] USING ARRAY[service];

-- Create a function to get daily stats for the dashboard chart
CREATE OR REPLACE FUNCTION get_daily_stats_in_range(start_date text, end_date text)
RETURNS TABLE (
    day text,
    total_orders bigint,
    completed_orders bigint,
    revenue bigint
)
LANGUAGE sql
AS $$
    WITH days AS (
        SELECT generate_series(start_date::date, end_date::date, '1 day'::interval)::date AS day
    ),
    daily_data AS (
        SELECT
            date_trunc('day', created_at)::date AS day,
            count(*) AS total_orders,
            count(*) FILTER (WHERE status = 'completed') AS completed_orders,
            coalesce(sum(payment_amount) FILTER (WHERE status = 'completed' AND payment_status = 'paid'), 0) AS revenue
        FROM booking_requests
        WHERE created_at >= start_date::timestamptz AND created_at < (end_date::timestamptz + '1 day'::interval)
        GROUP BY 1
    )
    SELECT
        to_char(d.day, 'YYYY-MM-DD') AS day,
        coalesce(dd.total_orders, 0) AS total_orders,
        coalesce(dd.completed_orders, 0) AS completed_orders,
        coalesce(dd.revenue, 0) AS revenue
    FROM days d
    LEFT JOIN daily_data dd ON d.day = dd.day
    ORDER BY d.day;
$$;
