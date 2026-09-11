import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { calculateOrderTotals, GST_RATE } from '../utils/money'

const CART_STORAGE_KEY = 'aroma-haven-cart-inr'
const ORDERS_STORAGE_KEY = 'aroma-haven-orders-inr'

const CartContext = createContext(null)

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota / private mode */
  }
}

function createOrderId() {
  const stamp = Date.now().toString(36).slice(-4).toUpperCase()
  const random = Math.floor(100 + Math.random() * 900)
  return `AH-${stamp}${random}`
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage(CART_STORAGE_KEY, []))
  const [orders, setOrders] = useState(() => readStorage(ORDERS_STORAGE_KEY, []))
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [panelView, setPanelView] = useState('cart')
  const [lastOrder, setLastOrder] = useState(null)

  const persistCart = useCallback((updater) => {
    setItems((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      writeStorage(CART_STORAGE_KEY, next)
      return next
    })
  }, [])

  const persistOrders = useCallback((nextOrders) => {
    setOrders(nextOrders)
    writeStorage(ORDERS_STORAGE_KEY, nextOrders)
  }, [])

  const openCart = useCallback((view = 'cart') => {
    setPanelView(view)
    setIsCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
  }, [])

  const addItem = useCallback(
    (product) => {
      persistCart((current) =>
        current.some((item) => item.id === product.id)
          ? current.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          : [
              ...current,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              },
            ],
      )
    },
    [persistCart],
  )

  const updateQuantity = useCallback(
    (id, quantity) => {
      persistCart((current) => {
        if (quantity < 1) return current.filter((item) => item.id !== id)
        return current.map((item) => (item.id === id ? { ...item, quantity } : item))
      })
    },
    [persistCart],
  )

  const removeItem = useCallback(
    (id) => {
      persistCart((current) => current.filter((item) => item.id !== id))
    },
    [persistCart],
  )

  const clearCart = useCallback(() => {
    persistCart([])
  }, [persistCart])

  const placeOrder = useCallback(
    (details) => {
      const currentItems = items
      const totals = calculateOrderTotals(currentItems, GST_RATE)
      const order = {
        id: createOrderId(),
        createdAt: new Date().toISOString(),
        items: currentItems.map((item) => ({ ...item })),
        totals,
        customer: {
          name: details.name.trim(),
          phone: details.phone.trim(),
          email: details.email.trim(),
          fulfillment: details.fulfillment,
          tableNumber: details.tableNumber.trim(),
          address: details.address.trim(),
          landmark: details.landmark.trim(),
          city: details.city.trim(),
          state: details.state.trim(),
          pincode: details.pincode.trim(),
        },
        payment: {
          method: details.paymentMethod,
          status:
            details.paymentMethod === 'cod'
              ? 'cash_on_delivery'
              : details.paymentMethod === 'cafe'
                ? 'pay_at_cafe'
                : 'paid',
          last4: details.cardLast4 || '',
          upiId: details.upiId || '',
        },
        status: details.fulfillment === 'delivery' ? 'out_for_delivery' : 'preparing',
      }
      persistOrders([order, ...orders].slice(0, 12))
      persistCart([])
      setLastOrder(order)
      setPanelView('success')
      return order
    },
    [items, orders, persistCart, persistOrders],
  )

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const totals = useMemo(() => calculateOrderTotals(items, GST_RATE), [items])

  const value = useMemo(
    () => ({
      items,
      orders,
      lastOrder,
      itemCount,
      totals,
      isCartOpen,
      panelView,
      setPanelView,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      placeOrder,
    }),
    [
      items,
      orders,
      lastOrder,
      itemCount,
      totals,
      isCartOpen,
      panelView,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      placeOrder,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
