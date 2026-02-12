import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "../api/Product.api";
import { Product } from "../types/Product";

export const useCategoryProducts = (
  category: string,
  limit = 8
) => {
  return useQuery<Product[]>({
    queryKey: ["products", "category", category, limit],
    queryFn: () => fetchProductsByCategory(category, limit),
    enabled: !!category, 
  });
};
