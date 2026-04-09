import { cn } from '@/lib/utils'
import type { OperationType } from '@/types'

interface BadgeProps {
  type: OperationType
  className?: string
}

const typeStyles: Record<OperationType, string> = {
  venta: 'bg-navy text-white',
  alquiler: 'bg-gold text-navy',
  alquiler_temporal: 'bg-navy-800 text-gold',
}

const typeLabels: Record<OperationType, string> = {
  venta: 'Venta',
  alquiler: 'Alquiler',
  alquiler_temporal: 'Temporal',
}

export default function Badge({ type, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'font-josefin text-xs font-semibold tracking-widest uppercase px-3 py-1',
        typeStyles[type],
        className,
      )}
    >
      {typeLabels[type]}
    </span>
  )
}
