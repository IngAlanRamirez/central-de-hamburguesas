import { Section } from '@/components/ui/section'
import { Card } from '@/components/ui/card'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'

const characters = [
  { title: 'Don Burguer', image: '/characters/Don_Burguer.png' },
  { title: 'Tano Banano', image: '/characters/Tano_Banano.png' },
  { title: 'Doggy', image: '/characters/Doggy.png' },
  { title: 'Papas Flow', image: '/characters/Papas_Flow.png' },
  { title: 'Ally Wing', image: '/characters/Ally Wing.png' },
  { title: 'Bonny Less', image: '/characters/Bonny_Less.png' },
]

export default function Characters() {
  return (
    <Section
      id="personajes"
      title="La Familia"
      subtitle="Conoce a los personajes de la central"
      background="cream-dark"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <AnimateOnScroll delay={0} className="col-span-2">
          <Card variant="character" title={characters[0].title} image={characters[0].image} />
        </AnimateOnScroll>
        <AnimateOnScroll delay={100} className="col-span-1">
          <Card variant="character" title={characters[1].title} image={characters[1].image} />
        </AnimateOnScroll>
        <AnimateOnScroll delay={200} className="col-span-1">
          <Card variant="character" title={characters[2].title} image={characters[2].image} />
        </AnimateOnScroll>
        <AnimateOnScroll delay={300} className="col-span-1">
          <Card variant="character" title={characters[3].title} image={characters[3].image} />
        </AnimateOnScroll>
        <AnimateOnScroll delay={400} className="col-span-1">
          <Card variant="character" title={characters[4].title} image={characters[4].image} />
        </AnimateOnScroll>
        <AnimateOnScroll delay={500} className="col-span-2">
          <Card variant="character" title={characters[5].title} image={characters[5].image} />
        </AnimateOnScroll>
      </div>
    </Section>
  )
}
