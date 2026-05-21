'use client'

import { useState, Suspense, useMemo, useCallback, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { MapPin, List, BedDouble, Maximize2, X } from 'lucide-react'
import PropertyFilters from '@/components/properties/PropertyFilters'
import PropertyList from '@/components/properties/PropertyList'
import { useProperties, useMapProperties } from '@/hooks/useProperties'
import { formatPrice } from '@/lib/utils'
import type { PropertyFilters as Filters, MapBounds, Property } from '@/types'

const OPERATION_LABEL: Record<string, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  alquiler_temporal: 'Alquiler Temporal',
}

const PropertyMap = dynamic(() => import('@/components/properties/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-primary flex items-center justify-center">
      <p className="font-body text-white/50 text-sm">Cargando mapa...</p>
    </div>
  ),
})

function PropertiesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null)
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const [sheetProperty, setSheetProperty] = useState<Property | null>(null)

  const sheetRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef(0)
  const dragCurrentY = useRef(0)
  const isDragging = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hide root footer and prevent body scroll on the map/list page
  useEffect(() => {
    const footer = document.querySelector('footer') as HTMLElement | null
    const prev = footer?.style.display ?? ''
    if (footer) footer.style.display = 'none'
    document.body.style.overflow = 'hidden'
    return () => {
      if (footer) footer.style.display = prev
      document.body.style.overflow = ''
    }
  }, [])

  // ── Enter animation via double-RAF ─────────────────────────────────────────
  // @keyframes inside @layer are not accessible from inline styles (CSS scoping).
  // Double-RAF guarantees the browser paints the initial state before transition starts.
  useEffect(() => {
    if (!sheetProperty) return
    const sheet = sheetRef.current
    const backdrop = backdropRef.current
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (sheet) {
          sheet.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
          sheet.style.transform = 'translateY(0)'
        }
        if (backdrop) {
          backdrop.style.transition = 'opacity 0.3s ease'
          backdrop.style.opacity = '1'
        }
      })
    })
    return () => cancelAnimationFrame(rafId)
  }, [sheetProperty])

  // ── Close (button / backdrop tap) ─────────────────────────────────────────
  const closeSheet = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    const sheet = sheetRef.current
    const backdrop = backdropRef.current
    if (sheet) {
      sheet.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 1, 1)'
      sheet.style.transform = 'translateY(100%)'
    }
    if (backdrop) {
      backdrop.style.transition = 'opacity 0.28s ease'
      backdrop.style.opacity = '0'
    }
    closeTimerRef.current = setTimeout(() => {
      setSheetProperty(null)
      setActivePropertyId(null)
    }, 310)
  }, [])

  const openSheet = useCallback((property: Property) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setSheetProperty(property)
    // Reset active so the useEffect re-runs if same property is tapped again
    setActivePropertyId(property.id)
  }, [])

  // ── Drag-to-dismiss ────────────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY
    dragCurrentY.current = 0
    isDragging.current = false
    const sheet = sheetRef.current
    if (sheet) sheet.style.transition = 'none'
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dy = e.touches[0].clientY - dragStartY.current
    if (dy <= 0) return
    isDragging.current = true
    dragCurrentY.current = dy
    const sheet = sheetRef.current
    const backdrop = backdropRef.current
    if (sheet) sheet.style.transform = `translateY(${dy}px)`
    if (backdrop) backdrop.style.opacity = String(Math.max(0, 1 - dy / 240).toFixed(3))
  }, [])

  const handleTouchEnd = useCallback(() => {
    const dy = dragCurrentY.current
    dragCurrentY.current = 0
    if (!isDragging.current) return
    isDragging.current = false
    const sheet = sheetRef.current
    const backdrop = backdropRef.current

    if (dy > 90) {
      // Dismiss from current drag position
      if (sheet) {
        sheet.style.transition = 'transform 0.24s cubic-bezier(0.4, 0, 1, 1)'
        sheet.style.transform = 'translateY(110%)'
      }
      if (backdrop) {
        backdrop.style.transition = 'opacity 0.24s ease'
        backdrop.style.opacity = '0'
      }
      closeTimerRef.current = setTimeout(() => {
        setSheetProperty(null)
        setActivePropertyId(null)
      }, 280)
    } else {
      // Snap back
      if (sheet) {
        sheet.style.transition = 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)'
        sheet.style.transform = 'translateY(0)'
      }
      if (backdrop) {
        backdrop.style.transition = 'opacity 0.3s ease'
        backdrop.style.opacity = '1'
      }
    }
  }, [])

  // ── Filters & data ─────────────────────────────────────────────────────────
  const baseFilters: Filters = useMemo(
    () => ({
      operation_type:
        (searchParams.get('operation_type') as Filters['operation_type']) || undefined,
      property_type:
        (searchParams.get('property_type') as Filters['property_type']) || undefined,
      city: searchParams.get('city') || undefined,
      bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
      min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
      max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
      search: searchParams.get('search') || undefined,
    }),
    [searchParams],
  )

  const listFilters: Filters = useMemo(
    () => ({ ...baseFilters, page: Number(searchParams.get('page') ?? '1'), per_page: 20 }),
    [baseFilters, searchParams],
  )

  const mapFilters: Filters = useMemo(
    () => ({ ...baseFilters, page: 1, per_page: 100, ...(mapBounds ?? {}) }),
    [baseFilters, mapBounds],
  )

  const { data: listData, isLoading: isListLoading } = useProperties(listFilters)
  const { data: mapData, isFetching: isMapFetching } = useMapProperties(mapFilters)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`/propiedades?${params.toString()}`, { scroll: false })
  }

  const handleBoundsChange = useCallback((bounds: MapBounds) => setMapBounds(bounds), [])

  return (
    <div className="flex flex-col h-dvh pt-20">
      <PropertyFilters />

      <div className="flex flex-1 overflow-hidden">
        {/* Map panel */}
        <div
          className={[
            'lg:block lg:w-[55%] xl:w-[60%] h-full sticky top-0',
            mobileView === 'map' ? 'block w-full' : 'hidden',
          ].join(' ')}
        >
          <PropertyMap
            properties={mapData?.data ?? []}
            activePropertyId={activePropertyId}
            onPropertyHover={setActivePropertyId}
            onBoundsChange={handleBoundsChange}
            isLoadingBounds={isMapFetching}
            onMobileSelect={openSheet}
          />
        </div>

        {/* List panel */}
        <div
          className={[
            'lg:flex lg:w-[45%] xl:w-[40%] h-full overflow-hidden flex-col',
            mobileView === 'list' ? 'flex w-full' : 'hidden',
          ].join(' ')}
        >
          <PropertyList
            properties={listData?.data ?? []}
            meta={listData?.meta ?? null}
            isLoading={isListLoading}
            currentPage={listFilters.page ?? 1}
            onPageChange={handlePageChange}
            activePropertyId={activePropertyId}
            onPropertyHover={setActivePropertyId}
          />
        </div>
      </div>

      {/* Mobile toggle — hides behind sheet */}
      <button
        onClick={() => setMobileView((v) => (v === 'list' ? 'map' : 'list'))}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-primary text-white font-body font-bold text-sm px-5 py-3 rounded-full shadow-editorial-lg flex items-center gap-2 border border-white/10 active:opacity-90"
        style={{
          opacity: sheetProperty ? 0 : 1,
          pointerEvents: sheetProperty ? 'none' : 'auto',
          transition: 'opacity 0.2s ease',
        }}
      >
        {mobileView === 'list' ? (
          <><MapPin size={15} /> Ver mapa</>
        ) : (
          <><List size={15} /> Ver listado</>
        )}
      </button>

      {/* ── Mobile bottom sheet ──────────────────────────────────────────── */}
      {sheetProperty && (
        <>
          {/* Backdrop — starts at opacity:0, animated to 1 via double-RAF */}
          <div
            ref={backdropRef}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.5)', opacity: 0 }}
            onClick={closeSheet}
          />

          {/* Sheet — starts at translateY(100%), animated to 0 via double-RAF */}
          <div
            ref={sheetRef}
            className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden bg-surface rounded-t-3xl overflow-hidden flex flex-col"
            style={{ height: '56dvh', transform: 'translateY(100%)' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drag handle */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1 shrink-0 select-none">
              <div className="w-7 h-7" />
              <div className="w-12 h-1.5 rounded-full bg-outline-variant/50" />
              <button
                onClick={closeSheet}
                className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant/50 active:bg-surface-container"
              >
                <X size={15} />
              </button>
            </div>

            {/* Cover image with padding + rounded corners */}
            <div
              className="mx-3 rounded-2xl overflow-hidden shrink-0 bg-surface-container-high"
              style={{ height: '40%' }}
            >
              {sheetProperty.cover_image_url ? (
                <img
                  src={sheetProperty.cover_image_url}
                  alt={sheetProperty.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-body text-on-surface-variant/40 text-xs">Sin imagen</span>
                </div>
              )}
            </div>

            {/* Property details */}
            <div className="flex-1 px-4 pt-3 pb-4 flex flex-col justify-between min-h-0">
              <div>
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary mb-0.5">
                  {OPERATION_LABEL[sheetProperty.operation_type] ?? 'Propiedad'}
                </p>
                <h3 className="font-headline font-bold text-primary text-[15px] leading-tight tracking-tight line-clamp-1 mb-0.5">
                  {sheetProperty.title}
                </h3>
                <p className="font-body text-[11px] text-on-surface-variant mb-2 line-clamp-1">
                  {sheetProperty.neighborhood}, {sheetProperty.city}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-headline font-bold text-primary text-[17px] leading-none">
                    {formatPrice(
                      sheetProperty.price_usd,
                      sheetProperty.price_ars,
                      sheetProperty.currency,
                    )}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-body">
                    {sheetProperty.bedrooms != null && (
                      <span className="flex items-center gap-1">
                        <BedDouble size={12} />
                        {sheetProperty.bedrooms} dorm.
                      </span>
                    )}
                    {sheetProperty.total_sqm != null && (
                      <span className="flex items-center gap-1">
                        <Maximize2 size={12} />
                        {sheetProperty.total_sqm} m²
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <a
                href={`/propiedades/${sheetProperty.id}`}
                className="block bg-primary text-white text-sm font-bold text-center py-3.5 rounded-2xl tracking-wide active:opacity-80 font-body mt-3"
              >
                Ver más detalle
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function PropertiesClient() {
  return (
    <Suspense
      fallback={
        <div className="h-dvh flex items-center justify-center">
          <p className="font-body text-on-surface-variant">Cargando propiedades...</p>
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  )
}
