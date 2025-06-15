
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Database } from '@/integrations/supabase/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type GalleryItem = Database['public']['Tables']['gallery_items']['Row'];

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  before_image_url: z.string().url('Must be a valid URL'),
  after_image_url: z.string().url('Must be a valid URL'),
});

interface EditGalleryItemFormProps {
  item?: GalleryItem | null;
  onSuccess: () => void;
}

export const EditGalleryItemForm: React.FC<EditGalleryItemFormProps> = ({ item, onSuccess }) => {
  const queryClient = useQueryClient();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item?.title ?? '',
      before_image_url: item?.before_image_url ?? '',
      after_image_url: item?.after_image_url ?? '',
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      if (item) {
        // Update existing item
        const { data, error } = await supabase
          .from('gallery_items')
          .update(values)
          .eq('id', item.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new item
        const { data, error } = await supabase
          .from('gallery_items')
          .insert(values)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery_items'] });
      queryClient.invalidateQueries({ queryKey: ['gallery_items_public'] });
      toast.success(item ? 'Gallery item updated!' : 'Gallery item added!');
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Air Jordan 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="before_image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Before Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/before.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="after_image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>After Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/after.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
};
