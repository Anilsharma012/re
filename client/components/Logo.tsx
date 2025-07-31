interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12", 
    lg: "h-16",
    xl: "h-20"
  };

  const logoUrl = "https://cdn.builder.io/api/v1/image/assets%2Feea3a82dfe47464889bf38a302344abd%2Fdee3fc82d0fc440e832aad2ecb0be4c9?format=webp&width=800";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Professional Logo Image */}
      <div className={`${sizeClasses[size]} relative`}>
        <img 
          src={logoUrl} 
          alt="Om Tour & Travels - Professional Travel Services" 
          className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 hover:scale-105`}
        />
      </div>
      
      {/* Optional Company Text */}
      {showText && size !== "sm" && (
        <div className="hidden sm:block">
          <div className="flex items-center">
            <p className="text-travel-purple font-medium text-xs leading-tight mr-2">
              Travel with Comfort & Trust
            </p>
            {size === "lg" || size === "xl" ? (
              <div className="flex items-center text-xs text-gray-500">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Since 1999
                </span>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
