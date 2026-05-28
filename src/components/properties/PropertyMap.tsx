'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/maplibre'
import type { MapLibreEvent } from 'maplibre-gl'
import type { MapRef } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Tag, Key, CalendarDays, Loader2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Property, OperationType, MapBounds } from '@/types'

const OPERATION_STYLE: Record<
  OperationType,
  { base: string; active: string; Icon: typeof Tag; label: string }
> = {
  venta: {
    base: 'bg-primary text-white border-primary hover:bg-secondary-fixed hover:text-primary',
    active: 'bg-secondary-fixed text-primary border-secondary',
    Icon: Tag,
    label: 'Venta',
  },
  alquiler: {
    base: 'bg-secondary text-white border-secondary hover:bg-secondary-hover',
    active: 'bg-secondary-fixed text-primary border-secondary',
    Icon: Key,
    label: 'Alquiler',
  },
  alquiler_temporal: {
    base: 'bg-secondary-fixed text-primary border-secondary hover:bg-secondary hover:text-white',
    active: 'bg-primary text-white border-primary',
    Icon: CalendarDays,
    label: 'Temporal',
  },
}

interface PropertyMapProps {
  properties: Property[]
  activePropertyId?: string | null
  onPropertyHover?: (id: string | null) => void
  onBoundsChange?: (bounds: MapBounds) => void
  isLoadingBounds?: boolean
  onMobileSelect?: (property: Property) => void
}

const JUJUY_VIEWPORT = {
  longitude: -65.3023,
  latitude: -24.1858,
  zoom: 10,
}

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'

