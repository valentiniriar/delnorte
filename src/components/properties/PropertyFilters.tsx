'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Search, SlidersHorizontal, X, Tag, Key, CalendarDays,
  ChevronDown, Check, BedDouble, Home, DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Option = { value: string; label: string }

const OPERATIONS = [
  { value: 'venta', label: 'Venta', Icon: Tag },
  { value: 'alquiler', label: 'Alquiler', Icon: Key },
  { value: 'alquiler_temporal', label: 'Temporal', Icon: CalendarDays },
] as const

const PROPERTY_TYPES: Option[] = [
  { value: '', label: 'Cualquier tipo' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'lote', label: 'Lote' },
  { value: 'local_comercial', label: 'Local comercial' },
  { value: 'oficina', label: 'Oficina' },
  { value: 'campo', label: 'Campo' },
  { value: 'cochera', label: 'Cochera' },
]

const BEDROOMS: Option[] = [
  { value: '', label: 'Cualquier cantidad' },
  { value: '1', label: '1 o más' },
  { value: '2', label: '2 o más' },
  { value: '3', label: '3 o más' },
  { value: '4', label: '4 o más' },
]

const PRICE_RANGES: Option[] = [
  { value: '_', label: 'Cualquier precio' },
  { value: '_50000', label: 'Hasta USD 50.000' },
  { value: '_100000', label: 'Hasta USD 100.000' },
  { value: '100000_200000', label: 'USD 100k – 200k' },
  { value: '200000_', label: 'Más de USD 200.000' },
]

