import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

export default function ScrollCup() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 })
  const coffeeY = useTransform(smooth, [0, 1], [58, 12])
  const steamOpacity = useTransform(smooth, [0.12, 0.38], [0, 1])

  if (prefersReducedMotion) return null

  return (
    <div
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 86" className="h-28 w-[72px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
        <defs>
          <clipPath id="cup-inner">
            <path d="M17 24h26v30c0 8.5-5.8 14-13 14s-13-5.5-13-14V24z" />
          </clipPath>
          <linearGradient id="coffee-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="35%" stopColor="#6b3f2a" />
            <stop offset="100%" stopColor="#2a1810" />
          </linearGradient>
        </defs>
        <path
          d="M17 22c0-2.2 2-4 4.8-4h16.4c2.8 0 4.8 1.8 4.8 4v32c0 10-7.2 17-13 17s-13-7-13-17V22z"
          fill="none"
          stroke="#c9a227"
          strokeWidth="2.1"
        />
        <path
          d="M43 30h5.5c3.6 0 6.5 2.8 6.5 6.4s-2.9 6.4-6.5 6.4H43"
          fill="none"
          stroke="#c9a227"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <g clipPath="url(#cup-inner)">
          <motion.rect x="14" width="32" height="62" fill="url(#coffee-fill)" style={{ y: coffeeY }} />
        </g>
        <motion.g
          style={{ opacity: steamOpacity }}
          stroke="#f6ede3"
          strokeWidth="1.35"
          fill="none"
          strokeLinecap="round"
        >
          <path className="steam-draw" d="M24 16c1-5 4-6 3-12" />
          <path className="steam-draw" d="M32 14c1-6 4-7 3-13" style={{ animationDelay: '0.45s' }} />
          <path className="steam-draw" d="M40 16c1-5 3-6 2-11" style={{ animationDelay: '0.9s' }} />
        </motion.g>
      </svg>
      <p className="mt-1 text-center font-display text-[10px] tracking-[0.28em] text-caramel/80">BREW</p>
    </div>
  )
}
