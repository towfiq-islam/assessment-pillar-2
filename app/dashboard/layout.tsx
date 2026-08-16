import type { ReactNode } from "react";
import { auth } from "@/auth";
import { customer } from "@/components/data/customer";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <DashboardShell customer={customer} user={session?.user}>
      {children}
    </DashboardShell>
  );
}
