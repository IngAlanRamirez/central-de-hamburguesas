'use client'

import { cn } from '@/lib/utils'

interface QuantityPillProps {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  className?: string
}

export function QuantityPill({ quantity, onIncrement, onDecrement, className }: QuantityPillProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5', className)}>
      <button
        onClick={onDecrement}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
        aria-label="Disminuir cantidad"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
      
      <span className="min-w-[1.25rem] text-center text-sm font-bold text-white">
        {quantity}
      </span>
      
      <button
        onClick={onIncrement}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
        aria-label="Aumentar cantidad"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  )
}
