import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePointerFine, useReducedMotion } from '../../hooks/useMedia'

/**
 * Wraps one element and pulls it toward the pointer while the pointer is within
 * `radius` px of its edge. Uses springs so it settles softly.
 */
export default function Magnetic({ children, strength = 0.35, radius = 80, className, style }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 })
  const reduced = useReducedMotion()
  const fine = usePointerFine()
  const enabled = fine && !reduced

  const onMove = (e) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const inside =
      Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius
    if (inside) {
      x.set(dx * strength)
      y.set(dy * strength)
    } else {
      x.set(0)
      y.set(0)
    }
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ display: 'inline-block', x: sx, y: sy, ...style }}
    >
      {children}
    </motion.div>
  )
}
