
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc, icon }) => {
  return (
    <div className="service-card group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 bg-electric-green p-2 rounded-lg">
          <img src={icon} alt={`${title} icon`} className="w-6 h-6" />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: "Sneaker Laundry",
      description: "Complete cleaning service for all types of sneakers, including delicate materials.",
      imageSrc: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?q=80&w=2026",
      icon: "/icons/washing-machine.svg"
    },
    {
      title: "Deep Cleaning",
      description: "Intensive cleaning for heavily soiled or stained sneakers, restoring them to near-new condition.",
      imageSrc: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=2020",
      icon: "/icons/brush.svg"
    },
    {
      title: "Polishing & Shining",
      description: "Restore the shine and luster of your leather sneakers with our professional polishing.",
      imageSrc: "https://images.unsplash.com/photo-1519810755548-39cd217da494?q=80&w=2034",
      icon: "/icons/polish.svg"
    },
    {
      title: "Water/Stain Repellent",
      description: "Protect your sneakers from water damage, stains, and dirt with our premium coating.",
      imageSrc: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915",
      icon: "/icons/shield.svg"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-heading">Our Premium Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a complete range of services to keep your sneakers looking fresh, 
            clean, and protected from the elements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
