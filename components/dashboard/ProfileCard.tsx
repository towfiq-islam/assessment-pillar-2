"use client";
import Image from "next/image";
import { FiEdit2, FiMail, FiMapPin } from "react-icons/fi";
import type { CustomerProfile } from "@/types/customer";

interface ProfileCardProps {
  customer: CustomerProfile;
}

export function ProfileCard({ customer }: ProfileCardProps) {
  return (
    <div className="rounded-3xl bg-secondary-black p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/10">
          <Image
            src={customer.avatar}
            alt={customer.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-white">
            {customer.name}
          </p>
          <p className="text-sm text-white/40">
            Member since {customer.memberSince}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
        <div className="flex items-center gap-2 text-white/60">
          <FiMail className="h-4 w-4 shrink-0 text-primary-orange" />
          <span className="truncate">{customer.email}</span>
        </div>
        <div className="flex items-start gap-2 text-white/60">
          <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-orange" />
          <span>{customer.defaultAddress}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white/5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        <FiEdit2 className="h-3.5 w-3.5" />
        Edit profile
      </button>
    </div>
  );
}
