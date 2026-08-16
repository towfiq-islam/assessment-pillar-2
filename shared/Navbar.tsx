"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FiGrid, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import logo from "@/assets/logo.png";
import { NavLinks, type NavLink } from "@/components/data/navLinks";
import { DashboardDrawer } from "@/shared/DashboardDrawer";
import { ProfileDropdown } from "@/components/common/ProfileDropdown";
import type { CustomerProfile } from "@/types/customer";
import { CartButton } from "@/components/common/CartButton";

export type NavbarUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

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

export function ProfileAvatar({
  image,
  name,
  size = 28,
}: {
  image?: string | null;
  name?: string | null;
  size?: number;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name ?? "User avatar"}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-primary-orange text-white"
      style={{ width: size, height: size }}
    >
      <FiUser size={Math.round(size * 0.55)} />
    </span>
  );
}

interface NavbarProps {
  customer?: CustomerProfile;
  user?: NavbarUser;
}

export default function Navbar({ customer, user }: NavbarProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    <nav className="sticky top-3 xl:top-3.5 z-50">
      {/*  Desktop */}
      <div className="nav-fade hidden lg:max-w-[94%] xl:max-w-7xl lg:mx-auto lg:px-3 lg:py-2.5 lg:flex items-center justify-between rounded-full bg-secondary-black text-white gap-5 xl:gap-20">
        <ul className="w-full flex justify-between items-center flex-1">
          {NavLinks?.slice(0, 3)?.map(link => (
            <NavItem
              key={link.label}
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
              key={link.label}
              link={link}
              isActive={pathname === link.path}
            />
          ))}
        </ul>

        <div className="ml-3 xl:ml-5 flex shrink-0 items-center gap-2">
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full border border-white/10 px-3 xl:px-4 py-2.5 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white"
            >
              <FiUser size={17} />
              <span>Login</span>
            </Link>
          )}

          <CartButton />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden relative max-w-[94%] mx-auto">
        <div className="nav-fade relative z-40 flex items-center justify-between rounded-full bg-secondary-black text-white px-3 py-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="logo"
              className="w-20 rounded-full object-contain"
            />
          </Link>

          <div className="flex gap-0.5 items-center">
            <CartButton />
            <button
              type="button"
              aria-expanded={isMenuOpen || isDrawerOpen}
              aria-label={
                isMenuOpen || isDrawerOpen ? "Close menu" : "Open menu"
              }
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
        </div>

        {!isDashboard && isMenuOpen && (
          <div
            className="fixed inset-0 z-30"
            onClick={closeMenus}
            aria-hidden="true"
          />
        )}

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

                  {user ? (
                    <div
                      className="animate-fade-up mt-2 border-t border-white/10 px-4 pt-3"
                      style={{
                        animationDelay: `${0.05 + NavLinks.length * 0.05}s`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <ProfileAvatar
                          image={user.image}
                          name={user.name}
                          size={40}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {user.name ?? "My account"}
                          </p>
                          <p className="truncate text-xs text-white/60">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <Link
                          href="/dashboard"
                          onClick={closeMenus}
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-orange px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 active:scale-[0.98]"
                        >
                          <FiGrid size={16} />
                          Dashboard
                        </Link>

                        <button
                          type="button"
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:text-white"
                        >
                          <FiLogOut size={16} />
                          Log out
                        </button>
                      </div>
                    </div>
                  ) : (
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
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <DashboardDrawer
          isOpen={isDrawerOpen && isDashboard}
          pathname={pathname}
          user={user}
          customer={customer}
          onClose={closeMenus}
        />
      </div>
    </nav>
  );
}
