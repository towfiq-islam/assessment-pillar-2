"use client";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/common/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import { products } from "@/components/data/products";
const FILTERS = ["All", "Laptops", "Accessories", "Monitors"] as const;
type Filter = (typeof FILTERS)[number];

const AllProducts = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter(product => product.category === activeFilter);
  }, [activeFilter]);

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
                onClick={() => setActiveFilter(filter)}
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

      <div className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-scale-in"
            style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
