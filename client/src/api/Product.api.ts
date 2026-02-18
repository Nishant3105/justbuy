import axios from "../utils/axios";
import { Product } from "../types/Product";

export const fetchProductsByCategory = async (
  category: string,
  limit = 8
): Promise<Product[]> => {
  const res = await axios.get(
    `/api/product/category/${encodeURIComponent(category)}?limit=${limit}`
  );

  return res.data.data;
};

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  const res = await axios.get(`/api/product/slug/${slug}`);
  return res.data;
};
