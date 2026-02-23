import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

export interface User {
  _id: string;
  email: string;
  role: "admin" | "customer" | "staff";
  profilePic?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  addresses?: any[];
  newsletterSubscribed?: boolean;
  marketingConsent?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  loginLoading: boolean;
  loginError: string | null;

  logout: () => Promise<void>;
  logoutLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
  } = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        return res.data.user;
      } catch {
        return null;
      }
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      return res.data.user;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading: isLoading,

        login: async (email: string, password: string) => {
          await loginMutation.mutateAsync({ email, password });
        },
        loginLoading: loginMutation.isPending,
        loginError:
          (loginMutation.error as any)?.response?.data?.message || null,

        logout: async () => {
          await logoutMutation.mutateAsync();
        },
        logoutLoading: logoutMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};