import { OFFERS } from '../../data/content'
import Button from '../ui/Button'
import SafeImage from '../ui/SafeImage'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

export default function SpecialOffers() {
  return (
    <section id="offers" className="bg-latte py-16 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Special Offers"
          title="Today’s pours, sweeter deals"
          description="Limited café specials designed for slow mornings, shared desserts, and a second cup you did not plan on."
        />

        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((offer, index) => (
            <ScrollReveal key={offer.id} delay={index * 0.08} className={`h-full ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <article className="group hover-lift relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl sm:min-h-[360px]">
                <SafeImage
                  src={offer.image}
                  alt={offer.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/70 to-espresso/20" />
                <span className="card-shine" />
                <span className="animate-badge absolute right-5 top-5 z-[2] rounded-full bg-caramel px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-espresso shadow-lg">
                  {offer.discount}
                </span>
                <div className="relative z-[2] mt-auto p-6 sm:p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-caramel">{offer.subtitle}</p>
                  <h3 className="mt-2 font-display text-2xl text-cream sm:text-3xl">{offer.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">{offer.description}</p>
                  <Button href="#menu" className="mt-6">
                    {offer.cta}
                  </Button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
