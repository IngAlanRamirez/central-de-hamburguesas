import { cn } from '@/lib/utils'
import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg font-body font-medium transition-all duration-200 ease-[var(--ease-smooth)] will-change-transform'

  const variantClasses = {
    primary:
      'bg-primary text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'border-2 border-primary text-primary bg-transparent hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  }

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (href && !disabled) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
