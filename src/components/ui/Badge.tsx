import { cn } from '@/lib/utils'
import type { OperationType } from '@/types'

interface BadgeProps {
  type: OperationType
  className?: string
}

const typeStyles: Record<OperationType, string> = {
  venta: 'bg-primary text-white',
  alquiler: 'bg-secondary-fixed text-primary',
  alquiler_temporal: 'bg-secondary text-white',
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
        'font-body text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded',
        typeStyles[type],
        className,
      )}
    >
      {typeLabels[type]}
    </span>
  )
}
