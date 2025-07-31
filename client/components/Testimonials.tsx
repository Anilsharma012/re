import { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
} from "lucide-react";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      image: "👨‍💼",
      trip: "Golden Triangle Tour",
      date: "March 2024",
      review:
        "ओम टूर एंड ट्रेवल्स की शानदार ��ेवा! हमारी 4 दिन की गोल्डन ट्रायंगल यात्रा बिल्कुल सही तरीके से व्यवस्थित थी। ड्राइवर प्रोफेशनल था, गाड़ी साफ और आरामदायक थी। पारिवारिक यात्राओं के लिए अत्यधिक सिफारिश!",
      vehicle: "Toyota Innova",
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      image: "👩‍💻",
      trip: "Char Dham Yatra",
      date: "February 2024",
      review:
        "ओम टूर एंड ट्रेवल्स द्��ारा आध्यात्मिक यात्रा को आरामदायक बनाया गया। टेम्पो ट्रेवलर विशाल और अच्छी तरह से रखरखाव था। ड्राइवर सभी रास्ते बिल्कुल सही जानता था। तीर्थयात्रा के लिए सर्वोत्तम सेवा!",
      vehicle: "Tempo Traveller 12 Seater",
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Ahmedabad",
      rating: 5,
      image: "👨‍👩‍👧‍👦",
      trip: "Rajasthan Heritage Tour",
      date: "January 2024",
      review:
        "Amazing experience with Om Tour & Travels! Professional driver, comfortable vehicle, and excellent customer service. Our 6-day Rajasthan tour was perfectly organized. Highly recommended for family trips. Will definitely book again!",
      vehicle: "Mini Bus 17 Seater",
    },
    {
      id: 4,
      name: "Neha Gupta",
      location: "Pune",
      rating: 5,
      image: "👩‍🎓",
      trip: "Shimla Manali Tour",
      date: "December 2023",
      review:
        "हमारे कॉलेज मित्रों की यात्रा के लिए बिल्कुल सही! स्कॉर्पियो पहाड़ी सड़कों के लिए आदर्श थी। ड्राइवर हिल स्टेशन के रास्तों में अनुभवी था। पैसे की बेहतरीन वैल्यू और यादगार अनुभव!",
      vehicle: "Mahindra Scorpio",
    },
    {
      id: 5,
      name: "Sunil Agarwal",
      location: "Jaipur",
      rating: 5,
      image: "👨‍⚕️",
      trip: "Corporate Trip to Goa",
      date: "November 2023",
      review:
        "Excellent service for our office team outing! Clean AC vehicle, punctual pickup, and professional driver. Om Tour & Travels provided outstanding customer service. Highly professional and reliable. Perfect for corporate travel!",
      vehicle: "Mini Bus 25 Seater",
    },
    {
      id: 6,
      name: "Kavitha Reddy",
      location: "Bangalore",
      rating: 5,
      image: "👩‍💼",
      trip: "South India Temple Tour",
      date: "October 2023",
      review:
        "हमारी मंदिर यात्रा के लिए शानदार अनुभव। गाड़ी लंबी दूरी के लिए आरामदायक थी। ड्राइवर मंदिर के समय और रास्तों के बारे में जानकार था। उत्कृष्ट सेवा गुणवत्ता!",
      vehicle: "Toyota Innova Crysta",
    },
    {
      id: 7,
      name: "Manoj Singh",
      location: "Chandigarh",
      rating: 5,
      image: "👨‍🍳",
      trip: "Kashmir Valley Tour",
      date: "September 2023",
      review:
        "परिवार के साथ कश्मीर की अद्भुत यात्रा! गाड़ी पहाड़ी इलाकों के लिए बिल्कुल सही थी। ड्राइवर कश्मीर के रास्तों में अनुभवी था। ओम टूर एंड ट्रेवल्स के साथ सुंदर यादें बनीं!",
      vehicle: "Mahindra Scorpio 4WD",
    },
    {
      id: 8,
      name: "Ritu Kapoor",
      location: "Lucknow",
      rating: 5,
      image: "👩‍🏫",
      trip: "School Educational Trip",
      date: "August 2023",
      review:
        "30 छात्रों के लिए स्कूल ट्रिप का आयोजन किया। सुरक्षा सर्वोच्च प्राथमिकता थी और ओम टूर एंड ट्रेवल्स ने बेहतरीन सेवा दी। अच्छी तरह से रखरखाव वाली बस, जिम्मेदार ड्राइवर। अभिभावक बहुत संतुष्ट थे!",
      vehicle: "Mini Bus 32 Seater",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(testimonials.length / 3)) %
        Math.ceil(testimonials.length / 3),
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentTestimonials = testimonials.slice(
    currentSlide * 3,
    currentSlide * 3 + 3,
  );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-travel-navy mb-6">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it! Read what our satisfied customers
            say about their travel experiences with Om Tour & Travels. Your
            happiness is our success.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "10,000+", label: "Happy Customers", icon: "😊" },
            { number: "25+", label: "Years Experience", icon: "🏆" },
            { number: "4.9/5", label: "Average Rating", icon: "⭐" },
            { number: "50,000+", label: "Trips Completed", icon: "🚌" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary opacity-50" />
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-travel-purple fill-current"
                      />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.review}"
                </p>

                {/* Trip Details */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{testimonial.trip}</span>
                    </div>
                    <span>{testimonial.date}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Vehicle: {testimonial.vehicle}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-travel-blue rounded-full flex items-center justify-center text-white text-xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-travel-navy">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-primary scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-travel-blue rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Want to Share Your Experience?
            </h3>
            <p className="text-lg opacity-90 mb-6">
              We love hearing from our customers! Share your travel story and
              help others discover the joy of traveling with Om Tour & Travels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  window.open(
                    "https://g.page/r/review-om-tour-travels",
                    "_blank",
                  )
                }
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Write a Review
              </button>
              <button
                onClick={() =>
                  (window.location.href =
                    "mailto:manjeetsingh53000@gmail.com?subject=Photo Sharing - Om Tour & Travels")
                }
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
              >
                Share Photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
