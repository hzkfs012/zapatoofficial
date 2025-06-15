
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";

const fetchGalleryItems = async () => {
    const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching gallery items', error);
        throw new Error(error.message);
    }
    return data || [];
};

const Gallery: React.FC = () => {
  const [openImage, setOpenImage] = useState<string | null>(null);
  
  const { data: galleryItems, isLoading, error } = useQuery({
    queryKey: ['gallery_items_public'],
    queryFn: fetchGalleryItems,
  });

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-heading">Before & After Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See the transformation of sneakers that have gone through our premium cleaning services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading && Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {error && <p className="text-red-500 col-span-full text-center">Failed to load gallery.</p>}
          {!isLoading && !error && galleryItems?.map((item) => (
            <div key={item.id} className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-navy mb-3">{item.title}</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Before</p>
                    <div 
                      className="h-48 bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative group"
                      onClick={() => setOpenImage(item.before_image_url)}
                    >
                      <img 
                        src={item.before_image_url} 
                        alt={`${item.title} before cleaning`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-navy px-3 py-1 rounded-full text-sm font-medium">View</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">After</p>
                    <div 
                      className="h-48 bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative group"
                      onClick={() => setOpenImage(item.after_image_url)}
                    >
                      <img 
                        src={item.after_image_url} 
                        alt={`${item.title} after cleaning`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-navy px-3 py-1 rounded-full text-sm font-medium">View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.instagram.com/zapatolaundry.co" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Follow Us On Instagram
          </a>
        </div>
      </div>
      
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden">
          {openImage && (
            <div className="relative">
              <img 
                src={openImage} 
                alt="Gallery preview" 
                className="w-full h-auto object-contain max-h-[80vh]"
              />
              <button 
                onClick={() => setOpenImage(null)}
                className="absolute top-4 right-4 bg-white/80 text-navy p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
