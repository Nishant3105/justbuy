import axios from "axios";
import { Product } from "../types/Product";

const API_URL = "http://localhost:5000/api/product";

export const fetchProductsByCategory = async (
  category: string,
  limit = 8
): Promise<Product[]> => {
  const res = await axios.get(
    `${API_URL}/category/${encodeURIComponent(category)}?limit=${limit}`
  );

  return res.data.data;
};

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
    console.log("🔥 FETCHING PRODUCT:", slug);
  const res = await axios.get(`${API_URL}/slug/${slug}`);
  return res.data;
};
