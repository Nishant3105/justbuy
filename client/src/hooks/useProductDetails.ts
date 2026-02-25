import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "../api/Product.api";

export const useProductDetails = (slug?: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug!),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,      
    gcTime: 30 * 60 * 1000,        
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
