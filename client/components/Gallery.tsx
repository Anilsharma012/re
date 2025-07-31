import { useState } from "react";
import { X, ZoomIn, MapPin, Calendar, Users, Camera } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Photos", count: 12 },
    { id: "heritage", name: "Heritage Sites", count: 3 },
    { id: "nature", name: "Nature & Hills", count: 3 },
    { id: "spiritual", name: "Spiritual Tours", count: 4 },
    { id: "vehicles", name: "Our Vehicles", count: 3 }
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
      category: "heritage",
      title: "Taj Mahal, Agra",
      location: "Utter Pardesh",
      date: "March 2024",
      description: "Beautiful architecture of Pink City during our Golden Triangle tour"
    },
    {
      id: 2,
      src: "./image/kh.jpg",
      category: "spiritual",
      title: "Khatu Shyam Temple",
      location: "Rajasthan",
      date: "February 2024",
      description: "Sacred temple of Barbarik - famous pilgrimage destination"
    },
    {
      id: 3,
      src: "./image/lad.jpg",
      category: "nature",
      title: "High Altitude Lake",
      location: "Ladakh",
      date: "September 2023",
      description: "Breathtaking views during our Himalayan adventure tour"
    },
    {
      id: 4,
      src: "./image/tem.jpg",
      category: "heritage",
      title: "Temple Architecture",
      location: "Tamil Nadu",
      date: "January 2024",
      description: "Intricate carvings at ancient South Indian temple"
    },
    {
      id: 5,
      src: "./image/vas.webp",
      category: "spiritual",
      title: "Vaishno Devi Temple",
      location: "Jammu & Kashmir",
      date: "December 2023",
      description: "Sacred cave temple of Mata Vaishno Devi in Trikuta Hills"
    },
    {
      id: 6,
      src: "./image/uda.jpg",
      category: "vehicles",
      title: "Udaipur",
      location: "Service Area",
      date: "Ongoing",
      description: "Well-maintained Innova for comfortable family travel"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
      category: "vehicles",
      title: "Tempo Traveller Interior",
      location: "Service Area",
      date: "Ongoing",
      description: "Spacious and comfortable seating for group tours"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop",
      category: "vehicles",
      title: "Mini Bus Service",
      location: "Service Area",
      date: "Ongoing",
      description: "Large capacity vehicles for corporate and group travel"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&overlay=C7A27B&overlay-blend=multiply&auto=format&fit=crop&w=800&q=60",
      category: "nature",
      title: "Mountain Landscape",
      location: "Himachal Pradesh",
      date: "May 2023",
      description: "Stunning mountain views during Shimla-Manali tour"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      category: "heritage",
      title: "Amber Fort Palace",
      location: "Jaipur, Rajasthan",
      date: "November 2023",
      description: "Magnificent Rajput architecture and royal grandeur"
    },
    {
      id: 11,
      src: "./image/vardivan.jpg",
      category: "spiritual",
      title: "Vrindavan Krishna Temple",
      location: "Uttar Pradesh",
      date: "August 2023",
      description: "Sacred birthplace of Lord Krishna - spiritual journey"
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/2870167/pexels-photo-2870167.jpeg?w=800&h=600&fit=crop",
      category: "spiritual",
      title: "Ayodhya Ram Mandir",
      location: "Uttar Pradesh",
      date: "July 2023",
      description: "Newly constructed grand temple of Lord Ram in Ayodhya"
    }
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-travel-navy mb-6">
            Travel Gallery
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the beauty of India through our lens. Browse through memorable moments 
            captured during our tours and see why Om Tour & Travels creates unforgettable journeys.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              onClick={() => openModal(index)}
            >
              <div className="aspect-square">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  <div className="flex items-center text-sm opacity-90 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{image.location}</span>
                  </div>
                  <div className="flex items-center text-xs opacity-75">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{image.date}</span>
                  </div>
                </div>
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Camera, number: "50,000+", label: "Photos Captured" },
            { icon: MapPin, number: "100+", label: "Destinations Covered" },
            { icon: Users, number: "10,000+", label: "Happy Travelers" },
            { icon: Calendar, number: "25+", label: "Years of Memories" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Photo Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image */}
              <img 
                src={filteredImages[selectedImage].src} 
                alt={filteredImages[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
                <h3 className="text-2xl font-bold mb-2">{filteredImages[selectedImage].title}</h3>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{filteredImages[selectedImage].location}</span>
                  <Calendar className="h-4 w-4 ml-4 mr-2" />
                  <span>{filteredImages[selectedImage].date}</span>
                </div>
                <p className="text-sm opacity-90">{filteredImages[selectedImage].description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-travel-blue rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Create Your Own Memories</h3>
          <p className="text-lg opacity-90 mb-6">
            Ready to create beautiful memories like these? Book your next adventure with 
            Om Tour & Travels and capture moments that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const enquirySection = document.querySelector('#contact');
                enquirySection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Plan Your Trip
            </button>
            <button
              onClick={() => window.location.href = 'mailto:dabshooda2@gmail.com?subject=Photo Sharing - Om Tour & Travels'}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Share Your Photos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
