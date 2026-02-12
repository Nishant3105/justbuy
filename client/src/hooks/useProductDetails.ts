import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "../api/Product.api";

export const useProductDetails = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 0,
    gcTime: 0,              // 👈 THIS is the missing key (v5)
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
