'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Combos', href: '#combos' },
  { label: 'Menú', href: '#menu' },
  { label: 'Personajes', href: '#personajes' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-cream/80 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#"
            className={cn(
              'relative transition-all duration-300',
              scrolled ? 'h-8 w-[120px]' : 'h-10 w-[150px]'
            )}
          >
            <Image
              src="/Logo.png"
              alt="Central de Hamburguesas"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100px, 150px"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm font-medium text-text transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="relative">
              <div className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-full" />
              <Button href="https://wa.me/5215519082651" variant="primary" size="sm">
                Pedir
              </Button>
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6 text-text" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-0 z-50 h-full w-72 bg-cream/95 p-6 shadow-xl backdrop-blur-md transition-transform">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl uppercase text-text">Menú</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <X className="h-6 w-6 text-text" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-lg font-medium text-text transition-colors hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                href="https://wa.me/5215519082651"
                variant="primary"
                size="md"
                className="mt-4"
              >
                Pedir
              </Button>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
