"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQty: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      items: [],

      addToCart: (product, quantity = 1) =>
        set(state => {
          const existing = state.items.find(
            item => item.product.id === product.id,
          );

          if (existing) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return { items: [...state.items, { product, quantity }] };
        }),

      updateQty: (productId, quantity) =>
        set(state => ({
          items:
            quantity <= 0
              ? state.items.filter(item => item.product.id !== productId)
              : state.items.map(item =>
                  item.product.id === productId ? { ...item, quantity } : item,
                ),
        })),

      removeFromCart: productId =>
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
