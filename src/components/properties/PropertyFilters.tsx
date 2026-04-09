'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/propiedades?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  return (
    <div className="bg-white border-b border-surface-2 sticky top-16 z-40">
      <div className="container-narrow py-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 bg-surface px-4 py-2.5 flex-1 min-w-48">
          <Search size={15} className="text-text-muted shrink-0" />
          <input
            type="text"
            placeholder="Buscar..."
            defaultValue={searchParams.get('search') ?? ''}
            onChange={(e) => {
              const val = e.target.value
              if (val.length === 0 || val.length >= 2) updateParam('search', val)
            }}
            className="font-josefin text-sm bg-transparent outline-none w-full placeholder:text-text-muted"
            aria-label="Buscar propiedades"
          />
        </div>

        <select
          value={searchParams.get('operation_type') ?? ''}
          onChange={(e) => updateParam('operation_type', e.target.value)}
          className="font-josefin text-sm bg-surface px-4 py-2.5 outline-none cursor-pointer border border-transparent hover:border-gold transition-colors"
          aria-label="Tipo de operacion"
        >
          <option value="">Operacion</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
          <option value="alquiler_temporal">Temporal</option>
        </select>

        <select
          value={searchParams.get('property_type') ?? ''}
          onChange={(e) => updateParam('property_type', e.target.value)}
          className="font-josefin text-sm bg-surface px-4 py-2.5 outline-none cursor-pointer border border-transparent hover:border-gold transition-colors"
          aria-label="Tipo de propiedad"
        >
          <option value="">Tipo</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="lote">Lote</option>
          <option value="local_comercial">Local Comercial</option>
          <option value="oficina">Oficina</option>
          <option value="campo">Campo</option>
          <option value="cochera">Cochera</option>
        </select>

        <select
          value={searchParams.get('bedrooms') ?? ''}
          onChange={(e) => updateParam('bedrooms', e.target.value)}
          className="font-josefin text-sm bg-surface px-4 py-2.5 outline-none cursor-pointer border border-transparent hover:border-gold transition-colors"
          aria-label="Habitaciones minimas"
        >
          <option value="">Habitaciones</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>

        <select
          value={`${searchParams.get('min_price') ?? ''}_${searchParams.get('max_price') ?? ''}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split('_')
            updateParam('min_price', min)
            updateParam('max_price', max)
          }}
          className="font-josefin text-sm bg-surface px-4 py-2.5 outline-none cursor-pointer border border-transparent hover:border-gold transition-colors"
          aria-label="Rango de precio"
        >
          <option value="_">Precio</option>
          <option value="_50000">Hasta USD 50.000</option>
          <option value="_100000">Hasta USD 100.000</option>
          <option value="100000_200000">USD 100k - 200k</option>
          <option value="200000_">Mas de USD 200.000</option>
        </select>

        {searchParams.toString() !== '' && (
          <button
            onClick={() => router.push('/propiedades', { scroll: false })}
            className="font-josefin text-xs text-text-muted hover:text-navy transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal size={13} />
            Limpiar
          </button>
        )}
      </div>
    </div>
  )
}
