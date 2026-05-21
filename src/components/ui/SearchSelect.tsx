'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SearchSelectOption {
  value: string
  label: string
}

interface SearchSelectProps {
  name: string
  label: string
  options: SearchSelectOption[]
  defaultValue?: string
  placeholder?: string
  className?: string
}

export default function SearchSelect({
  name,
  label,
  options,
  defaultValue = '',
  placeholder,
  className,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)
  const displayText = selected?.label ?? placeholder ?? options[0]?.label ?? ''

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
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
    <div ref={containerRef} className={cn('relative flex flex-col', className)}>
      <input type="hidden" name={name} value={value} />

      <span className="font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-semibold mb-1">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-between gap-2 bg-transparent border-none p-0 focus:outline-none text-left cursor-pointer group"
      >
        <span
          className={cn(
            'font-body font-medium text-sm truncate',
            selected ? 'text-on-surface' : 'text-outline-variant',
          )}
        >
          {displayText}
        </span>
        <ChevronDown
          size={14}
          className={cn(
            'text-on-surface-variant shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 md:-mx-2 bg-white rounded-lg shadow-editorial-lg border border-outline-variant/40 overflow-hidden z-50 select-dropdown"
        >
          <ul className="max-h-72 overflow-y-auto py-1">
            {options.map((option) => {
              const isActive = option.value === value
              return (
                <li key={option.value || 'any'}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setValue(option.value)
                      setOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors cursor-pointer',
                      'font-body text-sm',
                      isActive
                        ? 'bg-secondary-fixed/40 text-primary font-semibold'
                        : 'text-on-surface hover:bg-surface-container-low',
                    )}
                  >
                    <span className="truncate">{option.label}</span>
                    {isActive && (
                      <Check size={14} className="text-secondary shrink-0" strokeWidth={2.5} />
                    )}
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
