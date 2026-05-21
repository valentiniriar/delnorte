import { cn } from '@/lib/utils'

export default function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'font-body text-xs font-bold tracking-[0.2em] uppercase text-secondary block mb-4',
        className,
      )}
    >
      {children}
    </span>
  )
}
