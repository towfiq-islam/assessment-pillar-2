import { customerOrders } from "@/components/data/customer";
import { RecentOrders } from "./RecentOrders";

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Order History</h1>
        <p className="mt-2 text-white/50">All orders placed on your account.</p>
      </div>

      <RecentOrders
        orders={customerOrders}
        title="All Orders"
        showViewAll={false}
      />
    </div>
  );
}
