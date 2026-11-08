"use client";

import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu Navigasi Mobile"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-limestone p-6 md:hidden animate-in fade-in duration-300"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-sand-dark/40">
        <span className="font-serif text-xl tracking-widest text-ink font-semibold">
          NARA ESTATE
        </span>
        <button
          onClick={onClose}
          aria-label="Tutup menu navigasi"
          className="p-2 text-ink hover:text-bronze focus:outline-none focus:ring-2 focus:ring-bronze"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Primary Links */}
      <nav className="flex flex-col space-y-6 py-8">
        <Link
          href="/properties"
          onClick={onClose}
          className="font-serif text-2xl text-ink hover:text-bronze transition-colors flex items-center justify-between"
        >
          <span>Koleksi Properti</span>
          <ArrowRight className="w-5 h-5 text-sage" />
        </Link>
        <Link
          href="/agents"
          onClick={onClose}
          className="font-serif text-2xl text-ink hover:text-bronze transition-colors flex items-center justify-between"
        >
          <span>Penasihat Properti</span>
          <ArrowRight className="w-5 h-5 text-sage" />
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="font-serif text-2xl text-ink hover:text-bronze transition-colors flex items-center justify-between"
        >
          <span>Kontak & Konsultasi</span>
          <ArrowRight className="w-5 h-5 text-sage" />
        </Link>
        <Link
          href="/dashboard"
          onClick={onClose}
          className="font-serif text-2xl text-ink-muted hover:text-bronze transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span>Dashboard Preview</span>
            <span className="text-[10px] font-sans px-2 py-0.5 bg-sand text-ink rounded-none border border-sand-dark">
              Demo
            </span>
          </span>
          <ArrowRight className="w-5 h-5 text-sage" />
        </Link>
      </nav>

      {/* Footer Info in Drawer */}
      <div className="pt-6 border-t border-sand-dark/40 space-y-4">
        <p className="font-serif italic text-sm text-bronze">
          Find a place to belong.
        </p>
        <Link
          href="/contact"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-sans font-medium tracking-wide bg-ink text-limestone hover:bg-bronze transition-colors rounded-none"
        >
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}

