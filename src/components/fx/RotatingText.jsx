import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useMedia'

/** Cycles through `words` with a vertical slide. */
export default function RotatingText({ words, interval = 2600, className }) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || words.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words, interval, reduced])

  return (
    <span
      className={className}
      style={{ display: 'inline-grid', verticalAlign: 'baseline', overflow: 'hidden' }}
      aria-live="polite"
    >
      {/* invisible sizer keeps width stable at the longest word */}
      <span style={{ gridArea: '1 / 1', visibility: 'hidden', whiteSpace: 'nowrap' }} aria-hidden="true">
        {words.reduce((a, b) => (a.length >= b.length ? a : b), '')}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          style={{ gridArea: '1 / 1', whiteSpace: 'nowrap', display: 'inline-block' }}
          initial={reduced ? { opacity: 0 } : { y: '110%', opacity: 0, filter: 'blur(4px)' }}
          animate={reduced ? { opacity: 1 } : { y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={reduced ? { opacity: 0 } : { y: '-110%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
