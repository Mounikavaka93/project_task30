import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/content'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/money'
import Button from '../ui/Button'
import SafeImage from '../ui/SafeImage'
import SectionHeading from '../ui/SectionHeading'

export default function Menu() {
  const [category, setCategory] = useState('All')
  const [addedId, setAddedId] = useState(null)
  const { addItem } = useCart()

  const items = useMemo(() => {
    if (category === 'All') return MENU_ITEMS
    return MENU_ITEMS.filter((item) => item.category === category)
  }, [category])

  const handleAdd = (item) => {
    addItem(item)
    setAddedId(item.id)
    window.setTimeout(() => {
      setAddedId((current) => (current === item.id ? null : current))
    }, 1400)
  }

  return (
    <section id="menu" className="section-grain bg-roast py-16 sm:py-24 lg:py-28">
      <div className="container-page relative z-[2]">
        <SectionHeading
          light
          eyebrow="Our Menu"
          title="Crafted cups & sweet endings"
          description="Filter by your favorite style — espresso, milk drinks, iced classics, and desserts baked each morning."
        />

        <LayoutGroup>
          <div className="no-scrollbar -mx-3 mb-10 flex items-center gap-2 overflow-x-auto px-3 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {MENU_CATEGORIES.map((name) => {
              const active = category === name
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setCategory(name)}
                  className={`relative cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active ? 'text-espresso' : 'text-cream/80 hover:text-caramel'
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="menu-pill"
                      className="absolute inset-0 rounded-full bg-caramel shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full border border-cream/15" />
                  )}
                  <span className="relative z-[1]">{name}</span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 desktop:gap-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-espresso/70 shadow-lg hover-lift hover:border-caramel/40 hover:shadow-[0_22px_50px_rgba(0,0,0,0.4)]"
              >
                <div className="relative h-48 shrink-0 overflow-hidden sm:h-52">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="card-shine" />
                  {item.popular ? (
                    <span className="absolute left-4 top-4 rounded-full bg-caramel px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-espresso">
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl leading-snug text-cream">{item.name}</h3>
                    <span className="shrink-0 pt-0.5 font-semibold text-caramel">{formatPrice(item.price)}</span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/65">{item.description}</p>
                  <Button
                    variant="primary"
                    className="mt-5 w-full"
                    onClick={() => handleAdd(item)}
                  >
                    {addedId === item.id ? 'Added to Order' : 'Add to Order'}
                  </Button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
