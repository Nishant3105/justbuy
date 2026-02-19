import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

export interface Address {
  id: string;
  type: "billing" | "shipping";
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export type UserRole = "admin" | "staff" | "customer";
export type UserStatus = "active" | "blocked" | "inactive";

export interface User {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt?: string;
  authProvider: "email";
  addresses: Address[];
  totalOrders: number;
  totalSpent: number;
  permissions: {
    read: boolean;
    edit: boolean;
  };
  lastOrderDate?: string;
  newsletterSubscribed: boolean;
  marketingConsent: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
  });
};

export const usePatchUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Partial<User> & { _id: string }) => {
      const { data } = await axios.patch(`/api/users/${user._id}`, user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
