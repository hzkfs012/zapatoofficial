
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EditGalleryItemForm } from './EditGalleryItemForm';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

type GalleryItem = Database['public']['Tables']['gallery_items']['Row'];

const fetchGalleryItems = async () => {
    const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
};

export const GalleryManager = () => {
    const queryClient = useQueryClient();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['gallery_items'],
        queryFn: fetchGalleryItems,
    });
    
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('gallery_items').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery_items'] });
            queryClient.invalidateQueries({ queryKey: ['gallery_items_public'] });
            toast.success('Gallery item deleted successfully!');
        },
        onError: (error) => {
            toast.error(`Error deleting item: ${error.message}`);
        }
    });

    const handleEdit = (item: GalleryItem) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    };
    
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteMutation.mutate(id);
        }
    }

    if (isLoading) return <div>Loading gallery items...</div>;
    if (error) return <div>Error loading gallery items: {(error as Error).message}</div>;

    const galleryItems = data ?? [];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Gallery Manager</h2>
                 <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAdd}>Add Item</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedItem ? 'Edit' : 'Add'} Gallery Item</DialogTitle>
                        </DialogHeader>
                        <EditGalleryItemForm 
                            item={selectedItem}
                            onSuccess={() => setIsFormOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Preview</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {galleryItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <img src={item.before_image_url} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                                        <img src={item.after_image_url} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                                    </div>
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
