import { ChevronLeft, ChevronRight } from 'lucide-react'
import PropertyCard from '@/components/properties/PropertyCard'
import Skeleton from '@/components/ui/Skeleton'
import type { Property, PropertiesMeta } from '@/types'

interface PropertyListProps {
  properties: Property[]
  meta: PropertiesMeta | null
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
  activePropertyId?: string | null
  onPropertyHover?: (id: string | null) => void
}

export default function PropertyList({
  properties,
  meta,
  isLoading,
  currentPage,
  onPageChange,
  onPropertyHover,
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
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-8">
        <p className="font-cinzel text-navy text-lg font-semibold mb-2">
          Sin resultados
        </p>
        <p className="font-josefin text-text-muted text-sm">
          No encontramos propiedades con esos filtros. Intenta con otros criterios.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-surface-2 shrink-0">
        <p className="font-josefin text-xs text-text-muted">
          {meta?.total ?? properties.length} propiedades encontradas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-surface-2">
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
        <div className="shrink-0 border-t border-surface-2 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 font-josefin text-xs text-navy disabled:text-text-muted disabled:cursor-not-allowed hover:text-gold transition-colors cursor-pointer"
          >
            <ChevronLeft size={14} />
            Anterior
          </button>
          <span className="font-josefin text-xs text-text-muted">
            {currentPage} / {meta.total_pages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === meta.total_pages}
            className="flex items-center gap-1 font-josefin text-xs text-navy disabled:text-text-muted disabled:cursor-not-allowed hover:text-gold transition-colors cursor-pointer"
          >
            Siguiente
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
