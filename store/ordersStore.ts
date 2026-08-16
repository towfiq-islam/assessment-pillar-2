"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CustomerOrder } from "@/types/customer";
import type { CartItem } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";
export const shippingFlat = 24;
export const taxRate = 0.08;

interface OrdersState {
  orders: CustomerOrder[];
  placeOrder: (items: CartItem[]) => CustomerOrder | null;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    set => ({
      orders: [],

      placeOrder: items => {
        if (items.length === 0) return null;

        const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        );
        const total =
          subtotal + (subtotal > 0 ? shippingFlat : 0) + subtotal * taxRate;

        const order: CustomerOrder = {
          id: `ORD-${items[0].product.id}`,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          itemsCount,
          total: Math.round(total * 100) / 100,
          status: "Processing",
        };

        set(state => ({ orders: [order, ...state.orders] }));
        useCartStore.getState().clearCart();

        return order;
      },

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "orders",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
