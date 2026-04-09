import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-josefin font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-2',
          {
            primary: 'bg-navy text-white hover:bg-navy-800 focus-visible:ring-2 focus-visible:ring-navy',
            ghost: 'border border-navy text-navy hover:bg-navy hover:text-white',
            gold: 'bg-gold text-navy hover:bg-gold-dark',
          }[variant],
          {
            sm: 'text-xs px-4 py-2',
            md: 'text-sm px-6 py-3',
            lg: 'text-sm px-8 py-4',
          }[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
export default Button
