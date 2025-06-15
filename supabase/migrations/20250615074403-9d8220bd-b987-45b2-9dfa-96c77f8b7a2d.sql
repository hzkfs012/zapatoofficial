
-- Create ENUM types for status
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.payment_status AS ENUM ('unpaid', 'paid');

-- Add new columns to the booking_requests table
ALTER TABLE public.booking_requests
ADD COLUMN status booking_status NOT NULL DEFAULT 'pending',
ADD COLUMN payment_status payment_status NOT NULL DEFAULT 'unpaid',
ADD COLUMN payment_amount INTEGER, -- in cents
ADD COLUMN payment_method TEXT,
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_booking_requests_update
BEFORE UPDATE ON public.booking_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security on the table
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- This policy keeps your booking form working for all visitors
CREATE POLICY "Allow public insert for booking_requests"
ON public.booking_requests
FOR INSERT
WITH CHECK (true);

-- This policy will allow logged-in users to see bookings.
-- We will restrict this to only admins in a future step.
CREATE POLICY "Allow authenticated users to view bookings"
ON public.booking_requests
FOR SELECT
USING (auth.role() = 'authenticated');

-- This policy will allow logged-in users to update bookings.
-- We will also restrict this to admins later.
CREATE POLICY "Allow authenticated users to update bookings"
ON public.booking_requests
FOR UPDATE
USING (auth.role() = 'authenticated');
