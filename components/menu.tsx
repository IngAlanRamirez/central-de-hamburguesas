'use client'

import { useState, type ReactNode } from 'react'
import { Section } from '@/components/ui/section'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { cn } from '@/lib/utils'
import Hamburguesas from '@/components/hamburguesas'
import HotDogs from '@/components/hot-dogs'
import Boneless from '@/components/boneless'
import Wings from '@/components/wings'
import Crepas from '@/components/crepas'
import Platanos from '@/components/platanos'
import Papas from '@/components/papas'
import Costillas from '@/components/costillas'
import Bebidas from '@/components/bebidas'

type Category = 'Hamburguesas' | 'Boneless' | 'Hot Dogs' | 'Wings' | 'Crepas' | 'Plátanos' | 'Papas' | 'Costillas' | 'Bebidas'

const categories: Category[] = [
  'Hamburguesas',
  'Boneless',
  'Hot Dogs',
  'Wings',
  'Crepas',
  'Plátanos',
  'Papas',
  'Costillas',
  'Bebidas',
]

const categoryComponents: Record<Category, ReactNode> = {
  Hamburguesas: <Hamburguesas />,
  Boneless: <Boneless />,
  'Hot Dogs': <HotDogs />,
  Wings: <Wings />,
  Crepas: <Crepas />,
  Plátanos: <Platanos />,
  Papas: <Papas />,
  Costillas: <Costillas />,
  Bebidas: <Bebidas />,
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<Category>('Hamburguesas')

  return (
    <Section id="menu" title="Nuestro Menú" subtitle="Todo lo que se te antoje">
      <AnimateOnScroll direction="fade">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                'relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors',
                activeTab === cat ? 'text-primary' : 'text-text-muted hover:text-text'
              )}
            >
              {cat}
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-[2px] w-full origin-left bg-primary transition-transform duration-300 ease-out',
                  activeTab === cat ? 'scale-x-100' : 'scale-x-0'
                )}
              />
            </button>
          ))}
        </div>
      </AnimateOnScroll>

      {categoryComponents[activeTab]}
    </Section>
  )
}
