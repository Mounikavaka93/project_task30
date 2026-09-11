import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ end, suffix = '', duration = 1800 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const startTime = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          setValue(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
