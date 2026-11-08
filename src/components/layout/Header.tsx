"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-limestone/90 backdrop-blur-md border-b border-sand-dark/40 shadow-sm py-4"
            : "bg-transparent border-b border-sand-dark/20 py-6"
        }`}
      >
        <div className="max-w-editorial mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
          >
            <span className="font-serif text-2xl tracking-[0.2em] uppercase font-bold text-ink group-hover:text-bronze transition-colors">
              NARA ESTATE
            </span>
            <span className="text-[10px] font-serif italic text-sage tracking-wider">
              Find a place to belong.
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-sans font-medium">
            <Link
              href="/properties"
              className={`transition-colors hover:text-bronze relative py-1 ${
                pathname.startsWith("/properties") ? "text-ink font-semibold" : "text-ink-muted"
              }`}
            >
              Koleksi Properti
              {pathname.startsWith("/properties") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze" />
              )}
            </Link>
            <Link
              href="/agents"
              className={`transition-colors hover:text-bronze relative py-1 ${
                pathname.startsWith("/agents") ? "text-ink font-semibold" : "text-ink-muted"
              }`}
            >
              Penasihat
              {pathname.startsWith("/agents") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze" />
              )}
            </Link>
            <Link
              href="/contact"
              className={`transition-colors hover:text-bronze relative py-1 ${
                pathname === "/contact" ? "text-ink font-semibold" : "text-ink-muted"
              }`}
            >
              Kontak
              {pathname === "/contact" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze" />
              )}
            </Link>
            <Link
              href="/dashboard"
              className={`text-xs transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-none border ${
                pathname === "/dashboard"
                  ? "bg-ink text-limestone border-ink font-semibold"
                  : "bg-sand/60 text-sage hover:text-ink border-sand-dark/40"
              }`}
            >
              <span>Dashboard</span>
              <span className={`w-1.5 h-1.5 rounded-full ${pathname === "/dashboard" ? "bg-bronze-light" : "bg-bronze"}`} />
            </Link>
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-widest font-sans font-semibold bg-ink text-limestone hover:bg-bronze transition-colors border border-ink focus:outline-none focus:ring-2 focus:ring-bronze"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileNavOpen(true)}
              aria-label="Buka menu navigasi"
              className="p-2 text-ink hover:text-bronze focus:outline-none focus:ring-2 focus:ring-bronze"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}

