import { Target, Lightbulb, CheckCircle } from "lucide-react";

export default function VisionMission() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-travel-navy mb-6">Our Vision & Mission</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Driven by excellence and guided by our values, we strive to make every journey memorable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-travel-blue rounded-2xl p-8 text-white h-full">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              
              <p className="text-lg leading-relaxed mb-6 opacity-90">
                To become India's most customer-centric travel service provider known for 
                safe, comfortable, and timely travel solutions.
              </p>

              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-travel-purple mr-3" />
                  <span className="text-sm">Leading travel service in India</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-travel-purple mr-3" />
                  <span className="text-sm">Customer-first approach</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-travel-purple mr-3" />
                  <span className="text-sm">Safe & timely services</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="relative">
            <div className="bg-gradient-to-br from-travel-purple to-travel-purple rounded-2xl p-8 text-white h-full">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4 mt-1">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Quality Service</h4>
                    <p className="text-sm opacity-90">
                      To deliver quality transport services with a personal touch
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4 mt-1">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Customer Satisfaction</h4>
                    <p className="text-sm opacity-90">
                      To ensure customer satisfaction through professionalism and punctuality
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4 mt-1">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Affordable Luxury</h4>
                    <p className="text-sm opacity-90">
                      To provide affordable yet luxurious travel options to every corner of India
                    </p>
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
