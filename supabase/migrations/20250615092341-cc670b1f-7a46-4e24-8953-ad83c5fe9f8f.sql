
-- Create a table for gallery items
CREATE TABLE public.gallery_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    title TEXT NOT NULL,
    before_image_url TEXT NOT NULL,
    after_image_url TEXT NOT NULL,
    display_order INTEGER
);

-- Enable RLS
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to gallery items"
ON public.gallery_items
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow authenticated users to manage gallery items
CREATE POLICY "Allow authenticated users to manage gallery items"
ON public.gallery_items
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert existing gallery items from the codebase
INSERT INTO public.gallery_items (title, before_image_url, after_image_url, display_order)
VALUES
    ('Air Jordan 1', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071', 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=2070', 1),
    ('Nike Air Max', 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=2031', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070', 2),
    ('Adidas Superstar', 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965', 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071', 3),
    ('Vans Old Skool', 'https://images.unsplash.com/photo-1536922246289-88c42f957773?q=80&w=2080', 'https://images.unsplash.com/photo-1539298370800-9d8e34968b31?q=80&w=2070', 4);
