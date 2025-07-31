import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface HeroProps {
  onGetQuoteClick: () => void;
}

export default function Hero({ onGetQuoteClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "India Gate",
      subtitle: "Symbol of Love - World Heritage Site",
    },
    {
      url: "https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      title: "Lotus Flower",
      subtitle: "National Monument - Heart of Capital",
    },
    {
      url: "./image/mou.jpg",
      title: "Mountain",
      subtitle: "Mughal Architecture - UNESCO World Heritage",
    },
    {
      url: "./image/q.jpg",
      title: "Qutub Minar Delhi",
      subtitle: "Medieval Islamic Architecture Marvel",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-travel-blue to-indigo-600 py-12 md:py-20 overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-60" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
              loading="eager"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop";
              }}
            />
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-primary/30 to-black/40"></div>
      </div>

      {/* Carousel Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white max-w-5xl mx-auto px-4">
          {/* Dynamic Content Based on Current Slide */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl opacity-90 mb-2 transition-all duration-500">
              {carouselImages[currentSlide].subtitle}
            </h3>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white transition-all duration-500">
              {carouselImages[currentSlide].title}
            </h1>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Explore India with
            <span className="block text-white">Om Tour & Travels</span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 leading-relaxed">
            Your trusted travel partner for over 25 years. Experience
            comfortable, safe, and memorable journeys across every corner of
            India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
            <Button
              onClick={onGetQuoteClick}
              size="lg"
              className="bg-travel-emerald hover:bg-travel-emerald/90 text-white px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold transform transition-all duration-300 hover:scale-105"
              onClick={() => (window.location.href = "tel:+919215615166")}
            >
              Call Now: +91 9215615166
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-105">
              <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-sm opacity-80">
                Licensed drivers and well-maintained vehicles
              </p>
            </div>

            <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-105">
              <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                25+ Years Experience
              </h3>
              <p className="text-sm opacity-80">
                Trusted by thousands of satisfied customers
              </p>
            </div>

            <div className="flex flex-col items-center transform transition-all duration-500 hover:scale-105">
              <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">All India Permit</h3>
              <p className="text-sm opacity-80">
                Travel anywhere across India with ease
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
