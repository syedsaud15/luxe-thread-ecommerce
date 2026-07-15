"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart } from "@/lib/api";
import type { Cart } from "@/lib/types";

interface CartContextType {
  cart: Cart;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

const emptyCart: Cart = { items: [], total: 0, itemCount: 0 };

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch {
      setCart(emptyCart);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const addItem = async (productId: number, quantity = 1) => {
    await addToCart(productId, quantity);
    await refreshCart();
    showToast("Added to cart!");
  };

  const updateItem = async (productId: number, quantity: number) => {
    await updateCartItem(productId, quantity);
    await refreshCart();
  };

  const removeItem = async (productId: number) => {
    await removeFromCart(productId);
    await refreshCart();
    showToast("Item removed");
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, refreshCart, addItem, updateItem, removeItem, showToast }}
    >
      {children}
      {toast && <div className="toast">{toast}</div>}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
