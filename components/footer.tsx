import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Instagram, Facebook } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'

export default function Footer() {
  return (
    <footer className="bg-accent text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo + tagline */}
          <AnimateOnScroll delay={0}>
            <div>
              <div className="relative h-12 w-[180px]">
                <Image
                  src="/Logo.png"
                  alt="Central de Hamburguesas"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <p className="mt-4 font-display text-lg uppercase tracking-wide text-secondary">
                Sabor que Manda
              </p>
            </div>
          </AnimateOnScroll>

          {/* Col 2: Horarios */}
          <AnimateOnScroll delay={150}>
            <div>
              <h4 className="font-display text-lg uppercase tracking-wide text-secondary">
                Horarios
              </h4>
              <ul className="mt-4 space-y-2 font-body text-sm text-cream/80">
                <li>Lun-Jue: 12pm - 10pm</li>
                <li>Vie-Dom: 12pm - 11pm</li>
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Col 3: Contacto */}
          <AnimateOnScroll delay={300}>
            <div>
              <h4 className="font-display text-lg uppercase tracking-wide text-secondary">
                Contacto
              </h4>
              <div className="mt-4 space-y-3">
                <div className="relative inline-block">
                  <div className="animate-pulse-ring pointer-events-none absolute inset-0 rounded-full" />
                  <Button
                    href="https://wa.me/5215519082651"
                    variant="secondary"
                    size="sm"
                  >
                    WhatsApp
                  </Button>
                </div>
                <p className="font-body text-sm text-cream/80">CDMX</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Col 4: Redes */}
          <AnimateOnScroll delay={450}>
            <div>
              <h4 className="font-display text-lg uppercase tracking-wide text-secondary">
                Síguenos
              </h4>
              <div className="mt-4 flex gap-4">
                <a
                  href="#"
                  className="rounded-full bg-cream/10 p-2 text-cream transition-colors hover:bg-cream/20"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-cream/10 p-2 text-cream transition-colors hover:bg-cream/20"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-cream/10 pt-8 text-center font-body text-sm text-cream/60">
          © 2025 Central de Hamburguesas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
