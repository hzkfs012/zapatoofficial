
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Gallery: React.FC = () => {
  const [openImage, setOpenImage] = useState<string | null>(null);
  
  // Gallery images (before and after photos)
  const galleryItems = [
    {
      before: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071",
      after: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=2070",
      title: "Air Jordan 1",
    },
    {
      before: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=2031",
      after: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070",
      title: "Nike Air Max",
    },
    {
      before: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965",
      after: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071",
      title: "Adidas Superstar",
    },
    {
      before: "https://images.unsplash.com/photo-1536922246289-88c42f957773?q=80&w=2080",
      after: "https://images.unsplash.com/photo-1539298370800-9d8e34968b31?q=80&w=2070",
      title: "Vans Old Skool",
    }
  ];
  
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
          {galleryItems.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-navy mb-3">{item.title}</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Before</p>
                    <div 
                      className="h-48 bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative group"
                      onClick={() => setOpenImage(item.before)}
                    >
                      <img 
                        src={item.before} 
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
                      onClick={() => setOpenImage(item.after)}
                    >
                      <img 
                        src={item.after} 
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
            href="https://www.instagram.com/zapatolaundry" 
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
