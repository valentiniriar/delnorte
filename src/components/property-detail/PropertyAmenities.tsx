import type { LucideIcon } from 'lucide-react'
import {
  Waves, Trees, Zap, Wifi, Wind, Tv2, Car, ShieldCheck,
  Dumbbell, Sun, Coffee, Utensils, Building2,
} from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

function formatAmenityLabel(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

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
  gas_natural: 'Gas natural',
  wifi: 'WiFi',
  aire_acondicionado: 'Aire acondicionado',
  television: 'TV cable',
  cochera: 'Cochera',
  seguridad: 'Seguridad 24h',
  gimnasio: 'Gimnasio',
  solarium: 'Solárium',
  parrilla: 'Parrilla',
  cocina_equipada: 'Cocina equipada',
}

export default function PropertyAmenities({
  amenities,
  hasPool,
  hasGarden,
  hasElevator,
}: PropertyAmenitiesProps) {
  const allAmenities = [
    ...new Set([
      ...amenities,
      ...(hasPool ? ['piscina'] : []),
      ...(hasGarden ? ['jardin'] : []),
    ]),
  ]

  if (allAmenities.length === 0 && !hasElevator) return null

  return (
    <div>
      <SectionLabel>Comodidades</SectionLabel>
      <h3 className="font-headline text-primary font-bold text-2xl md:text-3xl mb-8 tracking-tight">
        Características distintivas
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
        {allAmenities.map((amenity) => {
          const Icon = amenityIcons[amenity] ?? ShieldCheck
          const label = amenityLabels[amenity] ?? formatAmenityLabel(amenity)
          return (
            <div
              key={amenity}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-editorial hover:shadow-editorial-lg transition-shadow"
            >
              <div className="w-9 h-9 shrink-0 rounded-full bg-secondary-fixed flex items-center justify-center">
                <Icon size={15} className="text-primary" />
              </div>
              <span className="font-body text-sm font-medium text-primary">{label}</span>
            </div>
          )
        })}
        {hasElevator && (
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-editorial hover:shadow-editorial-lg transition-shadow">
            <div className="w-9 h-9 shrink-0 rounded-full bg-secondary-fixed flex items-center justify-center">
              <Building2 size={15} className="text-primary" />
            </div>
            <span className="font-body text-sm font-medium text-primary">Ascensor</span>
          </div>
        )}
      </div>
    </div>
  )
}
