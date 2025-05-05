
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-navy"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070')] bg-cover bg-center"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white space-y-6 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              We Bring <span className="text-electric-green">Sneakers</span> Back to Life
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md animate-slide-up" style={{animationDelay: '0.1s'}}>
              Premium sneaker care services for sneakerheads who want their kicks to always look fresh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Link 
                to="booking" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className="btn-primary flex items-center justify-center gap-2 group"
              >
                Book Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="services" 
                spy={true} 
                smooth={true} 
                offset={-70} 
                duration={500}
                className="btn-secondary flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main sneaker image */}
              <img 
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974" 
                alt="Premium sneaker cleaning" 
                className="w-full max-w-md rounded-2xl shadow-2xl animate-float"
              />
              {/* Floating accent element */}
              <div className="absolute -bottom-5 -left-5 bg-electric-green p-4 rounded-xl shadow-lg animate-pulse-light">
                <p className="text-navy font-bold">Premium Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
