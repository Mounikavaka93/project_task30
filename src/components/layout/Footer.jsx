import { useState } from 'react'
import { CONTACT_INFO, NAV_LINKS } from '../../data/content'
import { isValidEmail, toTelHref } from '../../utils/validation'
import Logo from './Logo'
import Button from '../ui/Button'
import Magnetic from '../effects/Magnetic'
import { useCart } from '../../context/CartContext'

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M14.7 10.3 21 3h-2.2l-5 5.8L9.7 3H3.5l6.6 9.6L3.2 21h2.2l5.5-6.4 4.6 6.4h6.2l-7-10.7zM10.9 13.4l-.6-.9-5-7.2h2.2l4 5.8.6.9 5.2 7.4h-2.2l-4.2-6z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const { openCart } = useCart()

  const subscribe = (event) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('Please enter a valid email.')
      return
    }
    setStatus('Welcome to the brew list.')
    setEmail('')
  }

  return (
    <footer className="bg-espresso text-cream">
      <div className="container-page grid items-start gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4 desktop:gap-12">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
            Small-batch coffee, slow mornings, and a table that always has room for one more.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((social) => (
              <Magnetic key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream transition duration-300 hover:-translate-y-0.5 hover:border-caramel hover:text-caramel"
                >
                  {social.icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-caramel">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="transition duration-300 hover:text-caramel">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => openCart('orders')}
                className="cursor-pointer transition duration-300 hover:text-caramel"
              >
                Your Order
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-caramel">Visit</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>{CONTACT_INFO.address}</li>
            <li>
              <a href={toTelHref(CONTACT_INFO.phone)} className="hover:text-caramel">
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-caramel">
                {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-caramel">Newsletter</h3>
          <p className="mt-4 text-sm text-cream/70">Seasonal drinks, tasting nights, and quiet-hour offers.</p>
          <form onSubmit={subscribe} className="mt-4 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setStatus('')
              }}
              placeholder="Your email"
              className="w-full rounded-full border border-cream/15 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-caramel focus:ring-2 focus:ring-caramel/30"
            />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
            {status ? (
              <p className={`text-xs ${status.includes('valid') ? 'text-red-300' : 'text-caramel'}`}>
                {status}
              </p>
            ) : null}
          </form>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="container-page py-5 text-center text-xs text-cream/45">
          © {new Date().getFullYear()} Aroma Haven. Crafted with care.
        </p>
      </div>
    </footer>
  )
}
