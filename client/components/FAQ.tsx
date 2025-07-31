import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FAQProps {
  onGetQuoteClick: () => void;
}

export default function FAQ({ onGetQuoteClick }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const faqCategories = [
    {
      title: "Booking & Reservations",
      icon: "📝",
      questions: [
        {
          question: "How can I book a vehicle with Om Tour & Travels?",
          answer: "You can book a vehicle through multiple ways: 1) Fill out our online enquiry form, 2) Call us directly at +91 9215615166, 3) Email us at dabshooda2@gmail.com, or 4) Visit our office at Hooda Complex, Rohtak. We recommend booking at least 2-3 days in advance for best availability."
        },
        {
          question: "What documents do I need for booking?",
          answer: "For booking confirmation, you need: Valid ID proof (Aadhar Card/Passport/Driving License), contact details, travel itinerary with dates and destinations. For payment, we accept cash, UPI, bank transfer, and card payments."
        },
        {
          question: "Can I modify or cancel my booking?",
          answer: "Yes, modifications can be made up to 24 hours before travel date subject to vehicle availability. Cancellations: Free cancellation up to 48 hours before travel. 50% charges for 24-48 hours, and 100% charges for same-day cancellation."
        },
        {
          question: "Do you provide advance booking for peak seasons?",
          answer: "Absolutely! We highly recommend advance booking during peak seasons (Apr-Jun, Oct-Nov, festivals, and holidays). Early booking ensures vehicle availability and better rates. Contact us 15-30 days in advance for peak season travel."
        }
      ]
    },
    {
      title: "Vehicles & Services",
      icon: "🚗",
      questions: [
        {
          question: "What types of vehicles do you offer?",
          answer: "We offer a comprehensive fleet: Sedan Cars (Dzire, Verna - 4+1 seater), SUVs (Innova, Scorpio - 7+1 seater), Tempo Travellers (9, 12, 17 seater), Mini Buses (25, 32 seater). All vehicles are well-maintained, insured, and equipped with modern amenities."
        },
        {
          question: "Are your vehicles AC and what amenities are included?",
          answer: "Yes, all our vehicles come with AC as standard. Additional amenities include: GPS navigation, music system, mobile charging points, first aid kit, clean interiors, comfortable seating, and ample luggage space. Tempo Travellers also have ice boxes and entertainment systems."
        },
        {
          question: "Do you provide All India Permit vehicles?",
          answer: "Yes, all our vehicles have All India Permit, allowing travel to any state in India. Our experienced drivers are familiar with interstate routes, toll procedures, and local regulations across different states."
        },
        {
          question: "What about vehicle insurance and safety?",
          answer: "All vehicles are comprehensively insured and regularly maintained. We conduct safety checks before every trip, provide seat belts for all passengers, maintain speed limits, and our drivers are trained in defensive driving and first aid."
        }
      ]
    },
    {
      title: "Pricing & Payment",
      icon: "💰",
      questions: [
        {
          question: "How is the pricing calculated?",
          answer: "Pricing depends on: Vehicle type, distance (per km charges), duration (daily rates), season (peak/off-peak), and additional services. We offer transparent pricing with no hidden charges. Toll, parking, and driver allowance are typically extra."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept multiple payment options: Cash, UPI (Google Pay, PhonePe, Paytm), Bank Transfer (NEFT/RTGS), Credit/Debit Cards. For advance booking, 25-50% advance payment is required with balance payable before or after the trip."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No hidden charges! Our quotes include: vehicle cost, driver charges, and basic amenities. Additional charges (clearly mentioned): Toll tax, parking fees, state taxes, driver accommodation (for multi-day trips), and any special requests like night halt charges."
        },
        {
          question: "Do you offer group discounts?",
          answer: "Yes! We offer attractive discounts: 10% off for bookings 7+ days in advance, 15% off for groups of 15+ passengers, 20% off for round-trip bookings, and special rates for corporate clients and regular customers."
        }
      ]
    },
    {
      title: "Travel & Routes",
      icon: "🗺️",
      questions: [
        {
          question: "Which destinations do you cover?",
          answer: "We cover all major destinations across India including: Religious places (Haridwar, Rishikesh, Ajmer, Shirdi), Hill stations (Shimla, Manali, Mussoorie), Heritage sites (Agra, Jaipur, Udaipur), and custom destinations as per your requirement."
        },
        {
          question: "Do you provide pickup and drop services?",
          answer: "Yes, we provide door-to-door service with pickup from your location (home, hotel, airport, railway station) and drop at your destination. For local areas in Rohtak, pickup/drop is complimentary. Nominal charges may apply for distant pickup points."
        },
        {
          question: "Can you suggest tour packages and itineraries?",
          answer: "Absolutely! Our experienced team can suggest: Popular tour packages (Golden Triangle, Char Dham, Rajasthan tour), custom itineraries based on your interests, best travel times, accommodation recommendations, and local attractions. Free consultation provided!"
        },
        {
          question: "What about long-distance and multi-day trips?",
          answer: "We specialize in long-distance travel! For multi-day trips: Driver accommodation and meals are arranged, night halt charges apply, daily driving limits are maintained for safety, and 24/7 support is provided throughout your journey."
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 100 + questionIndex;
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-travel-navy mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Got questions? We've got answers! Browse through our comprehensive FAQ section 
            to find answers to common questions about our services, booking process, and more.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8 mb-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-primary to-travel-blue p-6 text-white">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </div>

              {/* Questions */}
              <div className="p-6">
                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const itemId = categoryIndex * 100 + questionIndex;
                    const isOpen = openItems.includes(itemId);
                    
                    return (
                      <div key={questionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleItem(categoryIndex, questionIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-travel-navy pr-4">{item.question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-4 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Help Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-bold text-travel-navy mb-2">Call Us Directly</h4>
            <p className="text-gray-600 mb-4">Speak with our travel experts for immediate assistance</p>
            <Button 
              variant="outline" 
              className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
              onClick={() => window.location.href = 'tel:+919215615166'}
            >
              +91 9215615166
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-travel-navy mb-2">Email Your Query</h4>
            <p className="text-gray-600 mb-4">Send us detailed questions and get comprehensive answers</p>
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
              onClick={() => window.location.href = 'mailto:dabshooda2@gmail.com'}
            >
              Send Email
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-bold text-travel-navy mb-2">Get Instant Quote</h4>
            <p className="text-gray-600 mb-4">Fill our quick form and receive personalized pricing</p>
            <Button 
              onClick={onGetQuoteClick}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Get Quote Now
            </Button>
          </div>
        </div>

        {/* Still Have Questions CTA */}
        <div className="bg-gradient-to-r from-travel-purple to-travel-purple rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly customer support team is here to help. 
            Contact us through any of the channels below and we'll get back to you promptly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-travel-purple hover:bg-gray-100 px-8 py-3"
              onClick={() => window.location.href = 'https://wa.me/919215615166'}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Chat
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-travel-purple px-8 py-3"
              onClick={onGetQuoteClick}
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Request Callback
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
