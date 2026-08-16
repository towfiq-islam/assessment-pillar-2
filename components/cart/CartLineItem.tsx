"use client";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import type { CartItem } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";

interface CartLineItemProps {
  item: CartItem;
  index?: number;
}

export function CartLineItem({ item, index = 0 }: CartLineItemProps) {
  const { product, quantity } = item;
  const updateQty = useCartStore(state => state.updateQty);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  const maxQty = product.stock;
  const atMaxQty = quantity >= maxQty;

  return (
    <div
      className="animate-slide-in-right flex gap-4 border-b border-gray-200 p-3 hover:bg-gray-50 last:border-b-0 sm:gap-6"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Product Image */}
      <figure className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </figure>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
              {product.category}
            </span>

            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
              {product.name}
            </h3>

            <p className="mt-1 text-sm font-semibold text-gray-600">
              ${product.price}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            aria-label={`Remove ${product.name} from cart`}
            className="shrink-0 rounded-full p-2 text-gray-400 transition-[transform,background-color,color] duration-200 hover:bg-orange-50 hover:text-orange-500 active:scale-90 cursor-pointer"
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
            <button
              type="button"
              onClick={() => updateQty(product.id, quantity - 1)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition-[transform,background-color,color] duration-200 hover:bg-gray-200 hover:text-gray-900 active:scale-75 cursor-pointer"
            >
              <FiMinus className="h-3 w-3" />
            </button>

            <span className="w-4 text-center text-sm font-semibold text-gray-900">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQty(product.id, quantity + 1)}
              disabled={atMaxQty}
              aria-label={`Increase quantity of ${product.name}`}
              className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition-[transform,background-color,color] duration-200 hover:bg-gray-200 hover:text-gray-900 active:scale-75 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiPlus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
