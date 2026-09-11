import { motion } from 'framer-motion'

export default function ReserveTablePic({
  size = 'nav',
  onClick,
  className = '',
}) {
  const isNav = size === 'nav'

  return (
    <motion.a
      href="#contact"
      onClick={onClick}
      aria-label="Reserve a table"
      data-cursor
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative block overflow-hidden rounded-2xl border border-caramel/40 bg-gradient-to-b from-[#2a1810] to-[#140c08] shadow-[0_8px_24px_rgba(20,12,8,0.35)] ${
        isNav ? 'h-[52px] w-[168px]' : 'h-[148px] w-full'
      } ${className}`}
    >
      <svg
        viewBox={isNav ? '0 0 168 52' : '0 0 240 148'}
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`wood-${size}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d4b483" />
            <stop offset="100%" stopColor="#8a5a32" />
          </linearGradient>
          <radialGradient id={`lamp-${size}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e8c547" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#e8c547" stopOpacity="0" />
          </radialGradient>
        </defs>

        {isNav ? (
          <>
            <ellipse cx="84" cy="10" rx="40" ry="18" fill={`url(#lamp-${size})`} className="reserve-glow" />
            <rect x="28" y="34" width="8" height="14" rx="1" fill="#3d2918" className="reserve-chair-left" />
            <rect x="132" y="34" width="8" height="14" rx="1" fill="#3d2918" className="reserve-chair-right" />
            <rect x="24" y="32" width="16" height="5" rx="1.5" fill="#6b3f2a" className="reserve-chair-left" />
            <rect x="128" y="32" width="16" height="5" rx="1.5" fill="#6b3f2a" className="reserve-chair-right" />
            <ellipse cx="84" cy="36" rx="46" ry="8" fill={`url(#wood-${size})`} />
            <ellipse cx="84" cy="34" rx="44" ry="6.5" fill="#c9a227" opacity="0.35" />
            <rect x="82" y="36" width="4" height="12" fill="#5c3b24" />
            <ellipse cx="70" cy="32" rx="7" ry="3.2" fill="#f6ede3" />
            <ellipse cx="70" cy="31.2" rx="5" ry="2" fill="#4a2c1a" />
            <ellipse cx="98" cy="32" rx="7" ry="3.2" fill="#f6ede3" />
            <ellipse cx="98" cy="31.2" rx="5" ry="2" fill="#4a2c1a" />
            <path className="reserve-steam" d="M70 29c0-4 3-5 2-8" stroke="#f6ede3" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path className="reserve-steam" d="M98 29c0-4 3-5 2-8" stroke="#f6ede3" strokeWidth="1.2" fill="none" strokeLinecap="round" style={{ animationDelay: '0.6s' }} />
            <g className="reserve-tag">
              <rect x="78" y="18" width="12" height="14" rx="1.5" fill="#c9a227" />
              <rect x="79.5" y="19.5" width="9" height="11" rx="1" fill="#140c08" />
              <path d="M83 16v3" stroke="#c9a227" strokeWidth="1.2" />
            </g>
            <text
              x="84"
              y="50"
              textAnchor="middle"
              fill="#e8c547"
              fontSize="7"
              fontFamily="Outfit, sans-serif"
              letterSpacing="1.4"
            >
              RESERVE A TABLE
            </text>
          </>
        ) : (
          <>
            <ellipse cx="120" cy="28" rx="70" ry="32" fill={`url(#lamp-${size})`} className="reserve-glow" />
            <rect x="38" y="92" width="16" height="36" rx="2" fill="#3d2918" className="reserve-chair-left" />
            <rect x="186" y="92" width="16" height="36" rx="2" fill="#3d2918" className="reserve-chair-right" />
            <rect x="30" y="86" width="32" height="10" rx="3" fill="#6b3f2a" className="reserve-chair-left" />
            <rect x="178" y="86" width="32" height="10" rx="3" fill="#6b3f2a" className="reserve-chair-right" />
            <ellipse cx="120" cy="96" rx="78" ry="16" fill={`url(#wood-${size})`} />
            <ellipse cx="120" cy="92" rx="74" ry="12" fill="#c9a227" opacity="0.28" />
            <rect x="116" y="96" width="8" height="32" fill="#5c3b24" />
            <ellipse cx="96" cy="88" rx="13" ry="6" fill="#f6ede3" />
            <ellipse cx="96" cy="86" rx="9" ry="3.5" fill="#4a2c1a" />
            <ellipse cx="144" cy="88" rx="13" ry="6" fill="#f6ede3" />
            <ellipse cx="144" cy="86" rx="9" ry="3.5" fill="#4a2c1a" />
            <path className="reserve-steam" d="M96 82c-2-10 8-12 4-22" stroke="#f6ede3" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path className="reserve-steam" d="M144 82c2-10-6-14 2-22" stroke="#f6ede3" strokeWidth="2" fill="none" strokeLinecap="round" style={{ animationDelay: '0.5s' }} />
            <path className="reserve-steam" d="M120 78c0-12 6-14 2-24" stroke="#e8c547" strokeWidth="1.6" fill="none" strokeLinecap="round" style={{ animationDelay: '0.9s' }} />
            <g className="reserve-tag">
              <rect x="108" y="48" width="24" height="28" rx="3" fill="#c9a227" />
              <rect x="111" y="51" width="18" height="22" rx="2" fill="#140c08" />
              <path d="M120 42v8" stroke="#c9a227" strokeWidth="2" />
              <text
                x="120"
                y="65"
                textAnchor="middle"
                fill="#e8c547"
                fontSize="6"
                fontFamily="Outfit, sans-serif"
                letterSpacing="0.6"
              >
                RSVP
              </text>
            </g>
            <text
              x="120"
              y="140"
              textAnchor="middle"
              fill="#e8c547"
              fontSize="13"
              fontFamily="Playfair Display, serif"
            >
              Reserve a Table
            </text>
          </>
        )}
      </svg>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cream/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.a>
  )
}
