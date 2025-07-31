import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

interface HeaderProps {
  onGetQuoteClick: () => void;
}

export default function Header({ onGetQuoteClick }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40 border-b border-gray-100">
      {/* Top Contact Bar */}
      {/* export default function Header({ onGetQuoteClick }: HeaderProps) { */}
  
    {/* <>
    
       <div className="bg-travel-navy text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+91 9215615166, +91 9996415166</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>manjeetsingh53000@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Hooda Complex, Rohtak</span>
            </div>
          </div>
        </div>
      </div>

    
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
         
          <div className="flex items-center space-x-4">
            <Logo size="lg" />
            <div className="hidden md:block">
              <p className="text-travel-purple font-medium text-sm">
                Since 25 Years
              </p>
            </div>
          </div>

         
          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex space-x-4">
              <a
                href="#about"
                className="text-travel-navy hover:text-primary transition-all duration-300 font-medium relative group text-sm"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#services"
                className="text-travel-navy hover:text-primary transition-all duration-300 font-medium relative group text-sm"
              >
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#packages"
                className="text-travel-navy hover:text-primary transition-all duration-300 font-medium relative group text-sm"
              >
                Packages
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#vehicles"
                className="text-travel-navy hover:text-primary transition-all duration-300 font-medium relative group text-sm"
              >
                Vehicles
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#gallery"
                className="text-travel-navy hover:text-primary transition-all duration-300 font-medium relative group text-sm"
              >
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-travel-navy hover:text-primary transition-all duration-300 font-medium relative group text-sm"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
            <Button
              onClick={onGetQuoteClick}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>
    </> */}
  

<>
  {/* Top Contact Bar */}
  <div className="bg-travel-navy text-white py-2">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          {/* Mobile: Only first phone */}
          <div className="flex items-center space-x-1">
            <Phone className="h-4 w-4" />
            <span className="block lg:hidden">+91 9215615166</span>
            <span className="hidden lg:block">
              +91 9215615166, +91 9996415166
            </span>
          </div>

          {/* Hide email on small screens */}
          <div className="hidden md:flex items-center space-x-1">
            <Mail className="h-4 w-4" />
            <span>manjeetsingh53000@gmail.com</span>
          </div>
        </div>

        {/* Hide address on small screens */}
        <div className="hidden sm:flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>Hooda Complex, Rohtak</span>
        </div>
      </div>
    </div>
  </div>

  {/* Main Navigation Bar */}
  <div className="container mx-auto px-4 py-4">
    <div className="flex justify-between items-center">
      {/* Logo and Company Info */}
      <div className="flex items-center space-x-4">
        <Logo size="lg" />
        <div className="hidden md:block">
          <p className="text-travel-purple font-medium text-sm">
            Since 25 Years
          </p>
        </div>
      </div>

      {/* Navigation and CTA */}
      <div className="flex items-center space-x-6">
        <nav className="hidden lg:flex space-x-4">
          {["about", "services", "vehicles", "gallery", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-travel-navy hover:text-primary transition-all duration-300 font-medium relative group text-sm"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        <Button
          onClick={onGetQuoteClick}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
        >
          Get a Quote
        </Button>
      </div>
    </div>
  </div>
</>


    </header>
  );
}
