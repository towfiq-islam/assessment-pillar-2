export function RecentOrdersSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading orders"
      className="animate-pulse rounded-xl md:rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-5 h-5 w-32 rounded-full bg-gray-200" />

      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-b-0"
        >
          <div className="space-y-2">
            <div className="h-4 w-20 rounded-full bg-gray-200" />
            <div className="h-3 w-28 rounded-full bg-gray-200" />
          </div>

          <div className="space-y-2 text-right">
            <div className="h-4 w-16 rounded-full bg-gray-200" />
            <div className="h-3 w-12 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
