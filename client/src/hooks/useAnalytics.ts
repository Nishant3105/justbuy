import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";

export const useSummary = () =>
  useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/analytics/summary");
      return data;
    },
  });

export const useRevenue = () =>
  useQuery({
    queryKey: ["revenue"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/analytics/revenue");
      return data;
    },
  });

export const useOrdersAnalytics = () =>
  useQuery({
    queryKey: ["ordersAnalytics"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/analytics/orders");
      return data;
    },
  });

export const useUsersAnalytics = () =>
  useQuery({
    queryKey: ["usersAnalytics"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/analytics/users");
      return data;
    },
  });

export const usePaymentStatus = () =>
  useQuery({
    queryKey: ["paymentStatus"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/analytics/payment-status");
      return data;
    },
  });

export const useTopProducts = () =>
  useQuery({
    queryKey: ["topProducts"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/analytics/top-products");
      return data;
    },
  });

export const useRecentOrders = () =>
  useQuery({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/analytics/recent-orders");
      return data;
    },
  });
