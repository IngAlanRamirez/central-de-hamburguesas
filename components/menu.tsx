'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'
import { cn } from '@/lib/utils'

type Category = 'Hamburguesas' | 'Boneless' | 'Hot Dogs' | 'Wings' | 'Crepas' | 'Plátanos'

const categories: Category[] = [
  'Hamburguesas',
  'Boneless',
  'Hot Dogs',
  'Wings',
  'Crepas',
  'Plátanos',
]

const menuData: Record<Category, { title: string; price: string; image: string }[]> = {
  Hamburguesas: [
    { title: 'Hamburguesa Clásica', price: '$129', image: '/menu/burgers.jpeg' },
    { title: 'Hamburguesa Doble', price: '$169', image: '/menu/burgers.jpeg' },
  ],
  Boneless: [
    { title: 'Boneless BBQ', price: '$149', image: '/menu/boneless.jpeg' },
    { title: 'Boneless Buffalo', price: '$149', image: '/menu/boneless.jpeg' },
  ],
  'Hot Dogs': [
    { title: 'Hot Dog Sencillo', price: '$89', image: '/menu/hot_dogs.jpeg' },
    { title: 'Hot Dog Especial', price: '$119', image: '/menu/hot_dogs.jpeg' },
  ],
  Wings: [
    { title: 'Alitas BBQ', price: '$129', image: '/menu/wings.jpeg' },
    { title: 'Alitas Picantes', price: '$129', image: '/menu/wings.jpeg' },
  ],
  Crepas: [
    { title: 'Crepa Dulce', price: '$79', image: '/menu/crepas.jpeg' },
    { title: 'Crepa Salada', price: '$89', image: '/menu/crepas.jpeg' },
  ],
  Plátanos: [
    { title: 'Plátano Frito', price: '$69', image: '/menu/platanos.jpeg' },
    { title: 'Plátano con Queso', price: '$79', image: '/menu/platanos.jpeg' },
  ],
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<Category>('Hamburguesas')

  return (
    <Section id="menu" title="Nuestro Menú" subtitle="Todo lo que se te antoje">
      <AnimateOnScroll direction="fade">
        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
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

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {menuData[activeTab].map((item, index) => (
          <AnimateOnScroll key={item.title} delay={index * 100} direction="fade">
            <a
              href={`https://wa.me/5215519082651?text=${encodeURIComponent(`Hola, quiero pedir ${item.title}`)}`}
              className="block"
            >
              <Card
                variant="product"
                title={item.title}
                price={item.price}
                image={item.image}
              />
            </a>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  )
}
