import { createContext, useContext, useEffect, useState } from "react";
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
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.get("/api/auth/logout", { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
