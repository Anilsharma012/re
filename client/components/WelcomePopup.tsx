import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Phone, MapPin, Users, Car } from "lucide-react";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pickupLocation: "",
    destination: "",
    vehicleType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const enquiryData = {
        ...formData,
        email: "",
        travelDate: new Date().toISOString().split("T")[0],
        passengers: "4",
        message: "Quick enquiry from welcome popup",
      };

      console.log("🚀 Submitting welcome popup enquiry:", enquiryData);

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryData),
      });

      console.log("📊 Response status:", response.status);
      console.log("📋 Response headers:", response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("📝 Response result:", result);

      if (response.ok && result.success) {
        alert("Thank you! We'll contact you shortly with your travel quote.");
        setFormData({
          name: "",
          mobile: "",
          pickupLocation: "",
          destination: "",
          vehicleType: "",
        });
        onClose();
        console.log(
          "✅ Welcome popup enquiry submitted to manjeetsingh53000@gmail.com",
        );
      } else {
        alert(result.message || "Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error submitting welcome popup:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-blue-50 border-2 border-primary/20">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-travel-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚌</span>
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-travel-navy">
            🙏 Welcome to Om Tour & Travels!
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            Your trusted travel partner for 25+ years. Get a quick quote for
            your next journey!
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label
              htmlFor="welcome-name"
              className="flex items-center text-sm font-medium"
            >
              <Users className="h-4 w-4 mr-2 text-primary" />
              Your Name *
            </Label>
            <Input
              id="welcome-name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="border-primary/30 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="welcome-mobile"
              className="flex items-center text-sm font-medium"
            >
              <Phone className="h-4 w-4 mr-2 text-primary" />
              Mobile Number *
            </Label>
            <Input
              id="welcome-mobile"
              type="tel"
              placeholder="+91 9876543210"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              required
              className="border-primary/30 focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label
                htmlFor="welcome-pickup"
                className="flex items-center text-xs font-medium"
              >
                <MapPin className="h-3 w-3 mr-1 text-primary" />
                From
              </Label>
              <Input
                id="welcome-pickup"
                placeholder="Pickup city"
                value={formData.pickupLocation}
                onChange={(e) =>
                  handleInputChange("pickupLocation", e.target.value)
                }
                className="border-primary/30 focus:border-primary text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="welcome-destination"
                className="flex items-center text-xs font-medium"
              >
                <MapPin className="h-3 w-3 mr-1 text-primary" />
                To
              </Label>
              <Input
                id="welcome-destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={(e) =>
                  handleInputChange("destination", e.target.value)
                }
                className="border-primary/30 focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center text-sm font-medium">
              <Car className="h-4 w-4 mr-2 text-primary" />
              Vehicle Type
            </Label>
            <Select
              value={formData.vehicleType}
              onValueChange={(value) => handleInputChange("vehicleType", value)}
            >
              <SelectTrigger className="border-primary/30 focus:border-primary">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan (Dzire/Verna)</SelectItem>
                <SelectItem value="suv">SUV (Innova/Scorpio)</SelectItem>
                <SelectItem value="tempo-traveller">Tempo Traveller</SelectItem>
                <SelectItem value="mini-bus">Mini Bus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              {isSubmitting ? "Sending..." : "Get Free Quote 🚀"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 border-primary/30 text-primary hover:bg-primary hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="text-center mt-4 p-3 bg-gradient-to-r from-primary/10 to-travel-blue/10 rounded-lg">
          <p className="text-xs text-gray-600">
            📞 <strong>Call Now:</strong> +91 9215615166 | 📧{" "}
            <strong>Email:</strong> manjeetsingh53000@gmail.com
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
