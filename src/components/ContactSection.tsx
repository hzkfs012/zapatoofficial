
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill out all fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call for demo
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-light-gray-1">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          <div className="lg:w-2/5">
            <h2 className="section-heading">Send Us A Message</h2>
            <p className="text-gray-600 mb-6">
              Have questions or want to learn more? Drop us a line, and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="lg:w-3/5 w-full">
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-md">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field"
                    placeholder="How can we help?"
                    rows={5}
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
