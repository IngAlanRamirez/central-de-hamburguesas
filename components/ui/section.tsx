'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  title?: string
  subtitle?: string
  background?: 'cream' | 'cream-dark'
}

export function Section({
  id,
  title,
  subtitle,
  background = 'cream',
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24 lg:py-32 xl:py-40',
        background === 'cream' && 'bg-cream',
        background === 'cream-dark' && 'bg-cream-dark',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <AnimateOnScroll direction="up" className="mb-12 md:mb-16">
            {title && (
              <h2 className="font-display text-4xl uppercase tracking-wide text-text md:text-5xl lg:text-6xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 font-body text-lg text-text-muted md:text-xl">
                {subtitle}
              </p>
            )}
          </AnimateOnScroll>
        )}
        {children}
      </div>
    </section>
  )
}
