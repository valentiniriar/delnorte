'use client'

import { useRef, useCallback, useState } from 'react'
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { formatPrice } from '@/lib/utils'
import type { Property } from '@/types'
import type { MapRef } from 'react-map-gl/mapbox'

interface PropertyMapProps {
  properties: Property[]
  activePropertyId?: string | null
  onPropertyHover?: (id: string | null) => void
}

const JUJUY_VIEWPORT = {
  longitude: -65.3023,
  latitude: -24.1858,
  zoom: 10,
}

export default function PropertyMap({
  properties,
  activePropertyId,
  onPropertyHover,
}: PropertyMapProps) {
  const mapRef = useRef<MapRef>(null)
  const [popupInfo, setPopupInfo] = useState<Property | null>(null)

  const propertiesWithCoords = properties.filter(
    (p) => p.lat != null && p.lng != null,
  )

  const handleMarkerClick = useCallback((property: Property) => {
    setPopupInfo(property)
    mapRef.current?.flyTo({
      center: [property.lng!, property.lat!],
      zoom: 14,
      duration: 800,
    })
  }, [])

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={JUJUY_VIEWPORT}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      reuseMaps
    >
      <NavigationControl position="top-right" />
      <GeolocateControl position="top-right" />

      {propertiesWithCoords.map((property) => {
        const isActive = property.id === activePropertyId
        const price = formatPrice(property.price_usd, property.price_ars, property.currency)

        return (
          <Marker
            key={property.id}
            longitude={property.lng!}
            latitude={property.lat!}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              handleMarkerClick(property)
            }}
          >
            <div
              className={[
                'font-josefin text-xs font-semibold px-2.5 py-1.5 cursor-pointer',
                'transition-all duration-200 whitespace-nowrap shadow-lg',
                isActive
                  ? 'bg-gold text-navy scale-110'
                  : 'bg-navy text-white hover:bg-gold hover:text-navy hover:scale-105',
              ].join(' ')}
              onMouseEnter={() => onPropertyHover?.(property.id)}
              onMouseLeave={() => onPropertyHover?.(null)}
            >
              {price}
            </div>
          </Marker>
        )
      })}

      {popupInfo && popupInfo.lat != null && popupInfo.lng != null && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          anchor="bottom"
          offset={32}
          onClose={() => setPopupInfo(null)}
          closeButton={true}
          closeOnClick={false}
          maxWidth="260px"
        >
          <div className="font-josefin p-1">
            {popupInfo.cover_image_url && (
              <img
                src={popupInfo.cover_image_url}
                alt={popupInfo.title}
                className="w-full h-32 object-cover mb-2"
              />
            )}
            <p className="font-cinzel text-navy font-semibold text-sm leading-snug mb-1">
              {popupInfo.title}
            </p>
            <p className="text-xs text-text-muted mb-2">
              {popupInfo.neighborhood}, {popupInfo.city}
            </p>
            <p className="font-semibold text-navy text-sm mb-2">
              {formatPrice(popupInfo.price_usd, popupInfo.price_ars, popupInfo.currency)}
            </p>
            <a
              href={`/propiedades/${popupInfo.id}`}
              className="block bg-navy text-white text-xs font-semibold text-center py-2 uppercase tracking-widest hover:bg-navy-800 transition-colors"
            >
              Ver Detalle
            </a>
          </div>
        </Popup>
      )}
    </Map>
  )
}
