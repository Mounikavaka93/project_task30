const CUP_STEAM = [
  { left: '42%', bottom: '58%', delay: '0s', duration: '4.2s', width: 46, height: 160, drift: '-28px' },
  { left: '50%', bottom: '60%', delay: '0.7s', duration: '4.8s', width: 58, height: 190, drift: '12px' },
  { left: '58%', bottom: '57%', delay: '1.3s', duration: '4.4s', width: 40, height: 150, drift: '32px' },
  { left: '46%', bottom: '61%', delay: '2s', duration: '5.1s', width: 34, height: 130, drift: '-40px' },
  { left: '54%', bottom: '59%', delay: '2.6s', duration: '4.6s', width: 50, height: 170, drift: '22px' },
  { left: '38%', bottom: '55%', delay: '1.6s', duration: '5.4s', width: 28, height: 120, drift: '-18px' },
  { left: '62%', bottom: '56%', delay: '0.4s', duration: '5s', width: 32, height: 140, drift: '44px' },
]

const PAGE_STEAM = [
  { left: '8%', bottom: '12%', delay: '0.2s', duration: '7s', width: 70, height: 220, drift: '40px' },
  { left: '18%', bottom: '6%', delay: '2.1s', duration: '8s', width: 54, height: 180, drift: '-24px' },
  { left: '72%', bottom: '18%', delay: '1.1s', duration: '6.5s', width: 80, height: 240, drift: '30px' },
  { left: '86%', bottom: '8%', delay: '3s', duration: '7.4s', width: 48, height: 160, drift: '-36px' },
  { left: '30%', bottom: '4%', delay: '4.2s', duration: '8.2s', width: 36, height: 140, drift: '20px' },
]

function SteamColumn({ left, bottom = '0%', delay, duration, width, height, drift }) {
  return (
    <span
      className="coffee-vapour"
      style={{
        left,
        bottom,
        width: `${width}px`,
        height: `${height}px`,
        '--drift': drift,
        '--vd': duration,
        '--vdelay': delay,
      }}
    />
  )
}

export default function CoffeeVapour({ fromCup = false, className = '' }) {
  const columns = fromCup ? CUP_STEAM.slice(0, 4) : PAGE_STEAM

  return (
    <div
      className={`pointer-events-none absolute ${
        fromCup ? '-top-28 inset-x-0 bottom-0 z-20 overflow-hidden sm:-top-36' : 'inset-0 z-[1] overflow-hidden'
      } ${className}`}
      aria-hidden="true"
    >
      {columns.map((column, index) => (
        <SteamColumn key={`${fromCup ? 'cup' : 'page'}-${index}`} {...column} />
      ))}
      {fromCup ? (
        <svg className="absolute left-1/2 top-[4%] h-40 w-36 -translate-x-1/2" viewBox="0 0 120 160" fill="none">
          <path
            className="coffee-vapour-line"
            d="M40 150c-8-32 18-40 8-72 12-22-14-30 4-54"
            stroke="rgba(246,237,227,0.55)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            className="coffee-vapour-line"
            d="M60 152c6-36-16-42 0-74-10-24 14-28 6-56"
            stroke="rgba(232,197,71,0.4)"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ animationDelay: '0.8s' }}
          />
          <path
            className="coffee-vapour-line"
            d="M80 148c10-30-8-44 10-68-6-24 12-32 4-52"
            stroke="rgba(246,237,227,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: '1.5s' }}
          />
        </svg>
      ) : null}
    </div>
  )
}
