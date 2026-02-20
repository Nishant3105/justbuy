
import {
  createContext,
  useContext,
  ReactNode,
} from "react";

import { useCart, type CartItem } from "../hooks/useCart";

type NotifyFn = (msg: string, type?: "success" | "error") => void;

type CartContextType = {
  cartItems: CartItem[];
  isLoading: boolean;

  addToCart: (item: CartItem, notify?: NotifyFn) => void;

  removeFromCart: (
    productId: string,
    removeAll?: boolean,
    notify?: NotifyFn
  ) => void;

  clearCart: (notify?: NotifyFn) => void;

  getCartCount: () => number;

  getCartTotal: () => number;
};


const CartContext = createContext<CartContextType | undefined>(
  undefined
);


export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart();


  const getCartCount = () =>
    cartItems.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    );

  const getCartTotal = () =>
    cartItems.reduce(
      (total: number, item: CartItem) =>
        total + item.price * item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext must be used inside CartProvider"
    );
  }

  return context;
};

