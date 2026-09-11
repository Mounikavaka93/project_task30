import { motion } from 'framer-motion'
import { STATS } from '../../data/content'
import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-latte py-16 sm:py-24 lg:py-28">
      <div className="container-page grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-xl overflow-hidden pb-8 sm:overflow-visible lg:mx-0 lg:max-w-none">
          <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 rounded-tl-3xl border-l-2 border-t-2 border-caramel/70 sm:-left-4 sm:-top-4 sm:h-24 sm:w-24" />
          <div className="pointer-events-none absolute bottom-8 right-0 h-16 w-16 rounded-br-3xl border-b-2 border-r-2 border-caramel/70 sm:-bottom-4 sm:-right-4 sm:h-24 sm:w-24" />
          <motion.div
            className="relative z-[1] overflow-hidden rounded-3xl bg-coffee shadow-xl"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/images/about-cafe.jpg"
              alt="Warm interior of Aroma Haven coffee shop"
              className="h-[240px] w-full object-cover sm:h-[420px] lg:h-[500px] desktop:h-[540px]"
              width="1400"
              height="900"
              onError={(event) => {
                event.currentTarget.src =
                  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80'
              }}
            />
          </motion.div>
          <motion.div
            className="absolute bottom-2 left-3 z-[2] max-w-[min(100%-1.5rem,220px)] rounded-2xl bg-espresso px-4 py-3 text-cream shadow-xl sm:left-8 sm:px-5 sm:py-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            <p className="font-display text-2xl text-caramel">House Roast</p>
            <p className="text-xs leading-relaxed text-cream/70">
              Sourced from small farms, roasted weekly in-house.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col justify-center">
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="A neighborhood café with a craftsman’s soul"
            description="Aroma Haven began as a two-person roasting bench in Bengaluru and a single copper espresso machine. Today we still grind, steam, and pour the same way — slowly, and with care."
          />
          <ScrollReveal delay={0.1}>
            <p className="text-sm leading-relaxed text-coffee/80 sm:text-base">
              From origin lots to the last swirl of foam, every drink is a collaboration between our
              roasters and baristas. Pull up a chair, stay awhile, and let the aroma do the rest.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-3 gap-1.5 sm:gap-6">
            {STATS.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                delay={0.08 * index}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <p className="font-display text-2xl text-espresso sm:text-3xl lg:text-4xl">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <span className="mt-2 block h-px w-10 bg-caramel" />
                <p className="mt-2 text-[10px] leading-tight uppercase tracking-wider text-mocha sm:text-xs">
                  {stat.label}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
