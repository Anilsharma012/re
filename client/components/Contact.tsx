import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("📧 Submitting contact form:", contactForm);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      console.log("📊 Contact form response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("📝 Contact form result:", result);

      if (response.ok && result.success) {
        alert(
          "Thank you for your message! We'll get back to you within 24 hours.",
        );
        setContactForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        console.log(
          "✅ Contact form submitted successfully to manjeetsingh53000@gmail.com",
        );
      } else {
        alert(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 9215615166", "+91 9996415166"],
      subtext: "24/7 Customer Support",
      color: "bg-green-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["dabshooda2@gmail.com"],
      subtext: "Quick Response Guaranteed",
      color: "bg-blue-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Hooda Complex, Rohtak", "Haryana, India"],
      subtext: "Mon - Sun: 6:00 AM - 10:00 PM",
      color: "bg-red-500",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["24/7 Availability", "Emergency Services"],
      subtext: "Always at your service",
      color: "bg-purple-500",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-travel-navy mb-6">
            Get In Touch With Us
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to plan your next journey? Contact us today for personalized
            travel solutions. Our experienced team is here to make your travel
            dreams come true.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-travel-navy mb-8">
                Contact Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="group">
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div
                          className={`${info.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="font-bold text-travel-navy mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 font-medium">
                            {detail}
                          </p>
                        ))}
                        <p className="text-sm text-gray-500 mt-2">
                          {info.subtext}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h4 className="text-xl font-bold text-travel-navy mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  Find Us on Map
                </h4>
                <div className="rounded-lg overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55803.29671768756!2d76.5567!3d28.8965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b57a1b4e5c5%3A0x5c1a9b7b5b4e5c5!2sHooda%20Complex%2C%20Rohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Om Tour & Travels Location - Hooda Complex, Rohtak"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-semibold text-travel-navy">
                    Hooda Complex, Rohtak
                  </p>
                  <p className="text-sm text-gray-600">
                    Haryana, India - 124001
                  </p>
                  <button
                    className="mt-2 text-primary hover:text-primary/80 text-sm font-medium"
                    onClick={() =>
                      window.open(
                        "https://goo.gl/maps/rohtak-hooda-complex",
                        "_blank",
                      )
                    }
                  >
                    Get Directions →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-travel-navy mb-2">
                Send Us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Full Name *</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone Number *</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  placeholder="What is your enquiry about?"
                  value={contactForm.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us about your travel requirements, dates, destination, number of passengers, or any special requests..."
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="transition-all duration-300 focus:scale-[1.02]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold transform transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Quick Contact CTA */}
        <div className="bg-gradient-to-r from-primary to-travel-blue rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Need Immediate Assistance?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            For urgent bookings or emergency travel requirements, call us
            directly. Our team is available 24/7 to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
              onClick={() => (window.location.href = "tel:+919215615166")}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: +91 9215615166
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
              onClick={() =>
                (window.location.href = "https://wa.me/919215615166")
              }
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
