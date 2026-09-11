import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useCart } from '../../context/CartContext'
import { formatPrice, paymentSummary } from '../../utils/money'
import Button from '../ui/Button'
import SafeImage from '../ui/SafeImage'
import CheckoutForm from './CheckoutForm'

function statusLabel(status) {
  if (status === 'ready') return 'Ready for pickup'
  if (status === 'out_for_delivery') return 'Out for delivery'
  if (status === 'completed') return 'Completed'
  return 'Being prepared'
}

function formatAddress(customer) {
  if (!customer) return ''
  return [customer.address, customer.landmark, customer.city, customer.state, customer.pincode]
    .filter(Boolean)
    .join(', ')
}

function CartItems() {
  const { items, updateQuantity, removeItem, totals, setPanelView, clearCart, closeCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-2xl text-cream">Your order is empty</p>
        <p className="mt-2 text-sm text-cream/60">Add drinks from the menu, then check them here.</p>
        <Button href="#menu" className="mt-6" onClick={closeCart}>
          Browse menu
        </Button>
      </div>
    )
  }

  return (
    <>
      <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 rounded-2xl border border-cream/10 bg-espresso/50 p-3">
            <SafeImage
              src={item.image}
              alt={item.name}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-cream">{item.name}</p>
                <p className="shrink-0 text-sm text-caramel">{formatPrice(item.price * item.quantity)}</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-cream/20 text-cream hover:border-caramel"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm text-cream">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-cream/20 text-cream hover:border-caramel"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="cursor-pointer text-xs text-cream/45 hover:text-caramel"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-cream/10 px-5 py-5">
        <div className="flex justify-between text-sm text-cream/70">
          <span>Subtotal</span>
          <span>{formatPrice(totals.subtotal)}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm text-cream/70">
          <span>GST (5%)</span>
          <span>{formatPrice(totals.tax)}</span>
        </div>
        <div className="mt-2 flex justify-between font-semibold text-cream">
          <span>Total</span>
          <span className="text-caramel">{formatPrice(totals.total)}</span>
        </div>
        <Button className="mt-4 w-full" onClick={() => setPanelView('checkout')}>
          Checkout & pay
        </Button>
        <button
          type="button"
          onClick={clearCart}
          className="mt-3 w-full cursor-pointer text-xs text-cream/45 hover:text-caramel"
        >
          Clear order
        </button>
      </div>
    </>
  )
}

function OrderHistory() {
  const { orders, setPanelView } = useCart()

  if (orders.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-2xl text-cream">No orders yet</p>
        <p className="mt-2 text-sm text-cream/60">Place an order and it will show up here so you can check it anytime.</p>
        <button
          type="button"
          onClick={() => setPanelView('cart')}
          className="mt-6 cursor-pointer text-sm text-caramel hover:text-gold"
        >
          Back to cart
        </button>
      </div>
    )
  }

  return (
    <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
      {orders.map((order) => (
        <li key={order.id} className="rounded-2xl border border-cream/10 bg-espresso/50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg text-caramel">{order.id}</p>
              <p className="text-xs text-cream/50">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <span className="rounded-full bg-caramel/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-caramel">
              {statusLabel(order.status)}
            </span>
          </div>
          <ul className="mt-3 space-y-1 text-sm text-cream/75">
            {order.items.map((item) => (
              <li key={`${order.id}-${item.id}`}>
                {item.quantity}× {item.name}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs leading-relaxed text-cream/55">{formatAddress(order.customer)}</p>
          <p className="mt-3 text-sm text-cream">
            {paymentSummary(order.payment)} · {formatPrice(order.totals.total)}
          </p>
        </li>
      ))}
    </ul>
  )
}

function OrderSuccess() {
  const { lastOrder, closeCart, setPanelView } = useCart()
  if (!lastOrder) return null

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-caramel">Order placed</p>
      <p className="mt-3 font-display text-4xl text-cream">{lastOrder.id}</p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
        Save this number. Check it anytime from the bag icon in the top right, then tap{' '}
        <span className="text-caramel">My Orders</span>.
      </p>
      <p className="mt-3 text-sm text-cream/80">
        {paymentSummary(lastOrder.payment)} · {formatPrice(lastOrder.totals.total)}
      </p>
      {lastOrder.customer?.address ? (
        <p className="mt-2 max-w-xs text-xs leading-relaxed text-cream/55">
          {formatAddress(lastOrder.customer)}
        </p>
      ) : null}
      <Button className="mt-6" onClick={() => setPanelView('orders')}>
        Check this order
      </Button>
      <button
        type="button"
        onClick={closeCart}
        className="mt-3 cursor-pointer text-sm text-cream/55 hover:text-caramel"
      >
        Close
      </button>
    </div>
  )
}

export default function CartDrawer() {
  const { isCartOpen, closeCart, openCart, panelView, setPanelView, itemCount, orders, totals } =
    useCart()
  const lenis = useLenis()

  useEffect(() => {
    if (!isCartOpen) return undefined
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [isCartOpen, lenis])

  const title =
    panelView === 'checkout'
      ? 'Checkout'
      : panelView === 'orders'
        ? 'My Orders'
        : panelView === 'success'
          ? 'Thank you'
          : 'Your Order'

  return (
    <>
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close order panel"
            className="fixed inset-0 z-[70] bg-espresso/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col bg-roast text-cream shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-cream/10 px-5 py-4">
              <h2 className="font-display text-2xl">{title}</h2>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 hover:border-caramel hover:text-caramel"
                aria-label="Close order panel"
              >
                ×
              </button>
            </div>

            {panelView !== 'success' && panelView !== 'checkout' ? (
              <div className="grid grid-cols-2 gap-2 px-5 pt-4">
                <button
                  type="button"
                  onClick={() => setPanelView('cart')}
                  className={`cursor-pointer rounded-full px-3 py-2 text-sm ${
                    panelView === 'cart' ? 'bg-caramel text-espresso' : 'border border-cream/15 text-cream/70'
                  }`}
                >
                  Cart{itemCount ? ` (${itemCount})` : ''}
                </button>
                <button
                  type="button"
                  onClick={() => setPanelView('orders')}
                  className={`cursor-pointer rounded-full px-3 py-2 text-sm ${
                    panelView === 'orders' ? 'bg-caramel text-espresso' : 'border border-cream/15 text-cream/70'
                  }`}
                >
                  My Orders{orders.length ? ` (${orders.length})` : ''}
                </button>
              </div>
            ) : null}

            <div className="flex min-h-0 flex-1 flex-col">
              {panelView === 'cart' ? <CartItems /> : null}
              {panelView === 'checkout' ? (
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <CheckoutForm />
                </div>
              ) : null}
              {panelView === 'orders' ? <OrderHistory /> : null}
              {panelView === 'success' ? <OrderSuccess /> : null}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
      {!isCartOpen && itemCount > 0 ? (
        <button
          type="button"
          onClick={() => openCart('cart')}
          className="fixed bottom-4 left-1/2 z-[60] flex w-[min(92%,420px)] -translate-x-1/2 cursor-pointer items-center justify-between rounded-full bg-caramel px-5 py-3 text-sm font-semibold text-espresso shadow-lg lg:hidden"
        >
          <span>View order ({itemCount})</span>
          <span>{formatPrice(totals.total)}</span>
        </button>
      ) : null}
    </>
  )
}
