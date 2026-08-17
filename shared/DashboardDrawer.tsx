"use client";
import Link from "next/link";
import { FiLoader, FiLogOut, FiX } from "react-icons/fi";
import { sidebarLinks } from "@/components/dashboard/dashboardLinks";
import { ProfileAvatar, type NavbarUser } from "@/shared/Navbar";
import { useLogout } from "@/hooks/useLogout";

interface DashboardDrawerProps {
  isOpen: boolean;
  pathname: string;
  user?: NavbarUser;
  onClose: () => void;
}

export function DashboardDrawer({
  isOpen,
  pathname,
  user,
  onClose,
}: DashboardDrawerProps) {
  const { isLogoutPending, handleLogout } = useLogout();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Dashboard menu"
    >
      {/* Backdrop */}
      <div
        className="animate-backdrop-in absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="animate-drawer-in absolute inset-y-0 left-0 flex w-64 md:w-68 max-w-[85vw] flex-col bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-gray-200 p-5">
          <ProfileAvatar image={user?.image} name={user?.name} size={40} />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user?.name ?? "My account"}
            </p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <nav>
            <ul className="flex flex-col gap-1.5">
              {sidebarLinks?.map(link => {
                const isActive = pathname === link.path;

                return (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-primary-orange text-black"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLogoutPending}
            className="mt-3 flex items-center gap-3 rounded-full px-4 py-3 text-[15px] font-semibold cursor-pointer transition-colors duration-200 text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLogoutPending ? (
              <FiLoader className="h-4 w-4 animate-spin" />
            ) : (
              <FiLogOut className="h-4 w-4" />
            )}
            {isLogoutPending ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>
    </div>
  );
}
