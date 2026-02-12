import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/Search.api";

export const useLiveSearch = (query: string) => {
  return useQuery({
    queryKey: ["live-search", query],
    queryFn: () => searchProducts(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000,
  });
};
