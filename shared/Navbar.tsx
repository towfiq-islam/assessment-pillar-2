"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { sidebarLinks } from "@/components/dashboard/dashboardLinks";
import type { CustomerProfile } from "@/types/customer";

type NavLink = {
  label: string;
  path: string;
};

const NavLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "" },
  { label: "Service", path: "" },
  { label: "Resume", path: "" },
  { label: "Project", path: "" },
  { label: "Contact", path: "" },
];

function NavItem({ link, isActive }: { link: NavLink; isActive: boolean }) {
  return (
    <Link
      href={link.path}
      className={`rounded-full hover:bg-[#333] px-5 xl:px-7 py-2.5 xl:py-3 xl:text-[17px] font-semibold transition-colors duration-200 ${
        isActive ? "bg-primary-orange" : "text-white/80 hover:text-white"
      }`}
    >
      {link.label}
    </Link>
  );
}

// Mobile
function MobileNavItem({
  link,
  isActive,
  onNavigate,
}: {
  link: NavLink;
  isActive: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={link.path}
      onClick={onNavigate}
      className={`flex items-center justify-center text-[15px] font-semibold transition-colors duration-200 ${
        isActive
          ? "mx-2 mt-1 mb-2 rounded-full bg-primary-orange py-2.5 text-white"
          : "py-3 text-white/70 hover:text-white"
      }`}
    >
      {link.label}
    </Link>
  );
}

interface NavbarProps {
  customer?: CustomerProfile;
}

export default function Navbar({ customer }: NavbarProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (!isDrawerOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isDrawerOpen]);

  return (
    <nav ref={navRef} className="sticky top-3 xl:top-3.5 z-50">
      {/*  Desktop */}
      <div className="nav-fade hidden lg:max-w-[94%] xl:max-w-7xl lg:mx-auto lg:p-2.5 lg:flex items-center justify-between rounded-full bg-secondary-black text-white gap-5 xl:gap-20">
        <ul className="w-full flex justify-between items-center flex-1">
          {NavLinks?.slice(0, 3)?.map(link => (
            <NavItem
              key={link.path}
              link={link}
              isActive={pathname === link.path}
            />
          ))}
        </ul>

        <Link href="/" className="shrink-0">
          <Image src={logo} alt="logo" className="object-contain" />
        </Link>

        <ul className="w-full flex justify-between items-center flex-1">
          {NavLinks?.slice(3)?.map(link => (
            <NavItem
              key={link.path}
              link={link}
              isActive={pathname === link.path}
            />
          ))}
        </ul>

        <div className="ml-3 xl:ml-5 flex shrink-0 items-center gap-2">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full border border-white/10 px-3 xl:px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white"
          >
            <FiUser size={17} />
            <span>Login</span>
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="relative flex size-9.5 xl:size-10 items-center justify-center rounded-full bg-primary-orange text-white shadow-[0_4px_20px_rgba(255,107,53,0.25)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_6px_25px_rgba(255,107,53,0.4)] active:scale-95"
          >
            <FiShoppingBag size={18} />
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden relative max-w-[94%] mx-auto">
        <div className="nav-fade flex items-center justify-between rounded-full bg-secondary-black text-white px-3 py-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="logo"
              className="w-20 rounded-full object-contain"
            />
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen || isDrawerOpen}
            aria-label={isMenuOpen || isDrawerOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              if (isDashboard) {
                setIsDrawerOpen(prev => !prev);
              } else {
                setIsMenuOpen(prev => !prev);
              }
            }}
            className="relative flex size-9 items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:bg-[#333] hover:text-white cursor-pointer"
          >
            <span
              key={isMenuOpen || isDrawerOpen ? "close" : "menu"}
              className="animate-icon-swap flex items-center justify-center"
            >
              {isMenuOpen || isDrawerOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
              )}
            </span>
          </button>
        </div>

        {!isDashboard && (
          <div className="absolute inset-x-0 top-full z-40 mt-2">
            {isMenuOpen && (
              <div className="animate-menu-in">
                <div className="flex flex-col rounded-3xl bg-secondary-black py-2 text-white shadow-2xl shadow-black/40">
                  {NavLinks.map((link, i) => (
                    <div
                      key={link.path}
                      className="animate-fade-up"
                      style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                    >
                      <MobileNavItem
                        link={link}
                        isActive={pathname === link.path}
                        onNavigate={closeMenus}
                      />
                    </div>
                  ))}

                  <div
                    className="animate-fade-up mt-2 flex items-center justify-center gap-3 border-t border-white/10 px-4 pt-3"
                    style={{
                      animationDelay: `${0.05 + NavLinks.length * 0.05}s`,
                    }}
                  >
                    <Link
                      href="/login"
                      onClick={closeMenus}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white"
                    >
                      <FiUser size={17} />
                      <span>Login</span>
                    </Link>

                    <Link
                      href="/cart"
                      onClick={closeMenus}
                      aria-label="Shopping cart"
                      className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-orange text-white shadow-[0_4px_20px_rgba(255,107,53,0.25)] transition-transform duration-200 active:scale-90"
                    >
                      <FiShoppingBag size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isDashboard && isDrawerOpen && (
          <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard menu"
          >
            {/* Backdrop */}
            <div
              className="animate-backdrop-in absolute inset-0 bg-black/40 backdrop-blur-xs"
              onClick={closeMenus}
            />

            <div className="animate-drawer-in absolute inset-y-0 left-0 flex w-64 md:w-68 max-w-[85vw] flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {customer?.name ?? "My account"}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {customer?.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMenus}
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
                            onClick={closeMenus}
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
                  className="mt-3 flex items-center gap-3 rounded-full px-4 py-3 text-[15px] font-semibold cursor-pointer transition-colors duration-200 text-red-500"
                >
                  <FiLogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
