'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/lib/store/cart'
import { Menu, X, ShoppingCart } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Combos', href: '#combos' },
  { label: 'Menú', href: '#menu' },
  { label: 'Personajes', href: '#personajes' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems())
  const openCart = useCartStore((state) => state.openCart)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const badgeMotion = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { type: 'spring' as const, stiffness: 500, damping: 15 },
  }

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
            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2 text-text transition-colors hover:text-primary"
              aria-label={`Carrito, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    {...badgeMotion}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
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
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="mobile-drawer"
              className="fixed right-0 top-0 z-50 h-full w-72 bg-cream/95 p-6 shadow-xl backdrop-blur-md"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
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
                <button
                  onClick={() => {
                    openCart()
                    setMobileOpen(false)
                  }}
                  className="flex items-center gap-3 font-body text-lg font-medium text-text transition-colors hover:text-primary"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Carrito
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        {...badgeMotion}
                        className="ml-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold text-white"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <Button
                  href="https://wa.me/5215519082651"
                  variant="primary"
                  size="md"
                  className="mt-4"
                >
                  Pedir
                </Button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
