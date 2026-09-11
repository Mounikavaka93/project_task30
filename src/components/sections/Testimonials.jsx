import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TESTIMONIALS } from '../../data/content'
import SafeImage from '../ui/SafeImage'
import SectionHeading from '../ui/SectionHeading'
import StarRating from '../ui/StarRating'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeReview = TESTIMONIALS[activeIndex]

  useEffect(() => {
    if (isPaused) return undefined
    const timer = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % TESTIMONIALS.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [isPaused])

  const goToReview = (nextIndex) => {
    setActiveIndex((nextIndex + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section id="testimonials" className="section-grain bg-espresso py-16 sm:py-24 lg:py-28">
      <div className="container-page relative z-[2]">
        <SectionHeading
          light
          eyebrow="Testimonials"
          title="What our guests remember"
          description="Stories from the people who make Aroma Haven feel like a second living room."
        />

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={activeReview.id}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-cream/10 bg-roast/80 px-4 py-8 text-center sm:min-h-[400px] sm:px-12 sm:py-10"
            >
              <SafeImage
                src={activeReview.image}
                alt={activeReview.name}
                className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-caramel/70"
              />
              <div className="mt-4 flex justify-center">
                <StarRating rating={activeReview.rating} />
              </div>
              <p className="mt-6 font-display text-lg italic leading-relaxed text-cream sm:text-2xl">
                “{activeReview.quote}”
              </p>
              <footer className="mt-6">
                <p className="font-semibold text-caramel">{activeReview.name}</p>
                <p className="text-sm text-cream/55">{activeReview.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => goToReview(activeIndex - 1)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 text-cream transition hover:border-caramel hover:text-caramel"
            >
              ‹
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((review, reviewIndex) => (
                <button
                  key={review.id}
                  type="button"
                  aria-label={`Show review from ${review.name}`}
                  onClick={() => setActiveIndex(reviewIndex)}
                  className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                    reviewIndex === activeIndex ? 'w-7 bg-caramel' : 'w-2.5 bg-cream/25 hover:bg-cream/50'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => goToReview(activeIndex + 1)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 text-cream transition hover:border-caramel hover:text-caramel"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
