"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiCheck, FiShoppingCart } from "react-icons/fi";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = !isOutOfStock && product.stock < 5;
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [justAdded]);

  function handleAddToCart() {
    if (isOutOfStock) return;
    onAddToCart?.(product);
    setJustAdded(true);
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl md:rounded-2xl border border-gray-200 bg-white shadow-sm duration-400 transition-all hover:-translate-y-1.5 hover:shadow-lg hover:shadow-gray-200/60 active:scale-[0.985]">
      <div className="relative h-[110px] md:h-[190px] xl:h-[220px] xl:w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {isOutOfStock && (
          <span className="absolute left-1.5 md:left-3 top-1.5 md:top-3 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-semibold text-red-600 shadow-sm">
            <span className="size-1.5 md:size-2 rounded-full bg-red-500" />
            Out of stock
          </span>
        )}

        {isLowStock && (
          <span className="absolute left-1.5 md:left-3 top-1.5 md:top-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-semibold text-amber-600 shadow-sm">
            <span className="size-1.5 md:size-2 rounded-full bg-amber-400" />
            Low Stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-0.5 md:gap-1 xl:gap-2 pt-0 p-2.5 md:p-4">
        <span className="text-[10px] md:text-xs font-medium uppercase tracking-wide text-orange-500">
          {product.category}
        </span>

        <h3 className="text-sm md:text-base xl:text-lg font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm md:text-xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || justAdded}
          aria-label={
            isOutOfStock
              ? `${product.name} is out of stock`
              : `Add ${product.name} to cart`
          }
          className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full py-2 md:py-3 text-xs md:text-sm font-semibold disabled:cursor-not-allowed ${
            justAdded
              ? "bg-orange-600 text-white cursor-pointer"
              : isOutOfStock
                ? "bg-gray-100 text-gray-400"
                : "bg-orange-500 text-white hover:shadow-md hover:shadow-orange-500/20 cursor-pointer"
          }`}
        >
          <span
            key={justAdded ? "added" : "add"}
            className="animate-pop-in flex items-center justify-center gap-2"
          >
            {justAdded ? (
              <>
                <FiCheck className="h-4 w-4" />
                Added to cart
              </>
            ) : (
              <>
                <FiShoppingCart className="h-4 w-4" />
                {isOutOfStock ? "Out of Stock" : "Add to cart"}
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
