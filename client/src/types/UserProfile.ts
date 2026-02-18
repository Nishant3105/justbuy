export interface Address {
  type: "billing" | "shipping";
  fullName: string;
  phone: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  newsletterSubscribed: boolean;
  marketingConsent: boolean;
  profilePic?: string;
  role?: "admin" | "customer" | "staff";
}
