import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

const BookingForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('drop-off');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !phone || !service || !date || !time) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Format the date and time info for the message
      const formattedDate = date ? format(date, 'PPP') : '';
      const message = `Booking for ${service} on ${formattedDate} at ${time}. Delivery method: ${deliveryMethod}.`;
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('booking_requests')
        .insert([
          { 
            name, 
            email, 
            phone, 
            service,
            message
          }
        ]);
        
      if (error) {
        console.error("Error submitting booking:", error);
        toast.error("Failed to submit booking. Please try again.");
        return;
      }
      
      toast.success("Booking request submitted! We'll confirm shortly.");
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setDate(undefined);
      setTime('');
      setDeliveryMethod('drop-off');
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  return (
    <section id="booking" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="lg:w-2/5">
            <h2 className="section-heading">Book Your Service</h2>
            <p className="text-gray-600 mb-6">
              Schedule a sneaker service appointment with our experts. Choose your preferred 
              date, time, and delivery method.
            </p>
            
            <div className="bg-navy text-white p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-1 bg-electric-green rounded-full flex-shrink-0"></div>
                  <p>Professional care for all sneaker types</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-1 bg-electric-green rounded-full flex-shrink-0"></div>
                  <p>Premium cleaning products and techniques</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-1 bg-electric-green rounded-full flex-shrink-0"></div>
                  <p>Quick turnaround times</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-1 bg-electric-green rounded-full flex-shrink-0"></div>
                  <p>Satisfaction guaranteed</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type*
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="input-field"
                    required
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="sneaker-laundry">Sneaker Laundry</option>
                    <option value="deep-cleaning">Deep Cleaning</option>
                    <option value="polishing">Polishing & Shining</option>
                    <option value="repellent">Water/Stain Repellent</option>
                  </select>
                </div>
                
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date*
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={cn("w-auto p-0", isMobile ? "w-[280px]" : "")} align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time*
                  </label>
                  <div className="relative">
                    <select
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="input-field pl-10"
                      required
                    >
                      <option value="" disabled>Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Method*
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div 
                      className={`flex-1 border rounded-lg p-3 md:p-4 cursor-pointer transition-all ${
                        deliveryMethod === 'drop-off' 
                          ? 'border-electric-green bg-electric-green/10' 
                          : 'border-gray-300 hover:border-electric-green/50'
                      }`}
                      onClick={() => setDeliveryMethod('drop-off')}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          deliveryMethod === 'drop-off' ? 'border-electric-green' : 'border-gray-400'
                        }`}>
                          {deliveryMethod === 'drop-off' && <div className="w-2 h-2 bg-electric-green rounded-full"></div>}
                        </div>
                        <span className="font-medium">Drop-off</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Bring your sneakers to our store
                      </p>
                    </div>
                    
                    <div 
                      className={`flex-1 border rounded-lg p-3 md:p-4 cursor-pointer transition-all ${
                        deliveryMethod === 'pick-up' 
                          ? 'border-electric-green bg-electric-green/10' 
                          : 'border-gray-300 hover:border-electric-green/50'
                      }`}
                      onClick={() => setDeliveryMethod('pick-up')}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          deliveryMethod === 'pick-up' ? 'border-electric-green' : 'border-gray-400'
                        }`}>
                          {deliveryMethod === 'pick-up' && <div className="w-2 h-2 bg-electric-green rounded-full"></div>}
                        </div>
                        <span className="font-medium">Pick-up</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        We'll pick up your sneakers (additional fee)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8">
                <button 
                  type="submit" 
                  className="w-full btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
