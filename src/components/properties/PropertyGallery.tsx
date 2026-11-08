"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { PropertyImage } from "@/types/property";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const total = images.length;
  const currentImage = images[activeIndex] ?? images[0];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, handlePrev, handleNext]);

  return (
    <section aria-label="Galeri Arsitektur Properti" className="space-y-3">
      {/* Main Image Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-sand-dark/20 border border-sand-dark/60 group">
        <Image
          src={currentImage.url}
          alt={currentImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          className="object-cover transition-transform duration-700 ease-out cursor-pointer group-hover:scale-[1.01]"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Counter Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-ink/80 backdrop-blur-md text-limestone text-xs font-sans tracking-widest uppercase">
          {activeIndex + 1} / {total}
        </div>

        {/* Expand / Lightbox Trigger Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Buka galeri layar penuh"
          className="absolute top-4 right-4 z-10 p-2 bg-ink/80 hover:bg-ink text-limestone backdrop-blur-md rounded-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bronze"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Previous / Next Inline Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-ink/70 hover:bg-ink text-limestone backdrop-blur-sm transition-all duration-200 opacity-90 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-bronze"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-ink/70 hover:bg-ink text-limestone backdrop-blur-sm transition-all duration-200 opacity-90 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-bronze"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Caption Ribbon */}
        {currentImage.caption && (
          <div className="absolute bottom-0 inset-x-0 z-10 p-3 md:p-4 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent text-limestone">
            <p className="text-xs md:text-sm font-sans text-sand-light/95 leading-relaxed line-clamp-2">
              {currentImage.caption}
            </p>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation Row */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label="Pilihan foto galeri"
          className="grid grid-cols-5 gap-2 md:gap-3"
        >
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img.url + idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Foto ${idx + 1} dari ${total}: ${img.alt}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[16/10] w-full overflow-hidden rounded-xs border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-bronze ${
                  isActive
                    ? "border-bronze ring-2 ring-bronze/40 opacity-100 scale-[1.02]"
                    : "border-sand-dark/60 opacity-60 hover:opacity-100 hover:border-sand-dark"
                }`}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 20vw, 160px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Tampilan foto layar penuh: ${title}`}
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div
            className="flex items-center justify-between z-20 pb-2 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <span className="text-xs font-sans uppercase tracking-widest text-sand-light/70">
                {title}
              </span>
              <p className="text-sm font-sans font-medium text-limestone">
                Foto {activeIndex + 1} dari {total}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block text-[11px] font-sans text-sand-dark/80 px-2 py-0.5 border border-white/10">
                ESC untuk tutup
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Tutup galeri layar penuh"
                className="p-2 text-limestone hover:text-bronze-light transition-colors focus:outline-none focus:ring-2 focus:ring-bronze"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Stage */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[72vh] flex items-center justify-center">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Prev / Next Nav in Lightbox */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Foto sebelumnya"
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-ink/80 hover:bg-ink text-limestone border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Foto berikutnya"
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-ink/80 hover:bg-ink text-limestone border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer & Thumbnail Strip */}
          <div
            className="space-y-3 pt-2 border-t border-white/10 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Active Caption */}
            <div className="text-center max-w-3xl mx-auto px-4">
              <p className="text-sm font-serif italic text-limestone/95">
                {currentImage.caption || currentImage.alt}
              </p>
            </div>

            {/* Thumbnail Strip */}
            {total > 1 && (
              <div className="flex justify-center items-center gap-2 overflow-x-auto py-1">
                {images.map((img, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={"lightbox-" + img.url + idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Pilih foto ${idx + 1}`}
                      className={`relative w-16 h-11 md:w-20 md:h-14 flex-shrink-0 overflow-hidden rounded-xs border transition-all ${
                        isActive
                          ? "border-bronze ring-2 ring-bronze/60 opacity-100"
                          : "border-white/20 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
