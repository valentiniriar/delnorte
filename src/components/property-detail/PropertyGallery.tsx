'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lbTouchStart = useRef(0)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i != null ? (i - 1 + images.length) % images.length : images.length - 1))
  }, [images.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i != null ? (i + 1) % images.length : 0))
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, prev, next])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex != null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, offsetWidth } = scrollRef.current
    setCarouselIndex(Math.round(scrollLeft / offsetWidth))
  }, [])

  const handleLbTouchStart = useCallback((e: React.TouchEvent) => {
    lbTouchStart.current = e.touches[0].clientX
  }, [])

  const handleLbTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - lbTouchStart.current
    if (Math.abs(dx) < 50) return
    if (dx < 0) next()
    else prev()
  }, [next, prev])

  if (images.length === 0) return null

  const sideImages = images.slice(1, 5)

  return (
    <>
      {/* ── Mobile: swipeable scroll-snap carousel ── */}
      <div className="md:hidden relative overflow-hidden bg-surface-container-high rounded-xl">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-full relative cursor-pointer"
              style={{ minWidth: '100%', aspectRatio: '4/3' }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={img}
                alt={`${title} — imagen ${i + 1}`}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Zoom button */}
        <button
          onClick={() => setLightboxIndex(carouselIndex)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          aria-label="Ampliar imagen"
        >
          <ZoomIn size={14} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white font-body text-xs px-2.5 py-1 rounded-full">
          {carouselIndex + 1} / {images.length}
        </div>

        {/* Dots (show only when ≤12 images) */}
        {images.length > 1 && images.length <= 12 && (
          <div className="absolute bottom-3 left-0 right-20 flex justify-center items-center gap-1.5 pointer-events-none px-4">
            {images.map((_, i) => (
              <div
                key={i}
                className={[
                  'h-1.5 rounded-full transition-all duration-200',
                  i === carouselIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50',
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Desktop: masonry grid ── */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-1 h-[60vh] min-h-[360px] overflow-hidden rounded-xl">
        {/* Main image — 2 cols × 2 rows */}
        <div
          className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={images[0]}
            alt={`${title} — imagen principal`}
            fill
            priority
            sizes="50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {sideImages.map((img, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(i + 1)}
          >
            <Image
              src={img}
              alt={`${title} — imagen ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                <span className="font-body text-white font-bold text-sm">
                  +{images.length - 5} fotos
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {/* ── Lightbox (all breakpoints) ── */}
      {lightboxIndex != null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleLbTouchStart}
          onTouchEnd={handleLbTouchEnd}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 text-white p-2 cursor-pointer hover:text-secondary-fixed transition-colors"
            aria-label="Cerrar galería"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 z-10 text-white p-3 bg-white/10 hover:bg-white/25 rounded-full cursor-pointer transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full max-w-5xl h-[75dvh] px-4 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} — imagen ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 z-10 text-white p-3 bg-white/10 hover:bg-white/25 rounded-full cursor-pointer transition-colors"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-5 font-body text-white/60 text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
