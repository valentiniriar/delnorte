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
      label: 'Superficie total',
    },
    property.covered_sqm != null && {
      icon: Building2,
      value: `${property.covered_sqm} m²`,
      label: 'Sup. cubierta',
    },
    property.garages != null && property.garages > 0 && {
      icon: CarFront,
      value: property.garages,
      label: property.garages === 1 ? 'Cochera' : 'Cocheras',
    },
    property.year_built != null && {
      icon: Calendar,
      value: property.year_built,
      label: 'Construcción',
    },
  ].filter(Boolean) as Array<{
    icon: LucideIcon
    value: string | number
    label: string
  }>

  if (specs.length === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-white rounded-xl shadow-editorial overflow-hidden">
      {specs.map(({ icon: Icon, value, label }, i) => (
        <div
          key={label}
          className={[
            'flex flex-col items-center justify-center py-6 px-3 text-center',
            i < specs.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-outline-variant/30' : '',
            i < specs.length - 2 && i % 2 === 0 ? 'border-b sm:border-b-0' : '',
          ].join(' ')}
        >
          <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center mb-3">
            <Icon size={16} className="text-primary" />
          </div>
          <span className="font-headline text-primary font-bold text-xl leading-none mb-1.5 tracking-tight">
            {value}
          </span>
          <span className="font-body text-xs text-on-surface-variant tracking-wide">{label}</span>
        </div>
      ))}
    </div>
  )
}
