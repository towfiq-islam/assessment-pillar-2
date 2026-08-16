"use client";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { CustomerOrder } from "@/types/customer";

interface RecentOrdersProps {
  orders: CustomerOrder[];
  title?: string;
  showViewAll?: boolean;
}

export function RecentOrders({
  orders,
  title = "Recent Orders",
  showViewAll = true,
}: RecentOrdersProps) {
  return (
    <div className="rounded-xl md:rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-2 md:mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        {showViewAll && (
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-primary-orange transition-opacity hover:opacity-80"
          >
            View all
          </Link>
        )}
      </div>

      {/* Desktop header row */}
      {orders.length > 0 && (
        <div className="hidden grid-cols-[1fr_1fr_0.7fr_1fr_auto] gap-4 border-b border-gray-200 pb-3 text-xs uppercase tracking-wide text-gray-400 sm:grid">
          <span>Order</span>
          <span>Date</span>
          <span>Items</span>
          <span className="text-right">Total</span>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm font-medium text-gray-900">No orders yet</p>
          <p className="mt-1 text-sm text-gray-500">
            Add items to your cart and checkout to see them here.
          </p>
        </div>
      ) : (
        <ul>
          {orders.map(order => (
          <li
            key={order.id}
            className="border-b border-gray-100 py-3 md:py-4 last:border-b-0 sm:grid sm:grid-cols-[1fr_1fr_0.7fr_1fr_auto] sm:items-center sm:gap-4"
          >
            {/* Mobile */}
            <div className="flex items-start justify-between sm:hidden">
              <div>
                <p className="font-medium text-gray-900">{order.id}</p>
                <p className="mt-0.5 text-sm text-gray-500">{order.date}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${order.total}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            {/* Desktop */}
            <span className="hidden font-medium text-gray-900 sm:inline">
              {order.id}
            </span>

            <span className="hidden text-sm text-gray-500 sm:inline">
              {order.date}
            </span>

            <span className="hidden text-sm text-gray-500 sm:inline">
              {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
            </span>

            <span className="hidden text-right font-semibold text-gray-900 sm:inline">
              ${order.total}
            </span>

            <Link
              href={`/dashboard/orders/${order.id}`}
              className="hidden items-center justify-center rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-primary-orange sm:flex"
            >
              <FiArrowUpRight className="h-4 w-4" />
            </Link>
          </li>
        ))}
        </ul>
      )}
    </div>
  );
}
