"use client";

import { useState } from "react";
import { Copy, Check, MessageSquare, PhoneCall, ShieldCheck } from "lucide-react";
import type { Property } from "@/types/property";
import { formatPropertyPrice } from "@/lib/formatters";
import {
  buildInquiryMessageText,
  buildWhatsAppPropertyInquiryUrl,
} from "@/lib/whatsapp";

interface PropertyConsultationCardProps {
  property: Property;
}

export function PropertyConsultationCard({ property }: PropertyConsultationCardProps) {
  const [copied, setCopied] = useState(false);

  const formattedPrice = formatPropertyPrice(
    property.price,
    property.pricePeriod
  );

  const inquiryMessage = buildInquiryMessageText(property);

  // Optional demo number from environment variable (conditional WhatsApp integration)
  const demoPhoneNumber = process.env.NEXT_PUBLIC_DEMO_WHATSAPP || null;
  const whatsAppUrl = demoPhoneNumber
    ? buildWhatsAppPropertyInquiryUrl({
        property,
        phone: demoPhoneNumber,
      })
    : null;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(inquiryMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = inquiryMessage;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <aside
      aria-label="Konsultasi Properti"
      className="bg-white border border-sand-dark/80 rounded-sm p-6 md:p-7 shadow-sm space-y-6"
    >
      {/* Price & Listing Status Badge */}
      <div className="space-y-1.5 pb-5 border-b border-sand-dark/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-sans uppercase tracking-widest text-sage-dark font-medium">
            Penawaran Eksklusif
          </span>
          <span
            className={`px-2.5 py-0.5 text-[11px] font-sans uppercase tracking-wider font-semibold rounded-none ${
              property.status === "dijual"
                ? "bg-ink text-limestone"
                : "bg-bronze text-ink"
            }`}
          >
            {property.status === "dijual" ? "Dijual" : "Disewa"}
          </span>
        </div>
        <p className="text-2xl md:text-3xl font-serif font-bold text-ink tabular-nums leading-tight">
          {formattedPrice}
        </p>
        <p className="text-xs font-sans text-ink-muted">
          Lokasi: {property.location.area}, {property.location.city}
        </p>
      </div>

      {/* Institutional Consultation Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-ink">
          <ShieldCheck className="w-4 h-4 text-bronze" />
          <h3 className="text-sm font-sans font-semibold uppercase tracking-wider">
            NARA ESTATE — Konsultasi Portofolio
          </h3>
        </div>
        <p className="text-xs font-sans text-ink-muted leading-relaxed">
          Layanan kurasi privat, asistensi legalitas, serta koordinasi jadwal inspeksi arsitektural.
        </p>
      </div>

      {/* Pre-formatted Inquiry Message Box */}
      <div className="space-y-2">
        <label
          htmlFor="inquiry-preview"
          className="text-[11px] font-sans uppercase tracking-wider text-sage-dark flex items-center justify-between"
        >
          <span>Pesan Minat Terstandar</span>
          <span className="text-[10px] text-ink-muted/70">Format Kuratorial</span>
        </label>
        <div
          id="inquiry-preview"
          className="p-3.5 bg-sand-light/40 border border-sand-dark/50 rounded-sm text-xs font-sans text-ink leading-relaxed select-all"
        >
          {inquiryMessage}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        {/* Copy Inquiry Message Button */}
        <button
          type="button"
          onClick={handleCopyMessage}
          aria-label="Salin pesan konsultasi ke papan klip"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-ink hover:bg-ink-light text-limestone text-xs font-sans uppercase tracking-widest font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bronze"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Tersalin ke Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin Pesan Konsultasi</span>
            </>
          )}
        </button>

        {/* Conditional WhatsApp Button */}
        {whatsAppUrl ? (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lanjutkan konsultasi melalui WhatsApp resmi demo"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-sans uppercase tracking-widest font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Kirim via WhatsApp Demo</span>
          </a>
        ) : (
          <div className="p-3 bg-limestone/80 border border-sand-dark/40 rounded-sm text-center">
            <p className="text-[11px] font-sans text-ink-muted leading-relaxed">
              Silakan salin pesan di atas untuk disampaikan langsung ke perwakilan penasihat privat Anda.
            </p>
          </div>
        )}
      </div>

      {/* Curatorial Showcase Simulation Disclaimer */}
      <div className="pt-4 border-t border-sand-dark/40 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[10px] font-sans font-medium uppercase tracking-wider text-sage-dark">
          <PhoneCall className="w-3 h-3 text-sage" />
          <span>Informasi Layanan</span>
        </div>
        <p className="text-[11px] font-sans text-ink-muted/80 leading-relaxed italic">
          Seluruh interaksi pada platform ini merupakan simulasi kuratorial portofolio NARA ESTATE untuk keperluan showcase arsitektur dan penemuan hunian premium.
        </p>
      </div>
    </aside>
  );
}
