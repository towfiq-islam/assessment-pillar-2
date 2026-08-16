import { selectCartCount, useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi";

export function CartButton({ onNavigate }: { onNavigate?: () => void }) {
  const cartCount = useCartStore(selectCartCount);

  return (
    <Link
      href="/cart"
      onClick={onNavigate}
      aria-label="Shopping cart"
      className="relative flex size-9.5 xl:size-10 shrink-0 items-center justify-center rounded-full border border-transparent md:border-gray-700 text-white duration-300 text-2xl md:text-xl"
    >
      <HiOutlineShoppingBag />
      {cartCount > 0 && (
        <span className="absolute -right-0.5 md:-right-1 -top-0.5 md:-top-1 flex size-4 md:size-5 items-center justify-center rounded-full bg-primary-orange px-1 text-[10px] font-bold text-white">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}
