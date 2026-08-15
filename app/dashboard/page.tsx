"use client";
import SectionTitle from "@/components/common/SectionTitle";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { StatCard } from "@/components/dashboard/StatCard";
import { customer, customerOrders } from "@/components/data/customer";
import { FiClock, FiDollarSign, FiPackage } from "react-icons/fi";

export default function DashboardOverviewPage() {
  const totalOrders = customerOrders.length;

  const pendingOrders = customerOrders.filter(
    o => o.status === "Processing" || o.status === "Shipped",
  ).length;

  const totalSpent = customerOrders
    .filter(o => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <div className="mb-5 md:mb-6">
        <SectionTitle>
          Welcome back,{" "}
          <span className="text-primary-orange">
            {customer.name.split(" ")[0]}
          </span>
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

      <RecentOrders orders={customerOrders.slice(0, 4)} />
    </div>
  );
}
