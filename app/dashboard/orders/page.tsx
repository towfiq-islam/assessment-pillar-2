import SectionTitle from "@/components/common/SectionTitle";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { customerOrders } from "@/components/data/customer";

export default function OrdersPage() {
  return (
    <div>
      <div className="mb-5 md:mb-6">
        <SectionTitle>
          Order <span className="text-primary-orange">History</span>
        </SectionTitle>

        <p className="mt-0.5 md:mt-1 xl:mt-2 text-gray-500 text-sm md:text-base">
          All orders placed on your account.
        </p>
      </div>

      <RecentOrders
        orders={customerOrders}
        title="All Orders"
        showViewAll={false}
      />
    </div>
  );
}
