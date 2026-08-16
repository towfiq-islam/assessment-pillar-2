import { selectCartCount, useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

export function CartButton({ onNavigate }: { onNavigate?: () => void }) {
  const cartCount = useCartStore(selectCartCount);

  return (
    <Link
      href="/cart"
      onClick={onNavigate}
      aria-label="Shopping cart"
      className="relative flex size-9.5 xl:size-10 shrink-0 items-center justify-center rounded-full bg-primary-orange text-white shadow-[0_4px_20px_rgba(255,107,53,0.25)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_6px_25px_rgba(255,107,53,0.4)] active:scale-95"
    >
      <FiShoppingBag size={18} />

      {cartCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-5 h-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}
