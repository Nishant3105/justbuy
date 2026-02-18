export type UserRole = "customer" | "admin" | "staff";

export type UserStatus = "active" | "blocked" | "inactive";

export type AuthProvider = "email" | "google" | "facebook" | "apple";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  role: UserRole;
  status: UserStatus;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  authProvider?: AuthProvider;

  /** Profile */
  avatar?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;

  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };

  totalOrders: number;
  totalSpent: number;
  lastOrderAt?: string;

  notes?: string;
  createdBy?: string;
  updatedBy?: string;

  createdAt: string;
  updatedAt: string;
}


