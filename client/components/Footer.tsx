import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "@/components/Logo";

interface FooterProps {
  onGetQuoteClick: () => void;
}

export default function Footer({ onGetQuoteClick }: FooterProps) {
  return (
    <>
      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-white p-4 shadow-lg z-50 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Need a Quick Quote?</div>
            <div className="text-sm opacity-90">Call or Get Free Quote</div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => window.location.href = 'tel:+919215615166'}
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              onClick={onGetQuoteClick}
              size="sm"
              className="bg-travel-purple hover:bg-travel-purple/90 text-white"
            >
              Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-travel-navy text-white">
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-travel-blue py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get a personalized quote for your travel needs. Our team is ready to help you plan 
              the perfect trip with comfortable vehicles and professional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onGetQuoteClick}
                size="lg"
                className="bg-travel-purple hover:bg-travel-purple/90 text-white px-8 py-4 text-lg"
              >
                Get Free Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                onClick={() => window.location.href = 'tel:+919215615166'}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +91 9215615166
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Company Info */}
              <div>
                <div className="mb-6">
                  <Logo size="lg" showText={true} className="mb-4" />
                </div>
                <p className="text-gray-300 mb-4">
                  Your trusted travel partner for comfortable and safe journeys across India. 
                  Experience the difference with our professional service.
                </p>
                <div className="flex space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <div className="font-semibold">25+ Years Experience</div>
                    <div className="text-sm text-gray-300">Trusted by thousands</div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Phone Numbers</div>
                      <div className="text-gray-300">+91 9215615166</div>
                      <div className="text-gray-300">+91 9996415166</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-300">dabshooda2@gmail.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-gray-300">Hooda Complex, Rohtak</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Available</div>
                      <div className="text-gray-300">24/7 Customer Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6">Our Services</h4>
                <div className="space-y-3">
                  <div className="text-gray-300 hover:text-white transition-colors">
                    🚐 Tempo Travellers (AC/Non-AC)
                  </div>
                  <div className="text-gray-300 hover:text-white transition-colors">
                    🚗 Premium Cars (Innova, Scorpio, Ertiga)
                  </div>
                  <div className="text-gray-300 hover:text-white transition-colors">
                    🚌 Mini Buses (17, 25, 32 Seater)
                  </div>
                  <div className="text-gray-300 hover:text-white transition-colors">
                    🗺️ All India Permit
                  </div>
                  <div className="text-gray-300 hover:text-white transition-colors">
                    ⛪ Pilgrimage Tours
                  </div>
                  <div className="text-gray-300 hover:text-white transition-colors">
                    👥 Corporate Travel
                  </div>
                  <div className="text-gray-300 hover:text-white transition-colors">
                    👨‍👩‍👧‍👦 Family Outings
                  </div>
                  <div className="text-gray-300 hover:text-white transition-colors">
                    💒 Wedding Transportation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 text-sm mb-4 md:mb-0">
                © 2024 Om Tour & Travels. All rights reserved. | Trusted since 25 years.
              </div>
              <div className="text-gray-300 text-sm flex items-center">
                <span className="text-travel-purple mr-2">ॐ</span>
                Travel with Comfort & Trust
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add bottom padding for mobile sticky bar */}
      <div className="h-20 md:h-0"></div>
    </>
  );
}
