import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
import type { Order } from "../types/Order";

const fetchMyOrders = async (): Promise<Order[]> => {
  const res = await axios.get("/api/payment/my-orders", { withCredentials: true });
  return res.data.orders;
};

const fetchUsersOrders = async (userId: string): Promise<Order[]> => {
  const res = await axios.get(`/api/users/vieworders/${userId}`, { withCredentials: true });
  return res.data.orders;
};

const fetchAllOrders = async (
  page: number,
  limit: number
): Promise<{ orders: Order[]; page: number; pages: number; total: number }> => {

  const res = await axios.get(
    `/api/admin/orders?page=${page}&limit=${limit}`,
    { withCredentials: true }
  );

  return res.data;
};


export const useMyOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
  });
};
  
export const useUsersOrders = (userId: string) => {
  return useQuery<Order[]>({
    queryKey: ["usersOrders", userId],
    queryFn: () => fetchUsersOrders(userId),
    enabled: !!userId,
  });
};

export const useAllOrders = (page: number, limit = 5) => {
  return useQuery({
    queryKey: ["admin-orders", page],
    queryFn: () => fetchAllOrders(page, limit),
    placeholderData: (previousData) => previousData,
  });
};
