import type { LucideIcon } from 'lucide-react'
import {
  Waves, Trees, Zap, Wifi, Wind, Tv2, Car, ShieldCheck,
  Dumbbell, Sun, Coffee, Utensils, Building2,
} from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

interface PropertyAmenitiesProps {
  amenities: string[]
  hasPool: boolean
  hasGarden: boolean
  hasElevator: boolean
}

const amenityIcons: Record<string, LucideIcon> = {
  piscina: Waves,
  jardin: Trees,
  gas_natural: Zap,
  wifi: Wifi,
  aire_acondicionado: Wind,
  television: Tv2,
  cochera: Car,
  seguridad: ShieldCheck,
  gimnasio: Dumbbell,
  solarium: Sun,
  parrilla: Coffee,
  cocina_equipada: Utensils,
}

const amenityLabels: Record<string, string> = {
  piscina: 'Piscina',
  jardin: 'Jardín',
  gas_natural: 'Gas Natural',
  wifi: 'WiFi',
  aire_acondicionado: 'Aire Acondicionado',
  television: 'TV Cable',
  cochera: 'Cochera',
  seguridad: 'Seguridad 24h',
  gimnasio: 'Gimnasio',
  solarium: 'Solarium',
  parrilla: 'Parrilla',
  cocina_equipada: 'Cocina Equipada',
}

export default function PropertyAmenities({
  amenities,
  hasPool,
  hasGarden,
  hasElevator,
}: PropertyAmenitiesProps) {
  const allAmenities = [
    ...amenities,
    ...(hasPool ? ['piscina'] : []),
    ...(hasGarden ? ['jardin'] : []),
  ]

  if (allAmenities.length === 0 && !hasElevator) return null

  return (
    <div>
      <SectionLabel>Características</SectionLabel>
      <h3 className="font-cinzel text-navy font-semibold text-xl mb-6">Comodidades</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {allAmenities.map((amenity) => {
          const Icon = amenityIcons[amenity] ?? ShieldCheck
          const label = amenityLabels[amenity] ?? amenity
          return (
            <div
              key={amenity}
              className="flex items-center gap-3 p-3 bg-surface border border-surface-2"
            >
              <Icon size={16} className="text-gold shrink-0" />
              <span className="font-josefin text-sm text-text">{label}</span>
            </div>
          )
        })}
        {hasElevator && (
          <div className="flex items-center gap-3 p-3 bg-surface border border-surface-2">
            <Building2 size={16} className="text-gold shrink-0" />
            <span className="font-josefin text-sm text-text">Ascensor</span>
          </div>
        )}
      </div>
    </div>
  )
}
