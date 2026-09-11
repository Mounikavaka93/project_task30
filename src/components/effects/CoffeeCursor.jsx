import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function CoffeeCursor() {
  const prefersReducedMotion = useReducedMotion()
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const mouseX = useMotionValue(-80)
  const mouseY = useMotionValue(-80)
  const x = useSpring(mouseX, { stiffness: 420, damping: 28, mass: 0.4 })
  const y = useSpring(mouseY, { stiffness: 420, damping: 28, mass: 0.4 })
  const trailX = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.6 })
  const trailY = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (prefersReducedMotion || !enabled) return undefined

    document.documentElement.classList.add('coffee-cursor-on')

    const onMove = (event) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      setVisible(true)
    }
    const onOver = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      setHovering(Boolean(target.closest('a, button, input, textarea, [data-cursor]')))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('coffee-cursor-on')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReducedMotion, enabled, mouseX, mouseY])

  if (!enabled || prefersReducedMotion) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden mix-blend-difference lg:block"
        style={{ x: trailX, y: trailY }}
      >
        <motion.span
          className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-caramel/80"
          animate={{
            width: hovering ? 52 : 28,
            height: hovering ? 52 : 28,
            opacity: visible ? 0.9 : 0,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[91] hidden lg:block"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.2 : 1 }}
      >
        <span className="coffee-bean-dot block h-2.5 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel shadow-[0_0_12px_rgba(201,162,39,0.7)]" />
      </motion.div>
    </>
  )
}
