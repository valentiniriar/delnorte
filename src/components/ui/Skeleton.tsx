import { cn } from '@/lib/utils'

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse bg-surface-2 rounded-none', className)}
      aria-hidden="true"
    />
  )
}
