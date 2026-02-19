import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await axios.get("/api/admin/dashboard", {
    withCredentials: true,
  });
  return res.data;
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });
};
