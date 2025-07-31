import { Car, Users, MapPin, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesProps {
  onGetQuoteClick: () => void;
}

export default function Services({ onGetQuoteClick }: ServicesProps) {
  const vehicles = [
    {
      name: "Tempo Travellers",
      desc: "Perfect for group travel with AC/Non-AC options",
      capacity: "9-26 Seater",
      icon: "🚐",
      image:
        "https://images.pexels.com/photos/17455629/pexels-photo-17455629.jpeg",
      features: [
        "Air Conditioning",
        "Comfortable Seating",
        "GPS Tracking",
        "Entertainment System",
      ],
    },
    {
      name: "Toyota Innova",
      desc: "Most popular luxury SUV for family travel",
      capacity: "6+1 Seater",
      icon: "🚗",
      image:
        "https://images.pexels.com/photos/17507722/pexels-photo-17507722.jpeg",
      features: [
        "Premium Interiors",
        "Captain Seats",
        "Fuel Efficient",
        "Climate Control",
      ],
    },
    {
      name: "Mahindra Scorpio",
      desc: "Robust SUV ideal for rough terrains",
      capacity: "7+1 Seater",
      icon: "🚙",
      image:
        "https://images.pexels.com/photos/29057959/pexels-photo-29057959.jpeg",
      features: [
        "4WD Capability",
        "High Ground Clearance",
        "Powerful Engine",
        "Adventure Ready",
      ],
    },
    {
      name: "Maruti Ertiga",
      desc: "Spacious and economical for family trips",
      capacity: "6+1 Seater",
      icon: "🚐",
      image: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg",
      features: [
        "Fuel Efficient",
        "Spacious Interior",
        "Boot Space",
        "Comfortable Ride",
      ],
    },
    {
      name: "Maruti Dzire",
      desc: "Compact sedan for city and highway travel",
      capacity: "4+1 Seater",
      icon: "🚗",
      image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
      features: ["AC", "Music System", "GPS", "Excellent Mileage"],
    },
    {
      name: "Hyundai Verna",
      desc: "Premium sedan with luxury features",
      capacity: "4+1 Seater",
      icon: "🚗",
      image:
        "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      features: [
        "Premium Interior",
        "Sunroof",
        "Touchscreen",
        "Safety Features",
      ],
    },
    {
      name: "Mini Bus 17 Seater",
      desc: "Perfect for medium groups and corporate trips",
      capacity: "17+1 Seater",
      icon: "🚌",
      image:
        "https://images.pexels.com/photos/7276715/pexels-photo-7276715.jpeg",
      features: ["AC", "Reclining Seats", "Music System", "Luggage Space"],
    },
    {
      name: "Mini Bus 25 Seater",
      desc: "Ideal for large groups and events",
      capacity: "25+1 Seater",
      icon: "🚌",
      image:
        "https://images.pexels.com/photos/13474281/pexels-photo-13474281.jpeg",
      features: ["AC", "Comfortable Seats", "Entertainment", "Ice Box"],
    },
    {
      name: "Mini Bus 32 Seater",
      desc: "Best for wedding parties and large groups",
      capacity: "32+1 Seater",
      icon: "🚌",
      image:
        "https://images.pexels.com/photos/6946135/pexels-photo-6946135.jpeg",
      features: ["AC", "Premium Seats", "Music System", "Large Luggage"],
    },
  ];

  const popularRoutes = [
    {
      name: "Salasar Balaji",
      distance: "~180 km",
      duration: "3-4 hours",
      image:
        "https://images.pexels.com/photos/2944561/pexels-photo-2944561.jpeg",
      description: "Famous temple of Hanuman Ji in Rajasthan",
    },
    {
      name: "Khatu Shyam Ji",
      distance: "~200 km",
      duration: "4-5 hours",
      image:
        "https://images.pexels.com/photos/2944561/pexels-photo-2944561.jpeg",
      description: "Sacred temple dedicated to Lord Krishna",
    },
    {
      name: "Haridwar",
      distance: "~220 km",
      duration: "5-6 hours",
      image:
        "https://images.pexels.com/photos/32111279/pexels-photo-32111279.jpeg",
      description: "Holy city with Ganga Aarti at Har Ki Pauri",
    },
    {
      name: "Mussoorie",
      distance: "~270 km",
      duration: "6-7 hours",
      image:
        "https://images.pexels.com/photos/27178287/pexels-photo-27178287.png",
      description: "Queen of Hills - Beautiful hill station",
    },
    {
      name: "Ajmer Sharif",
      distance: "~300 km",
      duration: "6-7 hours",
      image:
        "https://images.pexels.com/photos/30475497/pexels-photo-30475497.jpeg",
      description: "Famous Sufi shrine and dargah",
    },
    {
      name: "Jaipur",
      distance: "~190 km",
      duration: "4-5 hours",
      image:
        "https://images.pexels.com/photos/28801422/pexels-photo-28801422.jpeg",
      description: "Pink City - Hawa Mahal, City Palace, Amber Fort",
    },
    {
      name: "Jodhpur",
      distance: "~450 km",
      duration: "8-9 hours",
      image: "https://images.pexels.com/photos/797824/pexels-photo-797824.jpeg",
      description: "Blue City - Mehrangarh Fort, Umaid Bhawan",
    },
    {
      name: "Custom Routes",
      distance: "Pan India",
      duration: "As per need",
      image: "https://images.pexels.com/photos/797824/pexels-photo-797824.jpeg",
      description: "Any destination across India",
    },
  ];

  const serviceFeatures = [
    {
      icon: Shield,
      title: "100% Safe",
      desc: "Licensed drivers & insured vehicles",
    },
    {
      icon: Clock,
      title: "24/7 Service",
      desc: "Round-the-clock customer support",
    },
    {
      icon: Star,
      title: "25+ Years",
      desc: "Trusted experience in travel industry",
    },
    {
      icon: Users,
      title: "Expert Drivers",
      desc: "Professional & courteous staff",
    },
  ];

  return (
    <section id="services" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-travel-navy mb-4 md:mb-6">
            All India Permit – We Cover Every Corner
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 md:mb-8"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            With our All India Permit vehicles, explore any destination across
            the country. From pilgrimage tours to family vacations, we have the
            perfect vehicle for your journey.
          </p>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
          {serviceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-primary/10 p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-travel-navy mb-1 md:mb-2 text-sm md:text-base">
                  {feature.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Vehicle Types */}
        {/* Premium Fleet section removed as requested */}

        {/* Popular Routes */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-travel-navy mb-8 md:mb-12">
            Popular Destinations
          </h3>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {popularRoutes.map((route, index) => (
                <div
                  key={index}
                  className="group border border-gray-200 rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg"
                >
                  {/* Route Image */}
                  <div className="relative h-32 md:h-40 overflow-hidden">
                    <img
                      src={route.image}
                      alt={route.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="font-bold text-white text-sm md:text-base group-hover:text-travel-purple transition-colors">
                        {route.name}
                      </h4>
                    </div>
                  </div>

                  {/* Route Details */}
                  <div className="p-3 md:p-4">
                    <p className="text-xs md:text-sm text-gray-600 mb-2">
                      {route.description}
                    </p>
                    <div className="space-y-1 text-xs md:text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span className="font-medium">{route.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-medium">{route.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available:</span>
                        <button
                          onClick={onGetQuoteClick}
                          className="font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                        >
                          Contact for Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8 text-center">
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Don't see your destination? No problem! We provide custom routes
                to anywhere in India with competitive pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={onGetQuoteClick}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-3"
                >
                  Get Custom Quote
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white px-6 md:px-8 py-3"
                  onClick={() => (window.location.href = "tel:+919215615166")}
                >
                  Call for Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
