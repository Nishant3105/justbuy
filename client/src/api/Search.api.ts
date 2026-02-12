import axios from "axios"; 

export const searchProducts = async (query: string) => {
  if (!query || query.length < 2) return [];

  const response = await axios.get("https://justbuy-a2g2.onrender.com/api/product/search", {
    params: { q: query },
  });

  return response.data;
};
