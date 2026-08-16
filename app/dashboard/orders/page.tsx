"use client";
import SectionTitle from "@/components/common/SectionTitle";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { useOrdersStore } from "@/store/ordersStore";

export default function OrdersPage() {
  const orders = useOrdersStore(state => state.orders);

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <SectionTitle>
          Order <span className="text-primary-orange">History</span>
        </SectionTitle>

        <p className="mt-0.5 md:mt-1 xl:mt-2 text-gray-500 text-sm md:text-base">
          Orders placed from your account.
        </p>
      </div>

      <RecentOrders
        orders={orders}
        title="All Orders"
        showViewAll={false}
      />
    </div>
  );
}
