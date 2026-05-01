'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: Direction
  threshold?: number
  once?: boolean
}

const directionStyles: Record<Direction, string> = {
  up: 'translate-y-[30px]',
  down: '-translate-y-[30px]',
  left: 'translate-x-[30px]',
  right: '-translate-x-[30px]',
  fade: '',
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(el)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500',
        directionStyles[direction],
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}
