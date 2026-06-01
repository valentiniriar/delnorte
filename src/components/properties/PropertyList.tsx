'use client'

import { ChevronLeft, ChevronRight, SearchX, MapPin } from 'lucide-react'
import PropertyCard from '@/components/properties/PropertyCard'
import Skeleton from '@/components/ui/Skeleton'
import type { Property, PropertiesMeta, PropertyFilters } from '@/types'

interface PropertyListProps {
  properties: Property[]
  meta: PropertiesMeta | null
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
  activePropertyId?: string | null
  onPropertyHover?: (id: string | null) => void
  activeFilters?: PropertyFilters
  fallbackCity?: string
  suggestions?: Property[]
  onClearFilters?: () => void
}

const OPERATION_LABEL: Record<string, string> = {
  venta: 'en venta',
  alquiler: 'en alquiler',
  alquiler_temporal: 'en alquiler temporal',
}

export default function PropertyList({
  properties,
  meta,
  isLoading,
  currentPage,
  onPageChange,
  onPropertyHover,
  activeFilters,
  fallbackCity,
  suggestions = [],
  onClearFilters,
}: PropertyListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[16/10] w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    const searchTerm = activeFilters?.search || activeFilters?.city
    const opLabel = activeFilters?.operation_type
      ? OPERATION_LABEL[activeFilters.operation_type]
      : null

    return (
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Empty state */}
        <div className="flex flex-col items-center justify-center p-8 pt-12 text-center">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-5">
            <SearchX size={26} className="text-on-surface-variant" />
          </div>

          <h3 className="font-headline text-primary font-bold text-lg mb-2 tracking-tight">
            {searchTerm
              ? `Sin resultados en "${searchTerm}"`
              : 'Sin resultados'}
          </h3>

          <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-[260px] mb-6">
            {searchTerm
              ? `No encontramos propiedades${opLabel ? ` ${opLabel}` : ''} en "${searchTerm}"${activeFilters?.bedrooms ? ` con ${activeFilters.bedrooms}+ dormitorios` : ''}.`
              : `No hay propiedades que coincidan con todos los filtros aplicados.`}
          </p>

          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="font-body text-sm font-semibold text-primary border border-primary/30 rounded-full px-5 py-2 hover:bg-primary hover:text-white transition-colors"
            >
              Ver todas las propiedades
            </button>
          )}
        </div>

        {/* Suggestions: properties without the geo filter */}
        {suggestions.length > 0 && (
          <div className="border-t border-outline-variant/30 mt-2">
            <div className="px-4 py-3 flex items-center gap-2">
              <MapPin size={13} className="text-secondary-fixed shrink-0" />
              <p className="font-body text-xs text-on-surface-variant font-semibold uppercase tracking-[0.12em]">
                Disponibles en Jujuy
              </p>
            </div>
            <div className="divide-y divide-outline-variant/20">
              {suggestions.map((property) => (
                <div
                  key={property.id}
                  className="p-3"
                  onMouseEnter={() => onPropertyHover?.(property.id)}
                  onMouseLeave={() => onPropertyHover?.(null)}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* If no suggestions either */}
        {suggestions.length === 0 && searchTerm && (
          <div className="px-8 pb-8 text-center">
            <p className="font-body text-xs text-on-surface-variant/60">
              Del Norte opera en Jujuy y la Quebrada de Humahuaca.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fallback note: search=X returned 0 but city=X found results */}
      {fallbackCity && (
        <div className="px-4 py-2.5 bg-secondary-fixed/20 border-b border-secondary-fixed/30 shrink-0 flex items-center gap-2">
          <MapPin size={12} className="text-primary shrink-0" />
          <p className="font-body text-xs text-primary leading-snug">
            Mostrando propiedades en <span className="font-semibold capitalize">{fallbackCity}</span>
          </p>
        </div>
      )}
      <div className="px-4 py-3 border-b border-outline-variant/20 shrink-0">
        <p className="font-body text-xs text-on-surface-variant">
          {meta?.total ?? properties.length}{' '}
          {(meta?.total ?? properties.length) === 1 ? 'propiedad' : 'propiedades'} encontradas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/20">
        {properties.map((property) => (
          <div
            key={property.id}
            className="p-3"
            onMouseEnter={() => onPropertyHover?.(property.id)}
            onMouseLeave={() => onPropertyHover?.(null)}
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      {meta && meta.total_pages > 1 && (
        <div className="shrink-0 border-t border-outline-variant/20 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 font-body text-xs text-primary disabled:text-on-surface-variant/40 disabled:cursor-not-allowed hover:text-primary-800 transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} />
            Anterior
          </button>
          <span className="font-body text-xs text-on-surface-variant">
            {currentPage} / {meta.total_pages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === meta.total_pages}
            className="flex items-center gap-1 font-body text-xs text-primary disabled:text-on-surface-variant/40 disabled:cursor-not-allowed hover:text-primary-800 transition-colors cursor-pointer"
          >
            Siguiente
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
