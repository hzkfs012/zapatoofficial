import React from 'react';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-navy text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-white/80 mb-8 max-w-md">
              Have questions about our services? Want to know more about how we can help refresh your sneakers? 
              Reach out to us through any of these channels.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-electric-green p-3 rounded-full text-navy">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <p className="text-white/80">
                    <a href="tel:6235003079" className="hover:text-electric-green transition-colors">
                      (623) 500-3079
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-electric-green p-3 rounded-full text-navy">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-white/80">
                    <a href="mailto:support@zapatolaundry.com" className="hover:text-electric-green transition-colors">
                      support@zapatolaundry.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-electric-green p-3 rounded-full text-navy">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Instagram</h3>
                  <p className="text-white/80">
                    <a 
                      href="https://www.instagram.com/zapatolaundry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-electric-green transition-colors"
                    >
                      @zapatolaundry
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-electric-green p-3 rounded-full text-navy">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-white/80">
                    123 Sneaker Street<br />
                    Phoenix, AZ 85001<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-electric-green p-3 rounded-full text-navy">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Website</h3>
                  <p className="text-white/80">
                    <a 
                      href="https://zapatolaundry.co" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-electric-green transition-colors"
                    >
                      zapatolaundry.co
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <a 
                href="https://wa.me/6235003079" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="white">
                  <path d="M16.008 0h-.016C7.174 0 .008 7.176.008 16c0 3.5 1.128 6.744 3.04 9.376l-1.968 5.992 6.176-1.976C9.932 31.072 12.862 32 16.008 32 24.832 32 32 24.832 32 16s-7.168-16-15.992-16zm9.344 22.616c-.4 1.12-2.24 2.248-3.672 2.544-1.16.176-2.664.316-7.76-1.664-6.528-2.536-10.704-8.784-11.028-9.188-.32-.4-2.696-3.576-2.696-6.824s1.696-4.84 2.288-5.504c.488-.536 1.296-.8 2.064-.8.248 0 .48.016.68.032.6.016 1.128.056 1.616 1.256.616 1.496 1.632 3.96 1.776 4.256.144.296.296.704.088 1.104-.2.416-.304.6-.6.936-.304.352-.64.784-.912 1.056-.304.296-.624.616-.272 1.168.352.552 1.544 2.344 3.336 3.8 2.296 1.856 4.248 2.432 4.848 2.712.4.184.88.144 1.176-.184.376-.408.832-.872 1.304-1.344.336-.328.76-.368 1.208-.224.448.152 2.832 1.344 3.32 1.592.488.248.808.36.928.576.112.208.112 1.2-.28 2.352z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block">
            {/* Right side - could contain a map, contact form, or image in the future */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
