import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../utils/axios";

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
};

type NotifyFn = (msg: string, type: "success" | "error") => void;

export const useCart = () => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios.get("/api/cart",{withCredentials: true});
      return data;
    },
     select: (data) => ({
      cartItems: data.cart.map((item: any) => ({
        productId: item.product,
        slug: item.slug,
        name: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: data.totalPrice,
      totalQuantity: data.totalQuantity,
    }),
  });

  const addMutation = useMutation({
    mutationFn: async (item: CartItem) => {
      const { data } = await axios.post("/api/cart", item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async ({
      productId,
      removeAll,
    }: {
      productId: string;
      removeAll?: boolean;
    }) => {
      const { data } = await axios.patch(`/api/cart/${productId}`, {
        removeAll,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete("/api/cart");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    cartItems: data?.cartItems || [],
    totalPrice: data?.totalPrice || 0,
    totalQuantity: data?.totalQuantity || 0,
    isLoading,
    isError,

    addToCart: (item: CartItem, notify?: NotifyFn) =>
      addMutation.mutate(item, {
        onSuccess: () =>
          notify?.("Product added to cart", "success"),
        onError: () =>
          notify?.("Failed to add product", "error"),
      }),

    removeFromCart: (
      productId: string,
      removeAll?: boolean,
      notify?: NotifyFn
    ) =>
      removeMutation.mutate(
        { productId, removeAll },
        {
          onSuccess: () =>
            notify?.("Cart updated", "success"),
          onError: () =>
            notify?.("Failed to update cart", "error"),
        }
      ),

    clearCart: (notify?: NotifyFn) =>
      clearMutation.mutate(undefined, {
        onSuccess: () =>
          notify?.("Cart cleared", "success"),
        onError: () =>
          notify?.("Failed to clear cart", "error"),
      }),
  };
};