export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-limestone">
      <div className="max-w-editorial w-full mx-auto space-y-6">
        <span className="text-xs uppercase tracking-[0.2em] text-sage font-medium">
          BEDI REAL ESTATE &mdash; M02.2
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-ink tracking-tight">
          NARA ESTATE
        </h1>
        <p className="text-base md:text-lg text-ink-muted italic font-serif">
          Find a place to belong.
        </p>
        <div className="pt-4 inline-flex items-center gap-2 px-4 py-2 bg-sand rounded-sm border border-sand-dark text-xs text-ink font-sans">
          <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
          <span>Fondasi Teknis & Sistem Desain Terverifikasi (Next.js App Router)</span>
        </div>
      </div>
    </main>
  );
}

