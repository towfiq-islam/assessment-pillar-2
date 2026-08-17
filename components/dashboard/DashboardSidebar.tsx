"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { ProfileAvatar, type NavbarUser } from "@/shared/Navbar";
import { sidebarLinks } from "./dashboardLinks";

interface DashboardSidebarProps {
  user?: NavbarUser;
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const avatar = user?.image;
  const name = user?.name ?? "My account";
  const email = user?.email;

  useEffect(() => {
    if (!isLogoutOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isLogoutOpen]);

  const handleConfirmLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="h-fit">
      {/* Profile */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <ProfileAvatar image={avatar} name={name} size={44} />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{name}</p>

          <p className="truncate text-xs text-gray-500">{email}</p>
        </div>
      </div>

      <ul className="flex flex-col gap-1.5 pt-3">
        {sidebarLinks?.map(link => {
          const isActive = pathname === link.path;

          return (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`relative flex items-center gap-3 rounded-full px-4 py-3 text-sm md:text-[15px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-primary-orange text-secondary-black"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {link.icon}
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout btn */}
      <button
        type="button"
        onClick={() => setIsLogoutOpen(true)}
        className="flex items-center gap-3 rounded-full px-4 py-3 text-[15px] cursor-pointer font-bold text-red-500 transition-colors w-full duration-200"
      >
        <FiLogOut className="h-4 w-4" />
        Log out
      </button>

      {/* Logout confirmation popup */}
      {isLogoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm logout"
        >
          <div
            className="animate-backdrop-in absolute inset-0 bg-black/50"
            onClick={() => setIsLogoutOpen(false)}
          />

          <div className="animate-pop-in relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <FiLogOut className="h-6 w-6 text-red-500" />
            </div>

            <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
              Log out?
            </h3>

            <p className="mt-1 text-center text-sm text-gray-500">
              Are you sure you want to log out of your account?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutOpen(false)}
                className="flex-1 cursor-pointer rounded-full border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 cursor-pointer rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-red-600 active:scale-[0.98]"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
