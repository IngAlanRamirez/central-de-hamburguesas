import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'

const combos = [
  {
    title: 'Combo Clásico',
    description: 'Hamburguesa + Papas',
    price: '$100',
    image: '/menu/combos/combo-clasico.webp',
    badge: 'Popular',
    message: 'Hola, quiero pedir el Combo Clásico',
  },
  {
    title: 'Combo Rápido',
    description: 'Hot Dog + Papas',
    price: '$80',
    image: '/menu/combos/combo-rapido.webp',
    message: 'Hola, quiero pedir el Combo Rápido',
  },
  {
    title: 'Combo Crunch',
    description: 'Boneless + Papas',
    price: '$105',
    image: '/menu/combos/combo-crunch.webp',
    message: 'Hola, quiero pedir el Combo Crunch',
  },
  {
    title: 'Combo Wings',
    description: 'Alitas + Papas',
    price: '$110',
    image: '/menu/combos/combo-wings.webp',
    message: 'Hola, quiero pedir el Combo Wings',
  },
  {
    title: 'Combo Power',
    description: 'Hamburguesa + Boneless',
    price: '$135',
    image: '/menu/combos/combo-power.webp',
    message: 'Hola, quiero pedir el Combo Power',
  },
  {
    title: 'Combo Mix',
    description: 'Hot Dog + Boneless',
    price: '$110',
    image: '/menu/combos/combo-mix.webp',
    message: 'Hola, quiero pedir el Combo Mix',
  },
  {
    title: 'Combo Antojo Dulce',
    description: 'Plátanos fritos + Papas',
    price: '$80',
    image: '/menu/combos/combo-antojo-dulce.webp',
    message: 'Hola, quiero pedir el Combo Antojo Dulce',
  },
]

export default function Combos() {
  return (
    <Section id="combos" title="Nuestros Combos" subtitle="Los favoritos de la central">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {combos.map((combo, index) => (
          <AnimateOnScroll key={combo.title} delay={index * 150}>
            <Card
              variant="combo"
              title={combo.title}
              description={combo.description}
              price={combo.price}
              image={combo.image}
              badge={combo.badge}
            >
              <Button
                href={`https://wa.me/5215519082651?text=${encodeURIComponent(combo.message)}`}
                variant="primary"
                size="sm"
                className="mt-4 w-full"
              >
                Pedir este combo
              </Button>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  )
}
