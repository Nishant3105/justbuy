import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
import type { Product } from "../types/Product";

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pages: number;
}

export interface UseProductsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  search?: string;
  category?: string;
  status?: string;
}

const fetchProducts = async (
  params: UseProductsParams
): Promise<ProductsResponse> => {

  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
    search = "",
    category = "",
    status = "",
  } = params;

  const res = await axios.get("/api/product/filter", {
    params: {
      page,
      limit,
      sortBy,
      order,
      search,
      category,
      status,
    },
    withCredentials: true,
  });

  return res.data;
};

export const useProducts = (params: UseProductsParams) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", params],

    queryFn: () => fetchProducts(params),

    // ✅ v5 replacement for keepPreviousData
    placeholderData: (previousData) => previousData,

    staleTime: 1000 * 60 * 5,
  });
};
