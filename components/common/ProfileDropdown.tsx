"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FiChevronDown, FiGrid, FiLogOut } from "react-icons/fi";
import { ProfileAvatar, type NavbarUser } from "@/shared/Navbar";

export function ProfileDropdown({ user }: { user: NavbarUser }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const handleWindowClick = () => {
      setIsOpen(false);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 py-1.5 pl-1.5 pr-2 text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white"
      >
        <ProfileAvatar image={user.image} name={user.name} size={30} />
        <FiChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          onClick={e => e.stopPropagation()}
          className="animate-menu-in absolute right-0 top-full z-50 mt-3 w-62 rounded-2xl bg-white p-2 text-gray-900 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 px-3 pb-3 pt-2">
            <ProfileAvatar image={user.image} name={user.name} size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.name ?? "My account"}
              </p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
            >
              <FiGrid className="h-4 w-4" />
              Dashboard
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors duration-200 hover:bg-red-50"
            >
              <FiLogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