// ─── Editorial dropdown ──────────────────────────────────────────────
function FilterDropdown({
  label, value, options, onChange, Icon, align = 'left',
}: {
  label: string
  value: string
  options: Option[]
  onChange: (v: string) => void
  Icon?: React.ComponentType<{ size?: number; className?: string }>
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)
  const isActive = !!value && value !== '_'
  const displayLabel = isActive && selected ? selected.label : label

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-2 h-11 px-4 rounded-full font-body text-sm font-medium cursor-pointer',
          'border transition-all duration-150 whitespace-nowrap',
          isActive
            ? 'bg-primary text-white border-primary shadow-editorial'
            : 'bg-white text-on-surface border-outline-variant/60 hover:border-primary hover:bg-surface-container-low',
        )}
      >
        {Icon && <Icon size={14} className={isActive ? 'opacity-90' : 'text-on-surface-variant'} />}
        <span>{displayLabel}</span>
        <ChevronDown
          size={14}
          className={cn('transition-transform duration-200 shrink-0', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className={cn(
            'absolute top-full mt-2 min-w-[220px] bg-white rounded-xl shadow-editorial-lg',
            'border border-outline-variant/40 overflow-hidden z-50 select-dropdown',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          <ul className="max-h-80 overflow-y-auto py-1.5">
            {options.map((o) => {
              const active = o.value === value
              return (
                <li key={o.value || 'any'}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(o.value)
                      setOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left cursor-pointer',
                      'font-body text-sm transition-colors',
                      active
                        ? 'bg-secondary-fixed/50 text-primary font-semibold'
                        : 'text-on-surface hover:bg-surface-container-low',
                    )}
                  >
                    <span className="truncate">{o.label}</span>
                    {active && <Check size={14} className="text-secondary shrink-0" strokeWidth={2.5} />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Active filter chip ──────────────────────────────────────────────
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className={cn(
        'group inline-flex items-center gap-1.5 h-8 pl-3 pr-2 rounded-full',
        'bg-secondary-fixed/70 text-primary font-body text-xs font-semibold',
        'border border-secondary/20 hover:bg-secondary-fixed transition-colors cursor-pointer',
      )}
      aria-label={`Quitar filtro ${label}`}
    >
      <span>{label}</span>
      <X size={12} strokeWidth={2.5} className="opacity-70 group-hover:opacity-100" />
    </button>
  )
}

// ─── Main component ──────────────────────────────────────────────────
export default function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(searchParams.get('search') ?? '')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      params.delete('page')
      const qs = params.toString()
      router.push(`/propiedades${qs ? '?' + qs : ''}`, { scroll: false })
    },
    [router, searchParams],
  )

  const updateParam = useCallback(
    (key: string, value: string) => updateParams({ [key]: value }),
    [updateParams],
  )

  // Keep a stable ref to updateParam so the debounce effect doesn't
  // re-fire every time searchParams changes (which would recreate updateParam)
  const updateParamRef = useRef(updateParam)
  useEffect(() => { updateParamRef.current = updateParam })

  // Debounced search — deps are only searchValue + searchParams (not updateParam)
  useEffect(() => {
    const current = searchParams.get('search') ?? ''
    if (searchValue === current) return
    if (searchValue && searchValue.length < 2) return
    const t = setTimeout(() => updateParamRef.current('search', searchValue), 300)
    return () => clearTimeout(t)
  }, [searchValue, searchParams])

  // Active filter introspection for chips
  const operation = searchParams.get('operation_type') ?? ''
  const propertyType = searchParams.get('property_type') ?? ''
  const bedrooms = searchParams.get('bedrooms') ?? ''
  const minPrice = searchParams.get('min_price') ?? ''
  const maxPrice = searchParams.get('max_price') ?? ''
  const search = searchParams.get('search') ?? ''
  const priceValue = `${minPrice}_${maxPrice}`

  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = []
    if (operation) {
      const op = OPERATIONS.find((o) => o.value === operation)
      if (op) chips.push({ key: 'op', label: op.label, onRemove: () => updateParam('operation_type', '') })
    }
    if (propertyType) {
      const pt = PROPERTY_TYPES.find((o) => o.value === propertyType)
      if (pt) chips.push({ key: 'pt', label: pt.label, onRemove: () => updateParam('property_type', '') })
    }
    if (bedrooms) {
      chips.push({
        key: 'br', label: `${bedrooms}+ hab.`,
        onRemove: () => updateParam('bedrooms', ''),
      })
    }
    if (minPrice || maxPrice) {
      const pr = PRICE_RANGES.find((r) => r.value === priceValue)
      chips.push({
        key: 'pr', label: pr?.label ?? 'Precio personalizado',
        onRemove: () => updateParams({ min_price: '', max_price: '' }),
      })
    }
    if (search) {
      chips.push({
        key: 's', label: `"${search}"`,
        onRemove: () => { setSearchValue(''); updateParam('search', '') },
      })
    }
    return chips
  }, [operation, propertyType, bedrooms, minPrice, maxPrice, priceValue, search, updateParam, updateParams])

  const activeCount = activeChips.length
  const hasActive = activeCount > 0

  const clearAll = () => {
    setSearchValue('')
    router.push('/propiedades', { scroll: false })
  }

  const clearSearch = () => {
    setSearchValue('')
    searchInputRef.current?.focus()
    if (searchParams.get('search')) updateParam('search', '')
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl border-b border-outline-variant/40 sticky top-20 z-40 shadow-navbar">
      <div className="container-narrow py-3.5">
        {/* ─── Main row ─────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div
            className={cn(
              'relative flex items-center gap-2.5 h-11 pl-4 pr-2 flex-1 min-w-0 rounded-full',
              'bg-surface-container-low border border-transparent',
              'focus-within:bg-white focus-within:border-primary focus-within:shadow-editorial',
              'transition-all duration-150',
            )}
          >
            <Search size={15} className="text-on-surface-variant shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar por barrio, dirección, ciudad…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="font-body text-sm bg-transparent outline-none w-full placeholder:text-on-surface-variant/70 text-on-surface"
              aria-label="Buscar propiedades"
            />
            {searchValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container cursor-pointer shrink-0"
                aria-label="Borrar búsqueda"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Segmented operation control (desktop) */}
          <div className="hidden lg:inline-flex items-center h-11 p-1 rounded-full bg-surface-container-low border border-outline-variant/40">
            {OPERATIONS.map(({ value, label, Icon }) => {
              const active = operation === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateParam('operation_type', active ? '' : value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 h-full px-3.5 rounded-full font-body text-xs font-semibold',
                    'tracking-wide cursor-pointer transition-all duration-150',
                    active
                      ? 'bg-primary text-white shadow-editorial'
                      : 'text-on-surface-variant hover:text-primary',
                  )}
                  aria-pressed={active}
                >
                  <Icon size={13} strokeWidth={2.5} />
                  {label}
                </button>
              )
            })}
          </div>

          {/* Secondary dropdowns (desktop) */}
          <div className="hidden xl:flex items-center gap-2">
            <FilterDropdown
              label="Tipo"
              value={propertyType}
              options={PROPERTY_TYPES}
              onChange={(v) => updateParam('property_type', v)}
              Icon={Home}
            />
            <FilterDropdown
              label="Habitaciones"
              value={bedrooms}
              options={BEDROOMS}
              onChange={(v) => updateParam('bedrooms', v)}
              Icon={BedDouble}
            />
            <FilterDropdown
              label="Precio"
              value={minPrice || maxPrice ? priceValue : ''}
              options={PRICE_RANGES}
              onChange={(v) => {
                const [min, max] = v.split('_')
                updateParams({ min_price: min, max_price: max })
              }}
              Icon={DollarSign}
              align="right"
            />
          </div>

          {/* Filters button (mobile + tablet + lg hides xl shows) */}
          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              'xl:hidden inline-flex items-center gap-2 h-11 px-4 rounded-full cursor-pointer shrink-0',
              'font-body text-sm font-semibold transition-colors border',
              hasActive
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-outline-variant/60 hover:border-primary',
            )}
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Más filtros</span>
            <span className="sm:hidden">Filtros</span>
            {hasActive && (
              <span className={cn(
                'min-w-5 h-5 px-1 inline-flex items-center justify-center rounded-full',
                'text-[11px] font-bold leading-none',
                hasActive && operation ? 'bg-white text-primary' : 'bg-secondary-fixed text-primary',
              )}>
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* ─── Active chips row ─────────────────────────────────── */}
        {hasActive && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="font-body text-[10px] uppercase tracking-[0.18em] text-on-surface-variant font-semibold">
              Filtros:
            </span>
            {activeChips.map((chip) => (
              <FilterChip key={chip.key} label={chip.label} onRemove={chip.onRemove} />
            ))}
            <button
              onClick={clearAll}
              className="ml-1 font-body text-xs text-on-surface-variant hover:text-primary underline-offset-4 hover:underline cursor-pointer"
            >
              Limpiar todo
            </button>
          </div>
        )}
      </div>

      {/* ─── Mobile bottom sheet ──────────────────────────────── */}
      {mobileOpen && (
        <div
          className="xl:hidden fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 bg-white max-h-[88vh] rounded-t-3xl overflow-hidden flex flex-col shadow-editorial-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="pt-3 pb-2 flex justify-center shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-outline-variant/60" />
            </div>

            <div className="px-5 pb-3 flex items-center justify-between shrink-0">
              <div>
                <p className="font-headline text-primary font-bold text-xl leading-tight">Filtros</p>
                <p className="font-body text-xs text-on-surface-variant mt-0.5">
                  Refiná la búsqueda por tipo, precio y más
                </p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 rounded-full text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
                aria-label="Cerrar filtros"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-7 overflow-y-auto flex-1">
              {/* Operation */}
              <section>
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-2.5 block">
                  Operación
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {OPERATIONS.map(({ value, label, Icon }) => {
                    const active = operation === value
                    return (
                      <button
                        key={value}
                        onClick={() => updateParam('operation_type', active ? '' : value)}
                        className={cn(
                          'flex flex-col items-center justify-center gap-1.5 h-20 rounded-2xl cursor-pointer',
                          'font-body text-xs font-semibold transition-all border',
                          active
                            ? 'bg-primary text-white border-primary shadow-editorial'
                            : 'bg-surface-container-low text-on-surface border-transparent hover:border-primary/40',
                        )}
                      >
                        <Icon size={18} strokeWidth={2} />
                        {label}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Property type */}
              <section>
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-2.5 block">
                  Tipo de propiedad
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((t) => {
                    const active = propertyType === t.value
                    return (
                      <button
                        key={t.value || 'any'}
                        onClick={() => updateParam('property_type', active ? '' : t.value)}
                        className={cn(
                          'h-10 px-4 rounded-full font-body text-sm font-medium cursor-pointer',
                          'transition-all border',
                          active
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-on-surface border-outline-variant/50 hover:border-primary',
                        )}
                      >
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Bedrooms */}
              <section>
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-2.5 block">
                  Habitaciones
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['', '1', '2', '3', '4'].map((v) => {
                    const active = bedrooms === v
                    return (
                      <button
                        key={v || 'any'}
                        onClick={() => updateParam('bedrooms', v)}
                        className={cn(
                          'h-12 rounded-xl font-body text-sm font-semibold transition-all cursor-pointer border',
                          active
                            ? 'bg-primary text-white border-primary'
                            : 'bg-surface-container-low text-on-surface border-transparent hover:border-primary/40',
                        )}
                      >
                        {v === '' ? 'Todas' : `${v}+`}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Price */}
              <section>
                <label className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold mb-2.5 block">
                  Rango de precio
                </label>
                <div className="flex flex-col gap-2">
                  {PRICE_RANGES.map((r) => {
                    const active = priceValue === r.value || (r.value === '_' && !minPrice && !maxPrice)
                    return (
                      <button
                        key={r.value}
                        onClick={() => {
                          const [min, max] = r.value.split('_')
                          updateParams({ min_price: min, max_price: max })
                        }}
                        className={cn(
                          'flex items-center justify-between h-12 px-4 rounded-xl cursor-pointer',
                          'font-body text-sm transition-all border',
                          active
                            ? 'bg-secondary-fixed/60 text-primary border-secondary/30 font-semibold'
                            : 'bg-surface-container-low text-on-surface border-transparent hover:border-primary/40',
                        )}
                      >
                        <span>{r.label}</span>
                        {active && <Check size={16} className="text-secondary" strokeWidth={2.5} />}
                      </button>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* Sticky footer */}
            <div className="border-t border-outline-variant/40 px-5 py-4 flex gap-3 shrink-0 bg-white">
              <button
                onClick={clearAll}
                disabled={!hasActive}
                className={cn(
                  'flex-1 h-12 rounded-full font-body text-sm font-semibold cursor-pointer border transition-colors',
                  hasActive
                    ? 'border-outline-variant text-on-surface hover:bg-surface-container-low'
                    : 'border-outline-variant/40 text-on-surface-variant/50 cursor-not-allowed',
                )}
              >
                Limpiar
              </button>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex-[1.4] h-12 rounded-full font-body text-sm font-semibold bg-primary text-white hover:bg-primary-800 cursor-pointer transition-colors shadow-editorial"
              >
                {hasActive ? `Aplicar (${activeCount})` : 'Ver resultados'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
