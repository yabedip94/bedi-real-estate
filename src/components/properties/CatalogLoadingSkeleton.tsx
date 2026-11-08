export function CatalogLoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat katalog properti..."
      className="w-full space-y-8 animate-pulse"
    >
      {/* Filter Bar Skeleton */}
      <div className="bg-white border border-sand-dark/40 p-5 space-y-4">
        <div className="h-10 w-full bg-sand/60 rounded-none" />
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-sand/40 rounded-none" />
          ))}
        </div>
      </div>

      {/* Toolbar Skeleton (Result Counter + Sort) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand-dark/30">
        <div className="h-5 w-48 bg-sand-dark/30 rounded-none" />
        <div className="h-9 w-44 bg-sand-dark/20 rounded-none" />
      </div>

      {/* Grid Skeleton (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-sand-dark/40 overflow-hidden flex flex-col space-y-4 p-0 pb-5"
          >
            <div className="aspect-[4/3] w-full bg-sand/60" />
            <div className="px-5 space-y-3">
              <div className="h-3 w-1/3 bg-sand-dark/30 rounded-none" />
              <div className="h-5 w-4/5 bg-sand-dark/30 rounded-none" />
              <div className="h-5 w-2/5 bg-sand-dark/40 rounded-none" />
              <div className="pt-3 border-t border-sand-dark/30 flex justify-between">
                <div className="h-3 w-16 bg-sand-dark/20 rounded-none" />
                <div className="h-3 w-16 bg-sand-dark/20 rounded-none" />
                <div className="h-3 w-16 bg-sand-dark/20 rounded-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

