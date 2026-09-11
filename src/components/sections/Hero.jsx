import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import Button from '../ui/Button'
import SplitText from '../effects/SplitText'
import CoffeeVapour from '../effects/CoffeeVapour'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const introDelay = prefersReducedMotion ? 0 : 3.35
  const frameRef = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 120, damping: 14 })
  const springY = useSpring(rotateY, { stiffness: 120, damping: 14 })

  const onMove = (event) => {
    if (prefersReducedMotion || !frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 8)
    rotateX.set(-py * 8)
  }

  const onLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <section id="home" className="section-grain relative min-h-dvh overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover opacity-40"
          onError={(event) => {
            event.currentTarget.src =
              'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/88 to-espresso/55" />
      </div>

      <span className="animate-glow pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-caramel/15 blur-3xl" />
      <span className="animate-glow pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-mocha/40 blur-3xl" />
      <CoffeeVapour className="hidden md:block" />

      <div className="container-page relative z-[2] grid min-h-dvh items-center gap-8 pb-20 pt-24 text-center md:gap-10 lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-24 lg:text-left desktop:gap-20">
        <div className="mx-auto w-full max-w-xl lg:mx-0">
          <motion.p
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-caramel sm:text-xs"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.32em' }}
            transition={{ duration: 1, delay: introDelay }}
          >
            Welcome to Aroma Haven
          </motion.p>
          <h1 className="font-display text-[clamp(1.85rem,7.2vw,4.5rem)] leading-[1.12] text-cream">
            <SplitText text="Brewed with Heart." delay={introDelay + 0.1} as="span" />
            <SplitText
              text="Served with Soul."
              delay={introDelay + 0.4}
              as="span"
              italic
              className="mt-1 block text-caramel"
            />
          </h1>
          <motion.p
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-cream/75 sm:text-base lg:mx-0"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: introDelay + 0.65 }}
          >
            Handcrafted espresso, slow-roasted beans, and a warm corner of Indiranagar, Bengaluru
            where every cup tells a story. Come for the coffee — stay for the atmosphere.
          </motion.p>
          <motion.div
            className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: introDelay + 0.85 }}
          >
            <Button href="#menu">Explore Menu</Button>
            <Button href="#contact" variant="secondary">
              Visit Café
            </Button>
          </motion.div>
        </div>

        <motion.div
          ref={frameRef}
          className="relative mx-auto w-full max-w-[420px] lg:px-0"
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: 'preserve-3d',
            transformPerspective: 1100,
          }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: introDelay + 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-glow absolute inset-6 rounded-full bg-caramel/30 blur-3xl" />
          <span className="coffee-ripple pointer-events-none" />
          <span className="coffee-ripple pointer-events-none" style={{ animationDelay: '1.1s' }} />
          <span className="orbit-bean hidden lg:block" style={{ '--orbit-r': '208px', '--orbit-t': '16s' }} />
          <span
            className="orbit-bean hidden lg:block"
            style={{ '--orbit-r': '188px', '--orbit-t': '12s', '--orbit-d': '-4s' }}
          />
          <span
            className="orbit-bean hidden lg:block"
            style={{ '--orbit-r': '226px', '--orbit-t': '20s', '--orbit-d': '-9s' }}
          />

          <div className="animate-float relative mx-auto aspect-square w-[min(100%,420px)]">
            <CoffeeVapour fromCup />
            <img
              src="/images/hero-cup.jpg"
              alt="A freshly poured cappuccino with latte art"
              className="h-full w-full rounded-full object-cover ring-4 ring-caramel/35 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              onError={(event) => {
                event.currentTarget.src =
                  'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80'
              }}
            />
            <motion.div
              className="absolute left-1 bottom-8 rounded-2xl border border-cream/15 bg-espresso/80 px-3 py-2.5 backdrop-blur-md sm:-left-6 sm:bottom-10 sm:px-4 sm:py-3"
              style={{ transform: 'translateZ(36px)' }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: introDelay + 0.55, type: 'spring' }}
            >
              <p className="font-display text-cream">Since 2014</p>
              <p className="text-xs text-cream/60">Small-batch roasted</p>
            </motion.div>
            <motion.div
              className="absolute right-1 top-8 rounded-full bg-caramel px-3 py-1.5 text-[10px] font-semibold text-espresso shadow-lg sm:-right-4 sm:top-12 sm:px-4 sm:py-2 sm:text-xs"
              style={{ transform: 'translateZ(48px)' }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: introDelay + 0.7, type: 'spring', stiffness: 220 }}
            >
              Barista&apos;s Choice
            </motion.div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-cream/60 sm:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-cream/15">
          <span className="absolute inset-x-0 h-1/2 animate-float bg-caramel" />
        </span>
      </a>
    </section>
  )
}
