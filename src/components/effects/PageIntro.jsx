import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const AROMA_SPECKS = [
  { ax: '-36px', ay: '-150px', delay: '0.15s', duration: '3.1s', left: '-18px' },
  { ax: '42px', ay: '-168px', delay: '0.45s', duration: '3.4s', left: '10px' },
  { ax: '-58px', ay: '-128px', delay: '0.8s', duration: '2.9s', left: '-6px' },
  { ax: '28px', ay: '-190px', delay: '1.1s', duration: '3.6s', left: '16px' },
  { ax: '-22px', ay: '-176px', delay: '0.3s', duration: '3.2s', left: '4px' },
  { ax: '64px', ay: '-140px', delay: '1.35s', duration: '3s', left: '22px' },
  { ax: '-70px', ay: '-158px', delay: '0.95s', duration: '3.5s', left: '-24px' },
  { ax: '8px', ay: '-200px', delay: '0.6s', duration: '3.8s', left: '0px' },
  { ax: '50px', ay: '-118px', delay: '1.55s', duration: '2.8s', left: '14px' },
  { ax: '-44px', ay: '-210px', delay: '1.2s', duration: '3.7s', left: '-12px' },
]

const VAPOUR = [
  { vw: '34px', vh: '110px', drift: '-18px', delay: '0s', duration: '2.6s' },
  { vw: '22px', vh: '96px', drift: '16px', delay: '0.35s', duration: '2.9s' },
  { vw: '42px', vh: '124px', drift: '6px', delay: '0.7s', duration: '3.2s' },
  { vw: '18px', vh: '88px', drift: '-28px', delay: '1s', duration: '2.5s' },
  { vw: '28px', vh: '102px', drift: '24px', delay: '0.5s', duration: '3s' },
]

const NOTES = [
  { text: 'Cocoa', delay: 0.9, x: -110 },
  { text: 'Honey', delay: 1.25, x: 108 },
  { text: 'Bloom', delay: 1.6, x: -70 },
]

