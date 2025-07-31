import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Calendar, Users, Car, MessageCircle } from "lucide-react";

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryForm({ isOpen, onClose }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pickupLocation: "",
    destination: "",
    travelDate: "",
    passengers: "",
    vehicleType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          pickupLocation: "",
          destination: "",
          travelDate: "",
          passengers: "",
          vehicleType: "",
          message: ""
        });
        console.log('✅ Enquiry submitted successfully!');
      } else {
        alert(result.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitSuccess(false);
    onClose();
  };

  if (submitSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              We've received your enquiry. We'll contact you shortly with your travel quote.
            </p>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-travel-navy flex items-center">
            <Mail className="h-6 w-6 text-primary mr-2" />
            Get Your Travel Quote
          </DialogTitle>
          <DialogDescription>
            Fill in your travel details and we'll get back to you with a customized quote within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Name *
              </Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <Label htmlFor="mobile" className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                Mobile Number *
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickup" className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Pickup Location *
              </Label>
              <Input
                id="pickup"
                placeholder="City, Area or Address"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                required
              />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Destination *
              </Label>
              <Input
                id="destination"
                placeholder="Where do you want to go?"
                value={formData.destination}
                onChange={(e) => handleInputChange("destination", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Travel Date */}
            <div className="space-y-2">
              <Label htmlFor="travelDate" className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Travel Date *
              </Label>
              <Input
                id="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={(e) => handleInputChange("travelDate", e.target.value)}
                required
              />
            </div>

            {/* Number of Passengers */}
            <div className="space-y-2">
              <Label htmlFor="passengers" className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Number of Passengers *
              </Label>
              <Input
                id="passengers"
                type="number"
                min="1"
                placeholder="How many people?"
                value={formData.passengers}
                onChange={(e) => handleInputChange("passengers", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Car className="h-4 w-4 mr-1" />
              Vehicle Type *
            </Label>
            <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tempo-traveller-ac">Tempo Traveller (AC)</SelectItem>
                <SelectItem value="tempo-traveller-non-ac">Tempo Traveller (Non-AC)</SelectItem>
                <SelectItem value="innova">Innova</SelectItem>
                <SelectItem value="scorpio">Scorpio</SelectItem>
                <SelectItem value="ertiga">Ertiga</SelectItem>
                <SelectItem value="dzire">Dzire</SelectItem>
                <SelectItem value="verna">Verna</SelectItem>
                <SelectItem value="mini-bus-17">Mini Bus (17 Seater)</SelectItem>
                <SelectItem value="mini-bus-25">Mini Bus (25 Seater)</SelectItem>
                <SelectItem value="mini-bus-32">Mini Bus (32 Seater)</SelectItem>
                <SelectItem value="other">Other (Specify in message)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              Message / Special Request
            </Label>
            <Textarea
              id="message"
              placeholder="Any special requirements, pickup time preferences, or additional information..."
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Sending..." : "Submit Enquiry"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
