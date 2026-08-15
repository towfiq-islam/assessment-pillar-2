"use client";
import { CartItem } from "@/types/cart";
import Link from "next/link";
import { FiLock, FiTag } from "react-icons/fi";

interface CartOrderSummaryProps {
  items: CartItem[];
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const SHIPPING = 24;
const TAX_RATE = 0.08;

export function CartOrderSummary({ items }: CartOrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING + tax;

  return (
    <aside className="animate-fade-up rounded-xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

      {/* Breakdown */}
      <div className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center justify-between text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">
            {currency.format(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <span>Shipping</span>

          <span className="font-medium text-gray-900">
            {currency.format(SHIPPING)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <span>Estimated tax</span>

          <span className="font-medium text-gray-900">
            {currency.format(tax)}
          </span>
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
          {currency.format(total)}
        </span>
      </div>

      {/* Checkout */}
      <Link
        href="/checkout"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-2.5 font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98]"
      >
        <FiLock className="h-4 w-4" />
        Checkout
      </Link>

      <p className="mt-4 text-center text-xs text-gray-400">
        Taxes and shipping calculated at checkout
      </p>
    </aside>
  );
}
