import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = 'center',
}) {
  const aligned = align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left w-full'

  return (
    <ScrollReveal className={`mb-10 sm:mb-14 ${aligned}`}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-caramel sm:text-xs">
        {eyebrow}
      </p>
      <h2
        className={`font-display text-[clamp(1.65rem,5.4vw,3.15rem)] leading-tight ${
          light ? 'text-cream' : 'text-espresso'
        }`}
      >
        {title}
      </h2>
      <motion.span
        className={`mt-4 block h-px w-16 origin-center bg-caramel ${align === 'center' ? 'mx-auto' : 'origin-left'}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
      />
      {description ? (
        <p className={`mt-4 text-sm leading-relaxed sm:text-base ${light ? 'text-cream/70' : 'text-coffee/75'}`}>
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  )
}
