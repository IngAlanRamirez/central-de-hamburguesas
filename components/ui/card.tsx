import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'combo' | 'product' | 'character'
  title: string
  description?: string
  price?: string
  image: string
  href?: string
  badge?: string
}

export function Card({
  variant,
  title,
  description,
  price,
  image,
  href,
  badge,
  children,
  className,
  ...props
}: CardProps) {
  const isCombo = variant === 'combo'
  const isProduct = variant === 'product'
  const isCharacter = variant === 'character'

  const cardContent = (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-cream-dark transition-all duration-300 ease-out',
        isCombo && 'hover:scale-[1.03] hover:shadow-xl hover:border-primary border-2 border-transparent',
        isProduct && 'hover:scale-[1.02] hover:shadow-lg',
        isCharacter && 'hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(196,30,58,0.3)]',
        isCharacter && 'text-center',
        className
      )}
      {...props}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden',
          isCombo && 'aspect-[4/3] w-full',
          isProduct && 'aspect-square w-full',
          isCharacter && 'mx-auto mt-6 h-32 w-32 rounded-xl'
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className={cn(
            'object-cover transition-transform duration-300',
            isCharacter ? 'rounded-xl' : 'group-hover:scale-105'
          )}
          sizes={isCombo ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
        />
      </div>

      {/* Badge */}
      {badge && (
        <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
          {badge}
        </span>
      )}

      {/* Content */}
      <div className={cn('p-5', isCharacter && 'pb-6')}>        
        <h3
          className={cn(
            'font-display uppercase tracking-wide text-text',
            isCombo && 'text-2xl',
            isProduct && 'text-xl',
            isCharacter && 'text-lg'
          )}
        >
          {title}
        </h3>

        {description && isCombo && (
          <p className="mt-1 text-sm leading-relaxed text-text-muted font-body">
            {description}
          </p>
        )}

        {price && (isCombo || isProduct) && (
          <p className="mt-2 font-mono text-lg font-bold text-primary">
            {price}
          </p>
        )}

        {/* Render any additional children (e.g. CTA button) */}
        {children}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {cardContent}
      </a>
    )
  }

  return cardContent
}
