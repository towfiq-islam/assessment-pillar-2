import type { ReactNode } from "react";
import { customer } from "@/components/data/customer";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell customer={customer}>{children}</DashboardShell>;
}
