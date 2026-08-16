"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiLock, FiTag } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";
import { shippingFlat, taxRate, useOrdersStore } from "@/store/ordersStore";

interface CartOrderSummaryProps {
  variant?: "cart" | "checkout";
}

export function CartOrderSummary({ variant = "cart" }: CartOrderSummaryProps) {
  const items = useCartStore(state => state.items);
  const placeOrder = useOrdersStore(state => state.placeOrder);
  const { status } = useSession();
  const router = useRouter();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? shippingFlat : 0;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;
  const isEmpty = items.length === 0;

  const handleCheckout = () => {
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent("/checkout")}`);
      return;
    }
    router.push("/checkout");
  };

  const handlePlaceOrder = () => {
    const order = placeOrder(items);
    if (!order) return;
    toast.success("Order confirmed successfully");
    router.push(`/order-complete?order=${order.id}`);
  };

  const isCheckoutVariant = variant === "checkout";

  return (
    <aside className="animate-fade-up rounded-xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

      {/* Breakdown */}
      <div className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">
            {subtotal > 0 ? `$${shipping.toFixed(2)}` : "$0.00"}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <span>Estimated tax</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Promo code */}
      <div className="mt-4 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2.5 transition-colors focus-within:border-orange-300 focus-within:bg-white">
        <FiTag className="h-4 w-4 shrink-0 text-gray-400" />

        <input
          type="text"
          placeholder="Promo code"
          className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />

        <button
          type="button"
          className="shrink-0 text-sm font-semibold text-primary-orange transition-transform duration-200 hover:text-primary-orange active:scale-95 cursor-pointer"
        >
          Apply
        </button>
      </div>

      {/* Total */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Primary action */}
      <button
        type="button"
        onClick={isCheckoutVariant ? handlePlaceOrder : handleCheckout}
        className="mt-4 md:mt-5 cursor-pointer flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-2.5 font-semibold text-white hover:scale-95 duration-300 transition-transform hover:shadow-lg hover:shadow-orange-500/20"
      >
        {isCheckoutVariant ? (
          <FiCheckCircle className="h-4 w-4" />
        ) : (
          <FiLock className="h-4 w-4" />
        )}

        {isCheckoutVariant ? "Proceed to Payment" : "Proceed to Checkout"}
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        Taxes and shipping calculated at checkout
      </p>
    </aside>
  );
}
