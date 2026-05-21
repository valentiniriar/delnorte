'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Search } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'
import SearchSelect from '@/components/ui/SearchSelect'

const operationOptions = [
  { value: '', label: 'Todas las operaciones' },
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
  { value: 'alquiler_temporal', label: 'Alquiler temporal' },
]

const propertyTypeOptions = [
  { value: '', label: 'Todos los tipos' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Departamento' },
  { value: 'lote', label: 'Lote' },
  { value: 'local_comercial', label: 'Local comercial' },
]

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headlineRef.current, subRef.current, searchRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.1,
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden bg-primary">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(115deg, rgba(4,22,39,0.78) 0%, rgba(4,22,39,0.38) 55%, rgba(4,22,39,0.18) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-8 pt-24 md:pt-0">
        <h1
          ref={headlineRef}
          className="font-headline text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white mb-6 leading-[1.05] tracking-tight max-w-4xl"
        >
          Tu próximo hogar,
          <br />
          <span className="text-secondary-fixed">en el norte argentino.</span>
        </h1>

        <p
          ref={subRef}
          className="font-body text-white/85 text-base md:text-xl max-w-2xl mb-10 md:mb-12 font-light tracking-wide leading-relaxed"
        >
          Seleccionamos las mejores propiedades en Jujuy y la Quebrada de Humahuaca.
          Venta, alquiler y alquiler temporal con atención personalizada.
        </p>

        <div ref={searchRef}>
          <form
            action="/propiedades"
            method="GET"
            className="bg-white p-2 md:p-3 rounded-xl shadow-editorial-lg flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl"
          >
            <div className="w-full md:flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
              <label className="flex flex-col px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-outline-variant/30">
                <span className="font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-1">
                  Ubicación
                </span>
                <input
                  type="text"
                  name="search"
                  placeholder="¿Dónde?"
                  className="bg-transparent border-none p-0 focus:outline-none text-on-surface font-body font-medium text-sm placeholder:text-outline-variant"
                />
              </label>

              <SearchSelect
                name="operation_type"
                label="Operación"
                options={operationOptions}
                className="px-4 py-3 md:py-2 border-b md:border-b-0 md:border-r border-outline-variant/30"
              />

              <SearchSelect
                name="property_type"
                label="Tipo"
                options={propertyTypeOptions}
                className="px-4 py-3 md:py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-primary hover:bg-primary-800 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all font-body cursor-pointer"
            >
              <Search size={18} />
              <span className="font-bold text-sm tracking-wide">Explorar</span>
            </button>
          </form>
          <p className="mt-4 font-body text-white/60 text-xs tracking-wider">
            + de 50 propiedades curadas en Jujuy
          </p>
        </div>
      </div>
    </section>
  )
}
