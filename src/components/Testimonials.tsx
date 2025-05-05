
import React from 'react';

interface TestimonialProps {
  name: string;
  image: string;
  text: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, image, text, rating }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-navy">{name}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={i < rating ? "#4CE0B3" : "#E2E8F0"} 
                className="w-4 h-4"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080",
      text: "Absolutely amazed by the service! My Jordan 1s looked completely worn out, and now they look brand new. Highly recommend!",
      rating: 5
    },
    {
      name: "Taylor Smith",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187",
      text: "The water-repellent coating has been a game changer for my white sneakers. No more worrying about stains!",
      rating: 5
    },
    {
      name: "Jordan Lee",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187",
      text: "Fast service and professional cleaning. My Air Force 1s were yellowing, but they managed to restore them perfectly.",
      rating: 4
    },
    {
      name: "Morgan Chen",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2188",
      text: "The team at Zapato Laundaria went above and beyond. They even repaired a small tear in my sneakers that I hadn't noticed!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-heading">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from sneakerheads who've experienced our services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              image={testimonial.image}
              text={testimonial.text}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
