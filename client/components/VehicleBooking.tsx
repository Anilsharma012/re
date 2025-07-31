import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  Users,
  Fuel,
  Shield,
  Star,
  CheckCircle,
  Wifi,
  Snowflake,
  Music,
  Coffee,
  IndianRupee,
} from "lucide-react";
import { Vehicle } from "@shared/api";

interface VehicleBookingProps {
  onGetQuoteClick: () => void;
}

export default function VehicleBooking({
  onGetQuoteClick,
}: VehicleBookingProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const vehicleCategories = [
    { id: "all", name: "All Vehicles", icon: Car },
    { id: "Sedan", name: "Sedan Cars", icon: Car },
    { id: "SUV", name: "SUVs", icon: Car },
    { id: "Tempo Traveller", name: "Tempo Travellers", icon: Users },
    { id: "Bus", name: "Mini Buses", icon: Users },
  ];

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      console.log('Fetching vehicles from MongoDB Atlas...');
      const response = await fetch('/api/vehicles');
      const data = await response.json();
      
      if (data.success && data.vehicles) {
        console.log(`✅ Loaded ${data.vehicles.length} vehicles from MongoDB`);
        setVehicles(data.vehicles);
      } else {
        console.error('❌ No vehicles data received from MongoDB');
        setVehicles([]);
      }
    } catch (error) {
      console.error('❌ Failed to fetch vehicles from MongoDB:', error);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles =
    selectedCategory === "all"
      ? vehicles
      : vehicles.filter((vehicle) => vehicle.type === selectedCategory);

  const getFeatureIcon = (feature: string) => {
    const iconMap: { [key: string]: any } = {
      AC: Snowflake,
      GPS: Shield,
      "Music System": Music,
      Entertainment: Music,
      Bluetooth: Wifi,
      "Ice Box": Coffee,
      "First Aid": Shield,
    };
    return iconMap[feature] || CheckCircle;
  };

  return (
    <section id="vehicles" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-travel-navy mb-6">
            Book Your Perfect Vehicle
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our wide range of well-maintained vehicles. From luxury
            sedans to spacious buses, we have the perfect vehicle for every
            journey and group size.
          </p>
        </div>

        {/* Vehicle Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {vehicleCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading vehicles from MongoDB Atlas...</p>
          </div>
        )}

        {/* Vehicles Grid */}
        {!loading && (
          <>
            {filteredVehicles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {filteredVehicles.map((vehicle, index) => (
                  <div
                    key={vehicle._id ? `${vehicle._id}-${index}` : `vehicle-${index}`}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Vehicle Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={vehicle.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop"}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {vehicle.capacity} Seater
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 text-travel-purple mr-1 fill-current" />
                        <span className="text-xs font-semibold">4.5</span>
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-travel-navy mb-2 group-hover:text-primary transition-colors">
                        {vehicle.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-3">
                        {vehicle.description}
                      </p>

                      {/* Vehicle Specs */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-600">
                          <Car className="h-3 w-3 mr-2" />
                          <span>{vehicle.type}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Users className="h-3 w-3 mr-2" />
                          <span>{vehicle.capacity} passengers</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {vehicle.features?.slice(0, 3).map((feature, idx) => {
                            const FeatureIcon = getFeatureIcon(feature);
                            return (
                              <div
                                key={idx}
                                className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                <FeatureIcon className="h-3 w-3 mr-1" />
                                <span>{feature}</span>
                              </div>
                            );
                          })}
                          {vehicle.features && vehicle.features.length > 3 && (
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                              +{vehicle.features.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="mb-4">
                        <div className="text-primary font-bold text-lg flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          {vehicle.price}
                        </div>
                        <div className="text-xs text-gray-600">per day</div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={onGetQuoteClick}
                        className="w-full bg-primary hover:bg-primary/90 text-white transform transition-all duration-300 hover:scale-[1.02]"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Vehicles Available</h3>
                <p className="text-gray-600 mb-4">
                  No vehicles found in the database. Please add vehicles through the admin panel.
                </p>
              </div>
            )}
          </>
        )}

        {/* Booking Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: Shield,
              title: "Insured Vehicles",
              desc: "All vehicles fully insured",
            },
            {
              icon: Users,
              title: "Expert Drivers",
              desc: "Experienced & professional",
            },
            {
              icon: Star,
              title: "24/7 Support",
              desc: "Round the clock assistance",
            },
            {
              icon: CheckCircle,
              title: "Best Rates",
              desc: "Competitive pricing guaranteed",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-travel-navy mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-travel-green to-green-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Special Booking Offers!</h3>
          <div className="grid sm:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Early Bird</h4>
              <p className="text-sm">Book 7 days in advance and get 10% off</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Group Discount</h4>
              <p className="text-sm">15% off on bookings for 15+ passengers</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h4 className="font-bold text-lg mb-2">Round Trip</h4>
              <p className="text-sm">20% off on round trip bookings</p>
            </div>
          </div>
          <Button
            onClick={onGetQuoteClick}
            size="lg"
            variant="secondary"
            className="bg-white text-travel-green hover:bg-gray-100 px-8 py-3"
          >
            Book Now & Save
          </Button>
        </div>
      </div>
    </section>
  );
}
