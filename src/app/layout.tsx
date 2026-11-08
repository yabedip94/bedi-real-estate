import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NARA ESTATE | Find a place to belong",
  description:
    "Platform Kurasi & Penemuan Properti Premium. Menghadirkan hunian arsitektural pilihan di kawasan prestisius Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${cormorantGaramond.variable} ${dmSans.variable}`}>
      <body className="bg-limestone text-ink font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

