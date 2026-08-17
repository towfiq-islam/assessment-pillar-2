"use client";
import Link from "next/link";
import { FiShoppingBag, FiTrash2 } from "react-icons/fi";
import SectionTitle from "@/components/common/SectionTitle";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartOrderSummary } from "@/components/cart/CartOrderSummary";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const isEmpty = items.length === 0;

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="container pt-7 md:pt-10 xl:pt-12 pb-10 md:pb-16 xl:pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5 md:mb-7">
          <div className="animate-fade-up flex flex-wrap items-center justify-between gap-3">
            <SectionTitle>
              Your <span className="text-primary-orange">Cart</span>
            </SectionTitle>

            {!isEmpty && (
              <button
                type="button"
                onClick={handleClearCart}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 cursor-pointer"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
                Clear cart
              </button>
            )}
          </div>

          <p
            className="animate-fade-up mt-1 xl:mt-2 text-[15px] text-gray-500"
            style={{ animationDelay: "0.1s" }}
          >
            Review your items before checkout.
          </p>
        </div>

        {isEmpty ? (
          <div className="animate-fade-up flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white py-24 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <FiShoppingBag className="h-8 w-8 text-orange-500" />
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900">
                Your cart is empty
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Looks like you haven&apos;t added anything yet.
              </p>
            </div>

            <Link
              href="/"
              className="mt-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                {items.map((item, index) => (
                  <CartLineItem
                    key={item.product.id}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <CartOrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
