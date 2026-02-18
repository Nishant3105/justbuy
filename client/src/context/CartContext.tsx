import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: string,
  slug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem, notify?: (msg: string, type?: "success" | "error") => void) => void;
  removeFromCart: (id: string, removeAll?: boolean, notify?: (msg: string, type?: "success" | "error") => void) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem, notify?: CartContextType["addToCart"] extends (...args: infer P) => any ? P[1] : never) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.slug === product.slug);

      if (existing) {
        notify?.("Increased product quantity");
        return prev.map((p) =>
          p.slug === product.slug
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      notify?.("Product added to cart");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (slug: string, removeAll = false, notify?: CartContextType["removeFromCart"] extends (...args: infer P) => any ? P[2] : never) => {
    setCartItems((prev) => {
      const item = prev.find((p) => p.slug === slug);
      if (!item) return prev;

      if (removeAll || item.quantity === 1) {
        notify?.("Product removed from cart", "error");
        return prev.filter((p) => p.slug !== slug);
      }

      notify?.("Reduced product quantity", "error");
      return prev.map((p) =>
        p.slug === slug ? { ...p, quantity: p.quantity - 1 } : p
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
