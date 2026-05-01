'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center bg-gradient-to-br from-cream via-cream-dark to-cream">
      <div className="mx-auto grid max-w-7xl flex-1 items-center gap-8 px-4 py-16 sm:px-6 lg:px-8 md:grid-cols-2 md:py-24">
        {/* Text */}
        <div className="order-2 flex flex-col items-start justify-center md:order-1">
          <AnimateOnScroll delay={0}>
            <h1 className="font-anton text-5xl uppercase tracking-wide text-primary md:text-7xl lg:text-8xl">
              Central de Hamburguesas
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <h2 className="sr-only">Sabor que Manda</h2>
            <span className="mt-2 font-anton text-6xl uppercase tracking-wide text-text md:text-8xl lg:text-9xl">
              Sabor que Manda
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="mt-6 max-w-lg font-body text-lg text-text-muted md:text-xl">
              La central del sabor urbano. Hamburguesas, boneless, hot dogs y más. ¡Directo a tu puerta!
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#menu" variant="secondary" size="lg">
                Ver Menú
              </Button>
              <Button
                href="https://wa.me/5215519082651"
                variant="primary"
                size="lg"
              >
                Pedir por WhatsApp
              </Button>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Image */}
        <div className="order-1 flex items-center justify-center md:order-2">
          <div className="relative aspect-square w-full max-w-lg animate-float">
            <Image
              src="/burger.png"
              alt="Hamburguesa Central de Hamburguesas"
              fill
              priority
              className="scale-x-[-1] object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#combos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted transition-colors hover:text-primary"
        aria-label="Ver combos"
        style={{
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
      >
        <ChevronDown className="h-8 w-8 animate-scroll-indicator" />
      </a>
    </section>
  )
}
