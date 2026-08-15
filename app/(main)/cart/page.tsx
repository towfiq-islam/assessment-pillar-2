"use client";
import { cartItems } from "@/components/data/cart";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import SectionTitle from "@/components/common/SectionTitle";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartOrderSummary } from "@/components/cart/CartOrderSummary";

export default function CartPage() {
  const isEmpty = cartItems.length === 0;

  return (
    <div className="container pt-7 md:pt-10 xl:pt-12 pb-10 md:pb-16 xl:pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5 md:mb-7">
          <div className="animate-fade-up">
            <SectionTitle>
              Your <span className="text-orange-500">Cart</span>
            </SectionTitle>
          </div>

          <p
            className="animate-fade-up mt-1 xl:mt-2 text-[15px] text-gray-500"
            style={{ animationDelay: "0.1s" }}
          >
            Review your items before checkout.
          </p>
        </div>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2 overflow-hidden">
              {cartItems.map((item, index) => (
                <CartLineItem key={item.product.id} item={item} index={index} />
              ))}
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

function EmptyCart() {
  return (
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
  );
}