export default function PropertyMap({
  properties,
  activePropertyId,
  onPropertyHover,
  onBoundsChange,
  isLoadingBounds,
  onMobileSelect,
}: PropertyMapProps) {
  const mapRef = useRef<MapRef>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [popupInfo, setPopupInfo] = useState<Property | null>(null)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  )
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const boundsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Resize map when container becomes visible (e.g. switching from list to map on mobile)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      mapRef.current?.resize()
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const emitBounds = useCallback(() => {
    const map = mapRef.current
    if (!map) return
    const bounds = map.getBounds()
    if (!bounds) return
    onBoundsChange?.({
      lat_min: bounds.getSouth(),
      lat_max: bounds.getNorth(),
      lng_min: bounds.getWest(),
      lng_max: bounds.getEast(),
    })
  }, [onBoundsChange])

  const handleMoveEnd = useCallback(() => {
    if (boundsTimer.current) clearTimeout(boundsTimer.current)
    boundsTimer.current = setTimeout(emitBounds, 500)
  }, [emitBounds])

  const handleLoad = useCallback(
    (e: MapLibreEvent) => {
      const map = e.target
      map.on('styleimagemissing', (ev: { id: string }) => {
        if (map.hasImage(ev.id)) return
        map.addImage(ev.id, { width: 1, height: 1, data: new Uint8Array(4) })
      })
      setTimeout(emitBounds, 200)
    },
    [emitBounds],
  )

  const cancelHoverLeave = useCallback(() => {
    if (hoverLeaveTimer.current) clearTimeout(hoverLeaveTimer.current)
  }, [])

  const handleMarkerEnter = useCallback(
    (property: Property) => {
      if (isMobile) return
      cancelHoverLeave()
      setPopupInfo(property)
      onPropertyHover?.(property.id)
    },
    [isMobile, cancelHoverLeave, onPropertyHover],
  )

  const handleMarkerLeave = useCallback(() => {
    if (isMobile) return
    hoverLeaveTimer.current = setTimeout(() => {
      setPopupInfo(null)
      onPropertyHover?.(null)
    }, 180)
  }, [isMobile, onPropertyHover])

  const propertiesWithCoords = properties.filter(
    (p) => p.lat != null && p.lng != null,
  )

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Map
        ref={mapRef}
        initialViewState={JUJUY_VIEWPORT}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        reuseMaps
        onLoad={handleLoad}
        onMoveEnd={handleMoveEnd}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />

        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur rounded-lg shadow-editorial border border-outline-variant/40 px-3 py-2 font-body text-[11px]">
          <p className="text-[9px] uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-1.5">
            Operación
          </p>
          <div className="flex flex-col gap-1">
            {(Object.keys(OPERATION_STYLE) as OperationType[]).map((op) => {
              const { Icon, label, base } = OPERATION_STYLE[op]
              return (
                <div key={op} className="flex items-center gap-2">
                  <span
                    className={[
                      'w-4 h-4 rounded-full flex items-center justify-center border',
                      base
                        .split(' ')
                        .filter(
                          (c) =>
                            c.startsWith('bg-') ||
                            c.startsWith('text-') ||
                            c.startsWith('border-'),
                        )
                        .join(' '),
                    ].join(' ')}
                  >
                    <Icon size={8} strokeWidth={2.5} />
                  </span>
                  <span className="text-on-surface font-medium">{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {propertiesWithCoords.map((property) => {
          const isActive = property.id === activePropertyId
          const price = formatPrice(property.price_usd, property.price_ars, property.currency)
          const style = OPERATION_STYLE[property.operation_type] ?? OPERATION_STYLE.venta
          const { Icon } = style

          return (
            <Marker
              key={property.id}
              longitude={property.lng!}
              latitude={property.lat!}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                if (isMobile) {
                  onPropertyHover?.(property.id)
                  onMobileSelect?.(property)
                }
              }}
            >
              <div
                className={[
                  'font-body text-xs font-bold pl-1.5 pr-3 py-1 rounded-full cursor-pointer',
                  'transition-all duration-200 whitespace-nowrap shadow-editorial-lg border',
                  'flex items-center gap-1.5',
                  isActive
                    ? `${style.active} scale-110`
                    : `${style.base} hover:scale-105`,
                ].join(' ')}
                onMouseEnter={() => handleMarkerEnter(property)}
                onMouseLeave={handleMarkerLeave}
                aria-label={`${style.label} — ${price}`}
              >
                <span
                  className={[
                    'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                    isActive ? 'bg-primary/10' : 'bg-white/20',
                  ].join(' ')}
                >
                  <Icon size={11} strokeWidth={2.5} />
                </span>
                {price}
              </div>
            </Marker>
          )
        })}

        {/* Desktop hover popup */}
        {!isMobile && popupInfo && popupInfo.lat != null && popupInfo.lng != null && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            anchor="bottom"
            offset={32}
            onClose={() => setPopupInfo(null)}
            closeButton={false}
            closeOnClick={false}
            maxWidth="260px"
          >
            <div
              className="font-body p-1"
              onMouseEnter={cancelHoverLeave}
              onMouseLeave={handleMarkerLeave}
            >
              {popupInfo.cover_image_url && (
                <img
                  src={popupInfo.cover_image_url}
                  alt={popupInfo.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <p className="font-headline text-primary font-bold text-sm leading-snug mb-1 tracking-tight">
                {popupInfo.title}
              </p>
              <p className="text-xs text-on-surface-variant mb-2">
                {popupInfo.neighborhood}, {popupInfo.city}
              </p>
              <p className="font-headline font-bold text-primary text-sm mb-3">
                {formatPrice(popupInfo.price_usd, popupInfo.price_ars, popupInfo.currency)}
              </p>
              <a
                href={`/propiedades/${popupInfo.id}`}
                className="block bg-primary text-white text-xs font-bold text-center py-2 rounded-md tracking-wide hover:bg-primary-800 transition-colors"
              >
                Ver detalle
              </a>
            </div>
          </Popup>
        )}
      </Map>

      {/* Viewport update indicator */}
      {isLoadingBounds && (
        <div className="absolute bottom-8 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full shadow-md px-2.5 py-1.5 flex items-center gap-1.5 pointer-events-none">
          <Loader2 size={11} className="animate-spin text-secondary" />
          <span className="font-body text-[10px] text-on-surface-variant font-medium">
            Actualizando...
          </span>
        </div>
      )}
    </div>
  )
}
