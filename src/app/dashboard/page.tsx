import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Database } from "lucide-react";
import { PortfolioDashboard } from "@/components/dashboard/PortfolioDashboard";

export const metadata: Metadata = {
  title: "Dashboard Portofolio | NARA ESTATE",
  description:
    "Ikhtisar interaktif dan analisis distribusi portofolio 12 residensi arsitektural NARA ESTATE di Indonesia.",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-limestone text-ink pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="max-w-editorial mx-auto px-5 md:px-8 space-y-10 md:space-y-12">
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-sage hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Properti</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-sand-dark/60">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sand/70 border border-sand-dark/80 rounded-none text-[11px] font-sans font-semibold uppercase tracking-widest text-ink">
                <LayoutDashboard className="w-3.5 h-3.5 text-bronze-dark" />
                <span>Simulasi Kurasi Portofolio</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-semibold tracking-tight">
                Dashboard Portofolio Residensi.
              </h1>
              <p className="text-sm font-sans text-ink-muted leading-relaxed">
                Eksplorasi analitik komprehensif atas portofolio 12 hunian arsitektural NARA ESTATE.
                Visualisasi metrik mencakup status transaksi, distribusi tipologi arsitektur, dan sebaran geografis.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono text-sage-dark bg-white px-3.5 py-2 border border-sand-dark/70 rounded-sm">
              <Database className="w-3.5 h-3.5 text-bronze" />
              <span>Sumber Data: 12 Unit Terverifikasi</span>
            </div>
          </div>
        </div>

        {/* Interactive Dashboard Engine Component */}
        <PortfolioDashboard />
      </div>
    </main>
  );
}
