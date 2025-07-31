/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Types for enquiry form submission
 */
export interface EnquiryFormData {
  name: string;
  mobile: string;
  email: string;
  pickupLocation: string;
  destination: string;
  travelDate: string;
  passengers: string;
  vehicleType: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
}

/**
 * Types for contact form submission
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * Types for admin authentication and dashboard
 */
export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface AdminStatsResponse {
  totalVisitors: number;
  totalEnquiries: number;
  totalContacts: number;
  recentActivity: Array<{
    type: string;
    message: string;
    timestamp: Date;
  }>;
}
