export default function Logo({ className = '', light = true }) {
  return (
    <a href="#home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-105 ${
          light ? 'border-caramel/50 bg-espresso' : 'border-caramel/40 bg-espresso'
        }`}
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path
            d="M8 14c0-4.2 3.2-7 8-7s8 2.8 8 7v7.2c0 3.8-3.6 6.8-8 6.8s-8-3-8-6.8V14z"
            fill="#C9A227"
          />
          <path
            d="M24 15.5h2.4c1.7 0 3 1.2 3 2.8s-1.3 2.8-3 2.8H24"
            fill="none"
            stroke="#C9A227"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13 7.5c0 2.2-1 3.4-1 4.6M16.5 6.8c0 2.6-1 3.8-1 5.1M20 7.5c0 2.2-1 3.4-1 4.6"
            fill="none"
            stroke="#F6EDE3"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display text-[1.05rem] tracking-wide sm:text-xl ${
            light ? 'text-cream' : 'text-espresso'
          }`}
        >
          Aroma Haven
        </span>
        <span className="block text-[10px] uppercase tracking-[0.14em] text-caramel sm:tracking-[0.22em]">
          Artisan Café
        </span>
      </span>
    </a>
  )
}
