import axios from "axios"; 

export const searchProducts = async (query: string) => {
  if (!query || query.length < 2) return [];

  const response = await axios.get("http://localhost:5000/api/product/search", {
    params: { q: query },
  });

  return response.data;
};
