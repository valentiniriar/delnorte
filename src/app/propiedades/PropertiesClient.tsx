'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import PropertyFilters from '@/components/properties/PropertyFilters'
import PropertyList from '@/components/properties/PropertyList'
import { useProperties } from '@/hooks/useProperties'
import type { PropertyFilters as Filters } from '@/types'

const PropertyMap = dynamic(() => import('@/components/properties/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-navy-900 flex items-center justify-center">
      <p className="font-josefin text-white/40 text-sm">Cargando mapa...</p>
    </div>
  ),
})

function PropertiesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null)

  const filters: Filters = {
    page: Number(searchParams.get('page') ?? '1'),
    per_page: 20,
    operation_type: (searchParams.get('operation_type') as Filters['operation_type']) || undefined,
    property_type: (searchParams.get('property_type') as Filters['property_type']) || undefined,
    city: searchParams.get('city') || undefined,
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
    min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
    max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
    search: searchParams.get('search') || undefined,
  }

  const { data, isLoading } = useProperties(filters)
  const properties = data?.data ?? []

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`/propiedades?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-col h-dvh pt-16">
      <PropertyFilters />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block lg:w-[55%] xl:w-[60%] h-full sticky top-0">
          <PropertyMap
            properties={properties}
            activePropertyId={activePropertyId}
            onPropertyHover={setActivePropertyId}
          />
        </div>

        <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-hidden flex flex-col">
          <PropertyList
            properties={properties}
            meta={data?.meta ?? null}
            isLoading={isLoading}
            currentPage={filters.page ?? 1}
            onPageChange={handlePageChange}
            activePropertyId={activePropertyId}
            onPropertyHover={setActivePropertyId}
          />
        </div>
      </div>
    </div>
  )
}

export default function PropertiesClient() {
  return (
    <Suspense
      fallback={
        <div className="h-dvh flex items-center justify-center">
          <p className="font-josefin text-text-muted">Cargando propiedades...</p>
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  )
}
