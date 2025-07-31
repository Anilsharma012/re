import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import VisionMission from "@/components/VisionMission";
import Services from "@/components/Services";

import VehicleBooking from "@/components/VehicleBooking";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import WelcomePopup from "@/components/WelcomePopup";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Index() {
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false);

  const handleGetQuoteClick = () => {
    setIsEnquiryFormOpen(true);
  };

  const handleCloseEnquiryForm = () => {
    setIsEnquiryFormOpen(false);
  };

  const handleCloseWelcomePopup = () => {
    setIsWelcomePopupOpen(false);
  };

  // Show welcome popup after 2 seconds when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcomePopupOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header onGetQuoteClick={handleGetQuoteClick} />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section aria-label="Welcome to Om Tour & Travels">
          <Hero onGetQuoteClick={handleGetQuoteClick} />
        </section>

        {/* About Us Section */}
        <section aria-label="About our travel services">
          <AboutUs />
        </section>

        {/* Vision & Mission Section */}
        <section aria-label="Our vision and mission">
          <VisionMission />
        </section>

        {/* Services Section */}
        <section aria-label="Our travel services and vehicles">
          <Services onGetQuoteClick={handleGetQuoteClick} />
        </section>

        {/* Tour Packages section removed as requested */}

        {/* Vehicle Booking Section */}
        <section aria-label="Book vehicles for your travel needs">
          <VehicleBooking onGetQuoteClick={handleGetQuoteClick} />
        </section>

        {/* Customer Testimonials */}
        <section aria-label="Customer reviews and testimonials">
          <Testimonials />
        </section>

        {/* Travel Gallery */}
        <section aria-label="Photos from our travel experiences">
          <Gallery />
        </section>

        {/* FAQ Section */}
        <section aria-label="Frequently asked questions">
          <FAQ onGetQuoteClick={handleGetQuoteClick} />
        </section>

        {/* Contact Section */}
        <section aria-label="Contact us for bookings and inquiries">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer onGetQuoteClick={handleGetQuoteClick} />

      {/* Enquiry Form Modal */}
      <EnquiryForm
        isOpen={isEnquiryFormOpen}
        onClose={handleCloseEnquiryForm}
      />

      {/* Welcome Popup */}
      <WelcomePopup
        isOpen={isWelcomePopupOpen}
        onClose={handleCloseWelcomePopup}
      />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
