import { useCart } from '../../context/CartContext'

export default function CartButton({ onClick, className = '' }) {
  const { itemCount, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.()
        openCart(itemCount > 0 ? 'cart' : 'orders')
      }}
      aria-label={itemCount ? `View order, ${itemCount} items` : 'View order'}
      className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/20 text-cream transition hover:border-caramel hover:text-caramel ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 8h12l-1 11H7L6 8z" strokeLinejoin="round" />
        <path d="M9 8V7a3 3 0 0 1 6 0v1" strokeLinecap="round" />
      </svg>
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-caramel px-1 text-[10px] font-bold text-espresso">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      ) : null}
    </button>
  )
}
