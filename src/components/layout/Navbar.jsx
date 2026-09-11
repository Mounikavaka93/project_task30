import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { NAV_LINKS } from '../../data/content'
import Logo from './Logo'
import CartButton from '../cart/CartButton'
import ReserveTablePic from '../ui/ReserveTablePic'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const lenis = useLenis()
  const { openCart } = useCart()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean)
      const offset = window.scrollY + 120
      let current = 'home'

      sections.forEach((section) => {
        if (section.offsetTop <= offset) current = section.id
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    if (isMenuOpen) lenis?.stop()
    else lenis?.start()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [isMenuOpen, lenis])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || isMenuOpen
          ? 'bg-espresso/95 shadow-[0_10px_40px_rgba(20,12,8,0.35)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex h-16 min-w-0 items-center justify-between gap-3 lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div className="flex justify-start">
          <Logo />
        </div>

        <LayoutGroup>
          <ul className="hidden items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  className={`nav-link inline-block py-1 transition-transform duration-300 hover:-translate-y-0.5 ${active === link.id ? 'is-active' : ''}`}
                >
                  {link.label}
                </a>
                {active === link.id ? (
                  <motion.span
                    layoutId="nav-ink"
                    className="absolute -bottom-1 left-0 h-px w-full bg-caramel"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </LayoutGroup>

        <div className="flex items-center justify-end gap-2">
          <CartButton onClick={closeMenu} />
          <div className="hidden lg:block">
            <ReserveTablePic size="nav" />
          </div>
          <button
            type="button"
            className="relative z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((previous) => !previous)}
          >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-cream transition-all duration-300 ${
                isMenuOpen ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-cream transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-cream transition-all duration-300 ${
                isMenuOpen ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-espresso/60 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.aside
              className="fixed right-0 top-0 z-40 flex h-dvh w-[82%] max-w-sm flex-col bg-roast px-8 pt-24 shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      className={`font-display text-2xl transition-colors duration-300 sm:text-3xl ${
                        active === link.id ? 'text-caramel' : 'text-cream hover:text-caramel'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <ReserveTablePic size="menu" className="mt-10" onClick={closeMenu} />
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  openCart('cart')
                }}
                className="mt-6 text-left font-display text-2xl text-caramel sm:text-3xl"
              >
                Your Order
              </button>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
