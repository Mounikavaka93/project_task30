import { motion } from 'framer-motion'
import { GALLERY_ITEMS } from '../../data/content'
import SafeImage from '../ui/SafeImage'
import SectionHeading from '../ui/SectionHeading'

export default function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-16 sm:py-24 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from the café"
          description="Beans, foam, pastry steam, and quiet tables — a glimpse of the house we keep."
        />

        <div className="grid auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-4 md:auto-rows-[200px] lg:auto-rows-[230px] desktop:auto-rows-[260px]">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.figure
              key={item.id}
              className={`group relative h-full min-h-0 overflow-hidden rounded-2xl ${item.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <SafeImage
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
                fallback="/images/about-cafe.jpg"
              />
              <figcaption className="absolute inset-0 flex items-end bg-espresso/0 p-4 transition-all duration-500 group-hover:bg-espresso/55 sm:items-center sm:justify-center">
                <span className="translate-y-1 font-display text-lg text-cream transition-all duration-500 sm:translate-y-4 sm:text-xl sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  {item.title}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
