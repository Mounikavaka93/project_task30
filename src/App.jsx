import { useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { CartProvider } from './context/CartContext'
import CartDrawer from './components/cart/CartDrawer'
import {
  About,
  CoffeeCursor,
  Contact,
  Footer,
  Gallery,
  Hero,
  Marquee,
  Menu,
  Navbar,
  PageIntro,
  ScrollCup,
  SpecialOffers,
  Testimonials,
} from './components'

function Page() {
  return (
    <CartProvider>
      <div className="min-h-dvh overflow-x-hidden bg-latte font-sans text-espresso">
        <PageIntro />
        <CoffeeCursor />
        <ScrollCup />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Menu />
          <SpecialOffers />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Marquee light />
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}

export default function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: { offset: 88, duration: prefersReducedMotion ? 0 : 1.05 },
        duration: prefersReducedMotion ? 0 : 0.95,
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
      }}
    >
      <Page />
    </ReactLenis>
  )
}
