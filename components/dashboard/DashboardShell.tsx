"use client";
import type { ReactNode } from "react";
import type { CustomerProfile } from "@/types/customer";
import Navbar from "@/shared/Navbar";
import { DashboardSidebar } from "./DashboardSidebar";

interface DashboardShellProps {
  customer: CustomerProfile;
  children: ReactNode;
}

export default function DashboardShell({
  customer,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen">
      <Navbar customer={customer} />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 xl:gap-8 lg:flex-row px-4 sm:px-6 lg:px-10 py-8.5 md:py-10 lg:py-12 xl:py-14 items-start">
        <aside className="hidden w-[260px] shrink-0 rounded-2xl border border-gray-200 bg-white p-4 xl:p-5 shadow-sm lg:sticky top-30 xl:top-32 lg:block">
          <DashboardSidebar customer={customer} />
        </aside>

        <main className="w-full flex-1">{children}</main>
      </div>
    </div>
  );
}
