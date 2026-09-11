import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  type = 'button',
  ...props
}) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 16, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 280, damping: 16, mass: 0.35 })

  const base =
    'group group/btn relative inline-flex min-h-11 cursor-pointer overflow-hidden items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_10px_24px_rgba(201,162,39,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6'

  const variants = {
    primary: 'bg-caramel text-espresso hover:bg-gold',
    secondary: 'border border-cream/40 bg-transparent text-cream hover:border-caramel hover:bg-cream hover:text-espresso',
    dark: 'bg-espresso text-cream hover:bg-coffee',
    ghost: 'border border-espresso/15 bg-transparent text-espresso hover:border-caramel hover:text-coffee',
  }

  const buttonClassName = `${base} ${variants[variant] ?? variants.primary} ${className}`

  const onMove = (event) => {
    if (prefersReducedMotion || !ref.current) return
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.22)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.28)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const inner = (
    <>
      <span className="relative z-[1]">{children}</span>
      <span className="card-shine rounded-full" />
    </>
  )

  const motionProps = {
    ref,
    className: buttonClassName,
    style: { x: springX, y: springY },
    whileTap: { scale: 0.96 },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    ...props,
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} {...motionProps}>
      {inner}
    </motion.button>
  )
}
