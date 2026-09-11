export default function StarRating({ rating, className = '' }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${index < rating ? 'fill-caramel' : 'fill-cream/20'}`}
          aria-hidden="true"
        >
          <path d="M10 1.6l2.3 4.7 5.2.8-3.8 3.6.9 5.2L10 13.8 5.4 15.9l.9-5.2L2.5 7.1l5.2-.8L10 1.6z" />
        </svg>
      ))}
    </div>
  )
}
