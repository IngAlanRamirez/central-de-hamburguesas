'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
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
      'bg-primary text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'border-2 border-primary text-primary bg-transparent hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'bg-transparent text-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed',
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

  const springTransition = { type: 'spring' as const, stiffness: 400 }

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={springTransition}
      >
        {children}
      </motion.a>
    )
  }

  // Use a motion wrapper to avoid React 19 + Framer Motion type conflicts
  // with native button event handlers (onDrag, etc.)
  return (
    <motion.button
      className={classes}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={springTransition}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  )
}
