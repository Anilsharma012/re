import { Award, Heart, Users, Car } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-travel-navy mb-4 md:mb-6">About Om Tour & Travels</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 md:mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="px-4 lg:px-0">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
              Om Tour & Travels is a trusted name in the travel industry, proudly serving customers
              for over <strong className="text-primary">25 years</strong>. Based in Rohtak, we specialize in providing
              reliable, comfortable, and safe travel experiences across India.
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
              Whether it's a wedding trip, pilgrimage, corporate tour, or family outing – we have
              the perfect vehicle for your journey. Our commitment to excellence and customer
              satisfaction has made us the preferred choice for thousands of travelers.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-3 rounded-full">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-travel-navy">25+ Years</h4>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-travel-emerald p-3 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-travel-navy">Trusted</h4>
                  <p className="text-sm text-gray-600">By Thousands</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-travel-green p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-travel-navy">Customer</h4>
                  <p className="text-sm text-gray-600">Focused</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-primary p-3 rounded-full">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-travel-navy">All India</h4>
                  <p className="text-sm text-gray-600">Permit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary via-travel-blue to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="text-center relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-white/5 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6 animate-bounce">🚌</div>
                  <h3 className="text-2xl font-bold mb-4">Your Journey, Our Responsibility</h3>
                  <p className="text-lg opacity-90 mb-6">
                    From comfortable Tempo Travellers to luxury cars, we ensure every mile
                    is traveled with safety and comfort.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-3xl font-bold text-white">25+</div>
                      <div className="text-sm opacity-80">Years</div>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-3xl font-bold text-white">10k+</div>
                      <div className="text-sm opacity-80">Happy Trips</div>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-3xl font-bold text-white">100%</div>
                      <div className="text-sm opacity-80">Safe</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
