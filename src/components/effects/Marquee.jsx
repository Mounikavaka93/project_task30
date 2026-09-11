const PHRASES = [
  'Single Origin',
  'Slow Pour',
  'Latte Art',
  'Cold Brew',
  'House Roast',
  'Espresso',
  'Microfoam',
  'Third Wave',
  'Barista Craft',
]

export default function Marquee({ light = false }) {
  const row = [...PHRASES, ...PHRASES]

  return (
    <div
      className={`relative overflow-hidden border-y ${
        light ? 'border-espresso/10 bg-cream text-espresso' : 'border-cream/10 bg-espresso text-cream'
      }`}
    >
      <div className="marquee-track flex w-max items-center gap-10 py-3 sm:py-4">
        {row.map((phrase, index) => (
          <span key={`${phrase}-${index}`} className="flex items-center gap-10">
            <span className="font-display text-lg italic sm:text-2xl">{phrase}</span>
            <span className="text-caramel" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
