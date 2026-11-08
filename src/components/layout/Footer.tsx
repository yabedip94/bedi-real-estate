import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-limestone border-t border-ink-light">
      <div className="max-w-editorial mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Colophon */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] uppercase font-bold text-limestone block">
              NARA ESTATE
            </span>
            <p className="font-serif italic text-bronze text-base">
              Find a place to belong.
            </p>
            <p className="text-sm font-sans text-sage-light leading-relaxed max-w-sm pt-2">
              Platform kurasi dan pemasaran residensi mewah dengan pendekatan monograf arsitektur kontemporer dan keanggunan modern di Indonesia.
            </p>
          </div>

          {/* Navigation Links Group 1: Properties */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.16em] text-sage font-semibold">
              Koleksi Properti
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-limestone/80">
              <li>
                <Link href="/properties?type=rumah" className="hover:text-bronze transition-colors">
                  Rumah Tapak Premium
                </Link>
              </li>
              <li>
                <Link href="/properties?type=vila" className="hover:text-bronze transition-colors">
                  Vila Arsitektural Tropis
                </Link>
              </li>
              <li>
                <Link href="/properties?type=apartemen" className="hover:text-bronze transition-colors">
                  Penthouse & Apartemen
                </Link>
              </li>
              <li>
                <Link href="/properties?status=dijual" className="hover:text-bronze transition-colors">
                  Properti Dijual
                </Link>
              </li>
              <li>
                <Link href="/properties?status=disewa" className="hover:text-bronze transition-colors">
                  Properti Disewa
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links Group 2: Agency */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.16em] text-sage font-semibold">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-limestone/80">
              <li>
                <Link href="/" className="hover:text-bronze transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-bronze transition-colors">
                  Katalog Properti
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-bronze transition-colors">
                  Penasihat Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-bronze transition-colors">
                  Kontak & Konsultasi
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-bronze transition-colors text-sage">
                  Dashboard Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Office / Galeri Kontak */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-sans uppercase tracking-[0.16em] text-sage font-semibold">
              Galeri & Kantor
            </h4>
            <p className="text-sm font-sans text-limestone/80 leading-relaxed">
              Senopati Architectural Gallery<br />
              Kebayoran Baru, Jakarta Selatan<br />
              DKI Jakarta 12190
            </p>
            <p className="text-xs font-sans text-sage-light pt-2">
              Kunjungan privat berdasarkan perjanjian.
            </p>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div className="mt-16 pt-8 border-t border-ink-light flex flex-col md:flex-row items-center justify-between text-xs font-sans text-sage gap-4">
          <p>© 2026 NARA ESTATE. Seluruh hak cipta dilindungi.</p>
          <p className="text-center md:text-right text-sage-light">
            BEDI REAL ESTATE &mdash; Architectural MVP Showcase. Dibangun dengan Next.js App Router & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

