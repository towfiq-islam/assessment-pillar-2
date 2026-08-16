export default function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full animate-pulse flex-col overflow-hidden rounded-xl md:rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="relative h-[110px] w-full bg-gray-200 md:h-[190px] xl:h-[220px]" />

      <div className="flex flex-1 flex-col gap-2.5 p-2.5 pt-3 md:p-4 md:pt-4">
        <div className="h-2.5 w-16 rounded-full bg-gray-200" />
        <div className="h-3.5 w-3/4 rounded-full bg-gray-200" />
        <div className="h-3.5 w-1/2 rounded-full bg-gray-200" />
        <div className="mt-auto h-5 w-14 rounded-full bg-gray-200" />
        <div className="mt-1 h-9 w-full rounded-full bg-gray-200 md:h-11" />
      </div>
    </div>
  );
}
