"use client";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { CartOrderSummary } from "@/components/cart/CartOrderSummary";
import SectionTitle from "@/components/common/SectionTitle";

export default function CheckoutPage() {
  return (
    <main className="container pt-8 md:pt-10 pb-10 md:pb-16">
      <div className="mx-auto max-w-5xl">
        <div>
          <div className="animate-fade-up">
            <Link
              href="/cart"
              className="mb-1 md:mb-3 flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-orange-500"
            >
              <FiArrowLeft className="h-3.5 w-3.5" />
              Back to cart
            </Link>
          </div>

          <div
            className="animate-fade-up mb-5 md:mb-7"
            style={{ animationDelay: "0.1s" }}
          >
            <SectionTitle>Checkout</SectionTitle>
            <p className="mt-1 md:mt-2 text-[15px] text-gray-500">
              Complete your information to place your order.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 md:space-y-6 lg:col-span-2">
            <ShippingForm />
          </div>

          <div className="lg:col-span-1">
            <CartOrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
