import { auth } from "@/auth";
import type { ReactNode } from "react";
import { customer } from "@/components/data/customer";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <DashboardClient customer={customer} user={session?.user}>
      {children}
    </DashboardClient>
  );
}