export default function PageIntro() {
  const prefersReducedMotion = useReducedMotion()
  const [show, setShow] = useState(!prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    document.body.style.overflow = 'hidden'
    const hide = window.setTimeout(() => setShow(false), 3400)
    return () => {
      window.clearTimeout(hide)
      document.body.style.overflow = ''
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!show) document.body.style.overflow = ''
  }, [show])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-[#100904]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(107,63,42,0.45)_0%,_transparent_58%)]" />
          <motion.div
            className="absolute left-1/2 top-[58%] h-40 w-72 -translate-x-1/2 rounded-full bg-caramel/25 blur-3xl"
            animate={{ opacity: [0.25, 0.6, 0.35], scale: [0.9, 1.08, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex h-full flex-col items-center justify-center px-6">
            <div className="relative h-[340px] w-[260px] sm:h-[400px] sm:w-[300px]">
              <span className="scent-bloom" />
              <span className="scent-bloom" style={{ animationDelay: '1.1s', width: '160px', height: '160px' }} />
              <span className="scent-bloom" style={{ animationDelay: '2.1s', width: '90px', height: '90px' }} />

              <div className="absolute left-1/2 top-[6%] h-[170px] w-[160px] -translate-x-1/2">
                {VAPOUR.map((plume, index) => (
                  <span
                    key={`vapour-${index}`}
                    className="vapour-plume"
                    style={{
                      '--vw': plume.vw,
                      '--vh': plume.vh,
                      '--drift': plume.drift,
                      '--vdelay': plume.delay,
                      '--vd': plume.duration,
                    }}
                  />
                ))}
                {AROMA_SPECKS.map((speck, index) => (
                  <span
                    key={`speck-${index}`}
                    className="aroma-speck"
                    style={{
                      '--ax': speck.ax,
                      '--ay': speck.ay,
                      '--adelay': speck.delay,
                      '--ad': speck.duration,
                      marginLeft: speck.left,
                    }}
                  />
                ))}
                <svg
                  className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
                  viewBox="0 0 160 170"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    className="steam-draw"
                    d="M62 150c-4-28 14-36 8-62 8-18-10-28 2-48"
                    stroke="rgba(246,237,227,0.75)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    className="steam-draw"
                    d="M82 152c6-30-12-38-2-64-8-20 12-26 4-50"
                    stroke="rgba(232,197,71,0.55)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <path
                    className="steam-draw"
                    d="M100 148c8-26-6-40 8-60-4-22 10-30 2-46"
                    stroke="rgba(246,237,227,0.6)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{ animationDelay: '1s' }}
                  />
                </svg>
              </div>

              {NOTES.map((note) => (
                <motion.span
                  key={note.text}
                  className="pointer-events-none absolute top-[18%] hidden font-display text-xs italic text-caramel/80 sm:block sm:text-sm"
                  style={{ left: `calc(50% + ${note.x}px)` }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: [0, 0.9, 0], y: [-8, -56] }}
                  transition={{ duration: 2.4, delay: note.delay, ease: 'easeOut' }}
                >
                  {note.text}
                </motion.span>
              ))}

              <svg
                viewBox="0 0 220 220"
                className="absolute bottom-0 left-1/2 h-[230px] w-[230px] -translate-x-1/2 sm:h-[260px] sm:w-[260px]"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cup-ceramic" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fff8ee" />
                    <stop offset="45%" stopColor="#f0e0cc" />
                    <stop offset="100%" stopColor="#cbb79a" />
                  </linearGradient>
                  <linearGradient id="cup-coffee" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#5c3b24" />
                    <stop offset="40%" stopColor="#3a2214" />
                    <stop offset="100%" stopColor="#140c08" />
                  </linearGradient>
                  <radialGradient id="cup-crema" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#e8c547" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#c9a227" />
                    <stop offset="100%" stopColor="#6b3f2a" />
                  </radialGradient>
                  <clipPath id="intro-brew">
                    <ellipse cx="104" cy="86" rx="46" ry="16" />
                    <path d="M58 86h92v70c0 22-20 38-46 38s-46-16-46-38V86z" />
                  </clipPath>
                </defs>

                <ellipse cx="104" cy="196" rx="72" ry="10" fill="#140c08" opacity="0.45" />
                <ellipse cx="104" cy="188" rx="70" ry="12" fill="none" stroke="#c9a227" strokeWidth="3" />
                <ellipse cx="104" cy="186" rx="52" ry="8" fill="#2a1810" />

                <path
                  d="M154 102c18 2 30 16 28 32-2 16-16 26-32 26"
                  fill="none"
                  stroke="url(#cup-ceramic)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M154 102c18 2 30 16 28 32-2 16-16 26-32 26"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                <path
                  d="M54 84c0-8 10-16 22-18h56c12 2 22 10 22 18v72c0 26-22 44-50 44s-50-18-50-44V84z"
                  fill="url(#cup-ceramic)"
                />
                <path
                  d="M54 84c0-8 10-16 22-18h56c12 2 22 10 22 18v72c0 26-22 44-50 44s-50-18-50-44V84z"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2.4"
                />

                <g clipPath="url(#intro-brew)">
                  <motion.rect
                    x="50"
                    width="110"
                    height="160"
                    fill="url(#cup-coffee)"
                    initial={{ y: 180 }}
                    animate={{ y: 70 }}
                    transition={{ duration: 1.35, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                </g>
                <motion.ellipse
                  cx="104"
                  cy="88"
                  rx="44"
                  ry="13"
                  fill="url(#cup-crema)"
                  initial={{ opacity: 0, scaleX: 0.4 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.05, duration: 0.55 }}
                />
                <motion.ellipse
                  cx="104"
                  cy="86"
                  rx="18"
                  ry="5"
                  fill="#f6ede3"
                  opacity="0.28"
                  animate={{ rx: [16, 20, 16], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: 1.2 }}
                />
              </svg>
            </div>

            <motion.p
              className="mt-2 font-display text-3xl text-cream sm:text-5xl"
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              Aroma Haven
            </motion.p>
            <motion.p
              className="mt-3 text-[11px] uppercase tracking-[0.38em] text-caramel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.6 }}
            >
              Breathe in the brew
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
