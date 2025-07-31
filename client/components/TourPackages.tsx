import { Button } from "@/components/ui/button";
import { Star, Clock, Users, MapPin, Calendar, Camera } from "lucide-react";

interface TourPackagesProps {
  onGetQuoteClick: () => void;
}

export default function TourPackages({ onGetQuoteClick }: TourPackagesProps) {
  const popularPackages = [
    {
      id: 1,
      title: "Golden Triangle Tour",
      duration: "4 Days / 3 Nights",
      destinations: ["Delhi", "Agra", "Jaipur"],
      image:
        "https://images.pexels.com/photos/28801422/pexels-photo-28801422.jpeg",

      rating: 4.8,
      reviews: 156,
      highlights: ["Taj Mahal", "Red Fort", "Hawa Mahal", "Amber Fort"],
      category: "Heritage",
    },
    {
      id: 2,
      title: "Spiritual Char Dham Yatra",
      duration: "7 Days / 6 Nights",
      destinations: ["Haridwar", "Rishikesh", "Badrinath", "Kedarnath"],
      image:
        "https://images.pexels.com/photos/32111279/pexels-photo-32111279.jpeg",

      rating: 4.9,
      reviews: 203,
      highlights: [
        "Temple Visits",
        "Ganga Aarti",
        "Mountain Views",
        "Spiritual Experience",
      ],
      category: "Spiritual",
    },
    {
      id: 3,
      title: "Himalayan Adventure",
      duration: "5 Days / 4 Nights",
      destinations: ["Shimla", "Manali", "Dharamshala"],
      image:
        "https://images.pexels.com/photos/27178287/pexels-photo-27178287.png",

      rating: 4.7,
      reviews: 89,
      highlights: [
        "Snow Mountains",
        "Adventure Sports",
        "Hill Stations",
        "Cool Weather",
      ],
      category: "Adventure",
    },
    {
      id: 4,
      title: "Rajasthan Royal Heritage",
      duration: "6 Days / 5 Nights",
      destinations: ["Jaipur", "Udaipur", "Jodhpur", "Pushkar"],
      image: "https://images.pexels.com/photos/797824/pexels-photo-797824.jpeg",

      rating: 4.9,
      reviews: 134,
      highlights: [
        "Royal Palaces",
        "Desert Safari",
        "Cultural Shows",
        "Heritage Hotels",
      ],
      category: "Royal",
    },
    {
      id: 5,
      title: "North India Pilgrimage",
      duration: "8 Days / 7 Nights",
      destinations: ["Mathura", "Vrindavan", "Ayodhya", "Varanasi"],
      image:
        "https://images.pexels.com/photos/2944561/pexels-photo-2944561.jpeg",

      rating: 4.8,
      reviews: 178,
      highlights: [
        "Krishna Temples",
        "Ganga Ghats",
        "Religious Ceremonies",
        "Sacred Sites",
      ],
      category: "Pilgrimage",
    },
    {
      id: 6,
      title: "Kashmir Paradise Tour",
      duration: "6 Days / 5 Nights",
      destinations: ["Srinagar", "Gulmarg", "Pahalgam", "Sonamarg"],
      image:
        "https://images.pexels.com/photos/27178287/pexels-photo-27178287.png",

      rating: 4.9,
      reviews: 95,
      highlights: [
        "Dal Lake",
        "Shikara Ride",
        "Snow Activities",
        "Beautiful Gardens",
      ],
      category: "Nature",
    },
  ];

  const categories = [
    { name: "All", count: popularPackages.length, color: "bg-primary" },
    { name: "Heritage", count: 2, color: "bg-travel-purple" },
    { name: "Spiritual", count: 2, color: "bg-green-500" },
    { name: "Adventure", count: 1, color: "bg-red-500" },
    { name: "Royal", count: 1, color: "bg-purple-500" },
    { name: "Pilgrimage", count: 1, color: "bg-blue-500" },
    { name: "Nature", count: 1, color: "bg-travel-green" },
  ];

  return (
    <section
      id="packages"
      className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-travel-navy mb-4 md:mb-6">
            Popular Tour Packages
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 md:mb-8"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover India's most beautiful destinations with our carefully
            crafted tour packages. From spiritual journeys to royal heritage
            tours, we have something special for every traveler.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${category.color} text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Tour Packages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {popularPackages.map((tour, index) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Tour Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {tour.category}
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Special Offer
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-travel-purple mr-1 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">
                    {tour.rating}
                  </span>
                  <span className="text-xs text-gray-600 ml-1">
                    ({tour.reviews})
                  </span>
                </div>
              </div>

              {/* Tour Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-travel-navy mb-2 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{tour.duration}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">
                    {tour.destinations.join(" → ")}
                  </span>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 2).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                    {tour.highlights.length > 2 && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                        +{tour.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-primary">
                      Contact for Best Price
                    </span>
                    <div className="text-xs text-gray-600">
                      Customized packages available
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={onGetQuoteClick}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Tour CTA */}
        <div className="bg-gradient-to-r from-travel-purple to-travel-purple rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Need a Custom Tour Package?
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Can't find the perfect package for your needs? Our travel experts
            can create a personalized itinerary just for you. Tell us your
            preferences and we'll design your dream vacation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetQuoteClick}
              size="lg"
              variant="secondary"
              className="bg-white text-travel-purple hover:bg-gray-100 px-8 py-3"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Plan Custom Tour
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-travel-purple px-8 py-3"
              onClick={() => (window.location.href = "tel:+919215615166")}
            >
              <Users className="h-5 w-5 mr-2" />
              Speak to Expert
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
