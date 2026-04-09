'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i != null ? (i - 1 + images.length) % images.length : 0))
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i != null ? (i + 1) % images.length : 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, images.length])

  if (images.length === 0) return null

  const mainImage = images[0]
  const sideImages = images.slice(1, 5)

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-1 h-[60vh] min-h-64">
        <div
          className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={mainImage}
            alt={`${title} — imagen principal`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
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
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="font-josefin text-white font-semibold text-sm">
                  +{images.length - 5} fotos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {lightboxIndex != null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gold transition-colors p-2 cursor-pointer"
            aria-label="Cerrar galería"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i != null ? (i - 1 + images.length) % images.length : 0)) }}
            className="absolute left-4 text-white hover:text-gold transition-colors p-3 bg-white/10 hover:bg-white/20 cursor-pointer"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative w-full max-w-4xl h-[80vh] px-16"
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

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i != null ? (i + 1) % images.length : 0)) }}
            className="absolute right-4 text-white hover:text-gold transition-colors p-3 bg-white/10 hover:bg-white/20 cursor-pointer"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 font-josefin text-white/60 text-xs">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
