"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy, Send, RefreshCw, MessageSquare, AlertCircle } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { formatPropertyPrice } from "@/lib/formatters";

const CONSULTATION_TYPES = [
  "Pembelian Properti",
  "Penyewaan Properti",
  "Konsultasi Pilihan Properti",
  "Informasi Portofolio",
] as const;

type ConsultationType = (typeof CONSULTATION_TYPES)[number];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  consultationType: ConsultationType;
  propertySlug: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  consultationType?: string;
  message?: string;
}

const INITIAL_FORM: FormValues = {
  name: "",
  email: "",
  phone: "",
  consultationType: "Pembelian Properti",
  propertySlug: "",
  message: "",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const prefillProperty = searchParams.get("property") || "";

  const [form, setForm] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    values: FormValues;
    formattedText: string;
    propertyTitle?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Apply query parameter prefill safely
  useEffect(() => {
    if (prefillProperty) {
      const match = PROPERTIES.find(
        (p) => p.slug === prefillProperty || p.id === prefillProperty
      );
      if (match) {
        setForm((prev) => ({
          ...prev,
          propertySlug: match.slug,
          consultationType: match.status === "disewa" ? "Penyewaan Properti" : "Pembelian Properti",
          message: prev.message || `Saya berminat untuk memperoleh informasi dan konsultasi mendalam mengenai ${match.title} (${match.location.area}, ${match.location.city}).`,
        }));
      }
    }
  }, [prefillProperty]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Alamat email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Format alamat email tidak valid (contoh: nama@domain.com).";
    }

    if (!form.consultationType) {
      newErrors.consultationType = "Silakan pilih jenis konsultasi.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Pesan konsultasi wajib diisi.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Pesan terlalu singkat (minimal 10 karakter).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateFormattedMessage = (values: FormValues): { text: string; propertyTitle?: string } => {
    const selectedProp = PROPERTIES.find((p) => p.slug === values.propertySlug);
    const dateFormatted = new Date().toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let msg = `=====================================\n`;
    msg += `NARA ESTATE — PERMOHONAN KONSULTASI\n`;
    msg += `Tanggal: ${dateFormatted}\n`;
    msg += `=====================================\n\n`;
    msg += `DATA PEMOHON:\n`;
    msg += `• Nama Lengkap: ${values.name.trim()}\n`;
    msg += `• Email: ${values.email.trim()}\n`;
    msg += `• Telepon: ${values.phone.trim() || "(Tidak dicantumkan)"}\n\n`;
    msg += `KLASIFIKASI KONSULTASI:\n`;
    msg += `• Jenis Konsultasi: ${values.consultationType}\n`;

    if (selectedProp) {
      const priceFmt = formatPropertyPrice(selectedProp.price, selectedProp.pricePeriod);
      msg += `• Properti Diminati: ${selectedProp.title} [${selectedProp.code}]\n`;
      msg += `• Lokasi: ${selectedProp.location.area}, ${selectedProp.location.city}\n`;
      msg += `• Nilai Penawaran: ${priceFmt} (${selectedProp.status === "dijual" ? "Dijual" : "Disewa"})\n`;
    } else {
      msg += `• Properti Diminati: Portofolio Umum / Konsultasi Terbuka\n`;
    }

    msg += `\nPESAN & PREFERENSI SPASIAL:\n`;
    msg += `"${values.message.trim()}"\n\n`;
    msg += `=====================================\n`;
    msg += `Format kuratorial siap disampaikan ke penasihat residensial privat NARA ESTATE.`;

    return { text: msg, propertyTitle: selectedProp?.title };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate instant client-side format compilation
    setTimeout(() => {
      const { text, propertyTitle } = generateFormattedMessage(form);
      setSubmittedData({
        values: { ...form },
        formattedText: text,
        propertyTitle,
      });
      setIsSubmitting(false);
    }, 300);
  };

  const handleCopy = async () => {
    if (!submittedData) return;
    try {
      await navigator.clipboard.writeText(submittedData.formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = submittedData.formattedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setForm(INITIAL_FORM);
    setErrors({});
    setCopied(false);
  };

  const demoWhatsApp = process.env.NEXT_PUBLIC_DEMO_WHATSAPP;
  const whatsAppUrl =
    demoWhatsApp && submittedData
      ? `https://wa.me/${demoWhatsApp.replace(/\D/g, "")}?text=${encodeURIComponent(
          submittedData.formattedText
        )}`
      : null;

  if (submittedData) {
    return (
      <div
        role="region"
        aria-label="Hasil Penyusunan Pesan Konsultasi"
        className="bg-white border border-sand-dark/80 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm"
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-sand-dark/40">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-widest text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Format Konsultasi Siap</span>
            </div>
            <h3 className="font-serif text-2xl text-ink font-semibold">
              Permohonan Konsultasi Berhasil Disusun
            </h3>
            <p className="text-xs font-sans text-ink-muted leading-relaxed">
              Platform ini beroperasi secara transparan tanpa pengiriman data latar belakang ke server.
              Pesan terstandar di bawah ini telah dikompilasi secara rapi dan siap disalin untuk disampaikan
              langsung ke kontak penasihat pribadi Anda.
            </p>
          </div>
        </div>

        {/* Formatted Text Box */}
        <div className="space-y-2">
          <label className="text-xs font-sans font-medium uppercase tracking-wider text-sage-dark block">
            Salinan Pesan Terstruktur (Monograf Format)
          </label>
          <pre className="p-4 bg-sand-light/60 border border-sand-dark/60 rounded-sm text-xs font-mono text-ink leading-relaxed whitespace-pre-wrap select-all overflow-x-auto max-h-[360px] overflow-y-auto">
            {submittedData.formattedText}
          </pre>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-limestone text-xs font-sans uppercase tracking-widest font-semibold hover:bg-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze"
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

          {whatsAppUrl && (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Kirim via WhatsApp Demo</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent border border-sand-dark/80 text-ink text-xs font-sans uppercase tracking-widest font-semibold hover:bg-sand/40 transition-colors focus:outline-none focus:ring-2 focus:ring-ink"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sage" />
            <span>Susun Pesan Baru</span>
          </button>
        </div>

        <div className="pt-4 border-t border-sand-dark/40 text-[11px] font-sans text-ink-muted/80 leading-relaxed italic">
          Catatan: NARA ESTATE mengutamakan diskresi tinggi. Seluruh data yang Anda masukkan hanya diproses
          secara lokal di browser Anda.
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-sand-dark/80 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm"
    >
      <div className="space-y-1 pb-4 border-b border-sand-dark/40">
        <h2 className="font-serif text-2xl text-ink font-semibold">
          Formulir Konsultasi Kuratorial
        </h2>
        <p className="text-xs font-sans text-ink-muted leading-relaxed">
          Silakan lengkapi formulir di bawah ini. Kami akan memformat preferensi Anda menjadi lembar konsultasi
          yang siap diteruskan ke penasihat arsitektural.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="name" className="text-xs font-sans font-semibold uppercase tracking-wider text-ink block">
            Nama Lengkap <span className="text-bronze">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-3.5 py-2.5 bg-sand-light/40 border text-sm font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-bronze rounded-none transition-colors ${
              errors.name ? "border-red-600 focus:border-red-600" : "border-sand-dark/70 focus:border-bronze"
            }`}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-red-700 flex items-center gap-1 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-sans font-semibold uppercase tracking-wider text-ink block">
            Alamat Email <span className="text-bronze">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="nama@domain.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-3.5 py-2.5 bg-sand-light/40 border text-sm font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-bronze rounded-none transition-colors ${
              errors.email ? "border-red-600 focus:border-red-600" : "border-sand-dark/70 focus:border-bronze"
            }`}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-700 flex items-center gap-1 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-sans font-semibold uppercase tracking-wider text-ink block">
            Nomor Telepon / WhatsApp <span className="text-sage text-[10px] font-normal lowercase">(opsional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+62 812 3456 7890"
            className="w-full px-3.5 py-2.5 bg-sand-light/40 border border-sand-dark/70 text-sm font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze rounded-none transition-colors"
          />
        </div>

        {/* Consultation Type */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="consultationType" className="text-xs font-sans font-semibold uppercase tracking-wider text-ink block">
            Jenis Konsultasi <span className="text-bronze">*</span>
          </label>
          <select
            id="consultationType"
            value={form.consultationType}
            onChange={(e) => setForm({ ...form, consultationType: e.target.value as ConsultationType })}
            className="w-full px-3.5 py-2.5 bg-sand-light/40 border border-sand-dark/70 text-sm font-sans text-ink focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze rounded-none transition-colors"
          >
            {CONSULTATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Property Selector */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="propertySlug" className="text-xs font-sans font-semibold uppercase tracking-wider text-ink block">
            Properti yang Diminati <span className="text-sage text-[10px] font-normal lowercase">(opsional)</span>
          </label>
          <select
            id="propertySlug"
            value={form.propertySlug}
            onChange={(e) => setForm({ ...form, propertySlug: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-sand-light/40 border border-sand-dark/70 text-sm font-sans text-ink focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze rounded-none transition-colors"
          >
            <option value="">-- Tanpa Properti Spesifik (Konsultasi Portofolio Umum) --</option>
            {PROPERTIES.map((prop) => (
              <option key={prop.id} value={prop.slug}>
                {prop.title} — {prop.location.area}, {prop.location.city} ({prop.status === "dijual" ? "Dijual" : "Disewa"})
              </option>
            ))}
          </select>
          {form.propertySlug && (
            <p className="text-[11px] font-sans text-bronze-dark pt-0.5">
              Properti terpilih akan disertakan rincian kode dan lokasinya secara otomatis ke dalam lembar konsultasi.
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-xs font-sans font-semibold uppercase tracking-wider text-ink block">
            Pesan &amp; Catatan Preferensi Spasial <span className="text-bronze">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Jelaskan kebutuhan ruang, kriteria lokasi, atau pertanyaan spesifik Anda..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full px-3.5 py-2.5 bg-sand-light/40 border text-sm font-sans text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-1 focus:ring-bronze rounded-none transition-colors resize-y ${
              errors.message ? "border-red-600 focus:border-red-600" : "border-sand-dark/70 focus:border-bronze"
            }`}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-700 flex items-center gap-1 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Submission CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-limestone text-xs font-sans uppercase tracking-widest font-semibold hover:bg-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-bronze disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Menyusun Lembar Konsultasi...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Susun Lembar Konsultasi</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-3 border-t border-sand-dark/40 text-[11px] font-sans text-ink-muted/80 leading-relaxed italic text-center">
        * Data Anda tidak disimpan ke peladen eksternal atau database publik.
      </div>
    </form>
  );
}
