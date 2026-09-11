export default function SafeImage({
  src,
  alt,
  className = '',
  fallback = '/images/hero-cup.jpg',
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        if (event.currentTarget.dataset.fallback === '1') return
        event.currentTarget.dataset.fallback = '1'
        event.currentTarget.src = fallback
      }}
      {...props}
    />
  )
}
