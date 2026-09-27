import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryImages } from '@/data/gallery';

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  // keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  // touch gestures in lightbox
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleLightboxTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Scroll-driven horizontal movement
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;
    if (!sectionRef.current || !trackRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ivory">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        {/* Header */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 px-6 pt-16 lg:px-10 lg:pt-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
              Visual journal
            </p>
            <h2 className="mt-4 font-display text-display-lg font-extrabold text-mh-black text-balance">
              Gallery
            </h2>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex h-full items-center">
          <div ref={trackRef} className="flex gap-6 px-6 lg:gap-8 lg:px-10 will-change-transform">
            <div className="shrink-0" style={{ width: '2rem' }} />
            {galleryImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => openLightbox(index)}
                className="group relative shrink-0 overflow-hidden rounded-lg bg-graphite"
                style={{
                  width: img.orientation === 'portrait' ? '320px' : '480px',
                  height: img.orientation === 'portrait' ? '460px' : '320px',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mh-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs font-semibold uppercase tracking-wide-sm text-accent">
                    {img.orientation}
                  </p>
                  <p className="mt-1 text-sm text-ivory/80">{img.caption}</p>
                </div>
              </button>
            ))}
            <div className="shrink-0" style={{ width: '2rem' }} />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-stone/50">
            <span>Scroll to explore</span>
            <ChevronRight size={16} className="animate-pulse" />
          </div>
        </div>
      </div>

      {/* fullscreen lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-mh-black/95"
            onClick={closeLightbox}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/20"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/20"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/20"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-ivory/60">
                  {galleryImages[lightboxIndex].caption}
                </p>
                <p className="mt-1 text-xs text-ivory/30">
                  {lightboxIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
