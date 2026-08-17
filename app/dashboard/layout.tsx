import dynamic from "next/dynamic";
import { auth } from "@/auth";
import type { ReactNode } from "react";

const DashboardClient = dynamic(
  () => import("@/components/dashboard/DashboardClient"),
);

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return <DashboardClient user={session?.user}>{children}</DashboardClient>;
}
