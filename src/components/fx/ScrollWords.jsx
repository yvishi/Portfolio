import { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useMedia'

function Word({ children, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.22, 1])
  return (
    <motion.span style={{ opacity, display: 'inline-block', marginRight: '0.28em' }}>
      {children}
    </motion.span>
  )
}

/**
 * Paragraph whose words brighten one by one as the block scrolls through the
 * viewport. `text` may be a string or an array of paragraphs.
 */
export default function ScrollWords({ text, className, as: Tag = 'p' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })

  const paragraphs = useMemo(() => (Array.isArray(text) ? text : [text]), [text])
  const total = useMemo(() => paragraphs.reduce((n, p) => n + p.split(' ').length, 0), [paragraphs])

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {paragraphs.map((p, i) => <Tag key={i}>{p}</Tag>)}
      </div>
    )
  }

  let counter = 0
  return (
    <div ref={ref} className={className}>
      {paragraphs.map((p, pi) => (
        <Tag key={pi}>
          {p.split(' ').map((w, wi) => {
            const i = counter++
            const start = i / total
            const end = Math.min(1, start + 1.5 / total)
            return (
              <Word key={`${pi}-${wi}`} progress={scrollYProgress} start={start} end={end}>
                {w}
              </Word>
            )
          })}
        </Tag>
      ))}
    </div>
  )
}
