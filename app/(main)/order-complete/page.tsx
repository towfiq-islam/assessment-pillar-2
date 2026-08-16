"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiPackage } from "react-icons/fi";
import { useOrdersStore } from "@/store/ordersStore";
import SectionTitle from "@/components/common/SectionTitle";

export default function OrderConfirmPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmContent />
    </Suspense>
  );
}

function OrderConfirmContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const orders = useOrdersStore(state => state.orders);
  const order = orders.find(o => o.id === orderId);

  return (
    <div className="container pt-8 md:pt-12 pb-10 md:pb-20">
      <div className="mx-auto max-w-xl text-center">
        {order ? (
          <>
            <div className="animate-fade-up mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <FiCheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <div
              className="animate-fade-up mt-6"
              style={{ animationDelay: "0.1s" }}
            >
              <SectionTitle>
                Order <span className="text-orange-500">Confirmed</span>
              </SectionTitle>

              <p className="mt-2 text-[15px] text-gray-500">
                Thank you! Your order has been placed successfully. A
                confirmation has been sent to your email.
              </p>
            </div>

            <div
              className="animate-fade-up mt-8 rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="font-semibold text-gray-900">{order.id}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <span className="text-sm text-gray-500">Date</span>
                <span className="font-medium text-gray-900">{order.date}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <span className="text-sm text-gray-500">Items</span>
                <span className="font-medium text-gray-900">
                  {order.itemsCount}{" "}
                  {order.itemsCount === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  ${order.total}
                </span>
              </div>
            </div>

            <div
              className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/dashboard/orders"
                className="w-full rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 sm:w-auto"
              >
                View Order
              </Link>

              <Link
                href="/"
                className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 sm:w-auto"
              >
                Continue shopping
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="animate-fade-up mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
              <FiPackage className="h-10 w-10 text-orange-500" />
            </div>

            <div
              className="animate-fade-up mt-6"
              style={{ animationDelay: "0.1s" }}
            >
              <SectionTitle>No order found</SectionTitle>

              <p className="mt-2 text-[15px] text-gray-500">
                We couldn&apos;t find a matching order. Please place an order
                from your cart.
              </p>
            </div>

            <Link
              href="/"
              className="animate-fade-up mt-8 inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20"
            >
              Browse products
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
