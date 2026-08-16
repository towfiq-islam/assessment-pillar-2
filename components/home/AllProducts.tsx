"use client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiPackage, FiRefreshCw } from "react-icons/fi";
import { ProductCard } from "@/components/common/ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import SectionTitle from "@/components/common/SectionTitle";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
type FetchStatus = "loading" | "success" | "error";
const FILTERS = ["All", "Laptops", "Accessories", "Monitors"];

const AllProducts = () => {
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [retryCount, setRetryCount] = useState(0);
  const filterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }

        if (!ignore) {
          setProducts(data as Product[]);
          setActiveFilter("All");
          setStatus("success");
        }
      } catch {
        if (!ignore) {
          setProducts([]);
          setStatus("error");
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [retryCount]);

  useEffect(() => {
    return () => {
      if (filterTimerRef.current) {
        clearTimeout(filterTimerRef.current);
      }
    };
  }, []);

  const handleFilterChange = (filter: string) => {
    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current);
    }
    setActiveFilter(filter);
    setStatus("loading");
    filterTimerRef.current = setTimeout(() => {
      filterTimerRef.current = null;
      setStatus("success");
    }, 500);
  };

  const handleRetry = () => {
    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current);
      filterTimerRef.current = null;
    }
    setStatus("loading");
    setRetryCount(count => count + 1);
  };

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter(product => product.category === activeFilter);

  const hasProducts = products.length > 0;

  return (
    <section className="container pt-7 md:pt-8 lg:pt-12 xl:pt-16 pb-10 md:pb-14 xl:pb-20">
      {/* Header */}
      <div className="mb-5.5 md:mb-8 xl:mb-12 flex flex-col items-start justify-between gap-4 md:gap-6 sm:flex-row sm:items-end">
        <div className="animate-fade-up">
          <SectionTitle>
            All <span className="text-primary-orange">Products</span>
          </SectionTitle>

          <p className="mt-1.5 md:mt-2 xl:mt-3 max-w-md text-sm md:text-[15px] md:leading-6 text-gray-500">
            Browse the current catalog — filter by category to find what
            you&apos;re looking for.
          </p>
        </div>

        {/* Filter */}
        <div
          className="animate-fade-up relative flex flex-wrap gap-1.5 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm shrink-0"
          style={{ animationDelay: "0.1s" }}
        >
          {FILTERS.map(filter => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                className={`relative rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {isActive && (
                  <span className="animate-fade-in absolute inset-0 rounded-full bg-primary-orange shadow-sm" />
                )}

                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div
          aria-busy="true"
          aria-label="Loading products"
          className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="animate-fade-in flex flex-col items-center justify-center rounded-xl md:rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 md:py-20 text-center shadow-sm">
          <span className="flex size-12 md:size-14 items-center justify-center rounded-full bg-red-50">
            <FiAlertTriangle className="size-6 md:size-7 text-red-500" />
          </span>

          <h3 className="mt-4 md:mt-5 text-lg md:text-xl font-semibold text-gray-900">
            Failed to load products
          </h3>

          <p className="mt-1.5 md:mt-2 max-w-md text-sm md:text-[15px] leading-6 text-gray-500">
            We couldn&apos;t fetch the product catalog right now. Please check
            your connection and try again.
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-5 md:mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary-orange px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
          >
            <FiRefreshCw className="size-4" />
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {status === "success" && filteredProducts.length === 0 && (
        <div className="animate-fade-in flex flex-col items-center justify-center rounded-xl md:rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 md:py-20 text-center shadow-sm">
          <span className="flex size-12 md:size-14 items-center justify-center rounded-full bg-gray-100">
            <FiPackage className="size-6 md:size-7 text-gray-400" />
          </span>

          <h3 className="mt-4 md:mt-5 text-lg md:text-xl font-semibold text-gray-900">
            {hasProducts ? "No products in this category" : "No products found"}
          </h3>

          <p className="mt-1.5 md:mt-2 max-w-md text-sm md:text-[15px] leading-6 text-gray-500">
            {hasProducts
              ? "There are no products matching the selected filter. Try another category."
              : "The catalog is currently empty. Check back soon — new products are on the way."}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mt-5 md:mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary-orange px-5 md:px-6 py-2.5 md:py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
          >
            <FiRefreshCw className="size-4" />
            Refresh
          </button>
        </div>
      )}

      {/* Products */}
      {status === "success" && filteredProducts.length > 0 && (
        <div className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-scale-in"
              style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProducts;
