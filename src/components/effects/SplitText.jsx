import { motion, useReducedMotion } from 'framer-motion'

export default function SplitText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
  italic = false,
}) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          className={`mr-[0.28em] inline-block last:mr-0 ${italic ? 'italic' : ''}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + wordIndex * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
