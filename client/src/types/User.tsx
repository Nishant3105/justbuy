export type UserRole = "customer" | "admin" | "vendor";

export type UserStatus = "active" | "blocked" | "inactive";

export type AuthProvider = "email" | "google" | "facebook" | "apple";

export interface User {
  /** Core Identity */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  /** Authentication */
  role: UserRole;
  status: UserStatus;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  authProvider?: AuthProvider;

  /** Profile */
  avatar?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;

  /** Address (Primary) */
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };

  /** Ecommerce Stats */
  totalOrders: number;
  totalSpent: number;
  lastOrderAt?: string;

  /** Admin / Internal */
  notes?: string;
  createdBy?: string;
  updatedBy?: string;

  /** Timestamps */
  createdAt: string;
  updatedAt: string;
}
