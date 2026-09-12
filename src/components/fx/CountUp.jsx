import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useMedia'

/** Counts from 0 to `value` when scrolled into view. Renders the final value under reduced motion. */
export default function CountUp({ value, decimals = 0, duration = 1.6, suffix = '', prefix = '', delay = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAnimated(v),
    })
    return () => controls.stop()
  }, [inView, value, duration, delay, reduced])

  const display = reduced ? value : animated

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{Number(display).toFixed(decimals)}{suffix}
    </span>
  )
}
