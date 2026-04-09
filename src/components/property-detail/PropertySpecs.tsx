import type { LucideIcon } from 'lucide-react'
import { BedDouble, Bath, Maximize2, Building2, CarFront, Calendar } from 'lucide-react'
import type { PropertyDetail } from '@/types'

interface PropertySpecsProps {
  property: PropertyDetail
}

export default function PropertySpecs({ property }: PropertySpecsProps) {
  const specs = [
    property.bedrooms != null && {
      icon: BedDouble,
      value: property.bedrooms,
      label: property.bedrooms === 1 ? 'Habitación' : 'Habitaciones',
    },
    property.bathrooms != null && {
      icon: Bath,
      value: property.bathrooms,
      label: property.bathrooms === 1 ? 'Baño' : 'Baños',
    },
    property.total_sqm != null && {
      icon: Maximize2,
      value: `${property.total_sqm} m²`,
      label: 'Superficie Total',
    },
    property.covered_sqm != null && {
      icon: Building2,
      value: `${property.covered_sqm} m²`,
      label: 'Sup. Cubierta',
    },
    property.garages != null && property.garages > 0 && {
      icon: CarFront,
      value: property.garages,
      label: property.garages === 1 ? 'Cochera' : 'Cocheras',
    },
    property.year_built != null && {
      icon: Calendar,
      value: property.year_built,
      label: 'Año de Construcción',
    },
  ].filter(Boolean) as Array<{
    icon: LucideIcon
    value: string | number
    label: string
  }>

  if (specs.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 border border-surface-2">
      {specs.map(({ icon: Icon, value, label }, i) => (
        <div
          key={label}
          className={[
            'flex flex-col items-center justify-center py-5 px-3 text-center',
            i < specs.length - 1 ? 'border-r border-surface-2' : '',
          ].join(' ')}
        >
          <Icon size={20} className="text-gold mb-2" />
          <span className="font-cinzel text-navy font-semibold text-lg leading-none mb-1">
            {value}
          </span>
          <span className="font-josefin text-xs text-text-muted tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  )
}
