"use client";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { FiClock, FiDollarSign, FiPackage } from "react-icons/fi";
import SectionTitle from "@/components/common/SectionTitle";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrdersSkeleton } from "@/components/dashboard/RecentOrdersSkeleton";
import { useOrdersStore } from "@/store/ordersStore";

const RecentOrders = dynamic(
  () =>
    import("@/components/dashboard/RecentOrders").then(m => m.RecentOrders),
  {
    ssr: false,
    loading: () => <RecentOrdersSkeleton />,
  },
);

export default function DashboardOverviewPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0];
  const orders = useOrdersStore(state => state.orders);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    o => o.status === "Processing" || o.status === "Shipped",
  ).length;

  const totalSpent = orders
    .filter(o => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <SectionTitle>
          {firstName ? (
            <>
              Welcome back,{" "}
              <span className="text-primary-orange">{firstName}</span>
            </>
          ) : (
            "Welcome back"
          )}
        </SectionTitle>

        <p className="mt-0.5 md:mt-1 xl:mt-2 text-gray-500 text-sm md:text-base">
          Here&apos;s what&apos;s happening with your account.
        </p>
      </div>

      <div className="mb-5 xl:mb-6 grid grid-cols-1 gap-3.5 md:gap-5 sm:grid-cols-3">
        <StatCard
          label="Total orders"
          value={String(totalOrders)}
          icon={<FiPackage className="h-5 w-5" />}
        />

        <StatCard
          label="In progress"
          value={String(pendingOrders)}
          icon={<FiClock className="h-5 w-5" />}
        />

        <StatCard
          label="Total spent"
          value={`$${totalSpent}`}
          icon={<FiDollarSign className="h-5 w-5" />}
        />
      </div>

      <RecentOrders orders={orders.slice(0, 4)} />
    </div>
  );
}
