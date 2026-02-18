import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
import type { Order } from "../types/Order";

const fetchMyOrders = async (): Promise<Order[]> => {
  const res = await axios.get("/api/payment/my-orders", { withCredentials: true });
  return res.data.orders;
};

export const useMyOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
  });
};
