import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "919215615166"; // WhatsApp number
  const message = "नमस्ते! मुझे आपकी ट्रैवल सेवाओं के बारे में जानकारी चाहिए। कृपया डिटेल्स भेजें।";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-50 group">
      <button
        onClick={handleWhatsAppClick}
        className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp पर संपर्क करें"
        title="WhatsApp पर संपर्क करें"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Pulse effect */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30 pointer-events-none"></div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        WhatsApp पर चैट करें
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}
