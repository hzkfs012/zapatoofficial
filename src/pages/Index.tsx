
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import BookingForm from '../components/BookingForm';
import Gallery from '../components/Gallery';
// import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <BookingForm />
      <Gallery />
      {/* <Testimonials /> */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
