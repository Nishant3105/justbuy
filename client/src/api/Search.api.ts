import axios from "../utils/axios"

export const searchProducts = async (query: string) => {
  if (!query || query.length < 2) return [];

  const response = await axios.get("/api/product/search", {
    params: { q: query },
  });

  return response.data;
};
