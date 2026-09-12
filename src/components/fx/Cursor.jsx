import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePointerFine, useReducedMotion } from '../../hooks/useMedia'
import './Cursor.css'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]'

/** Small dot + trailing ring. Ring expands over interactive elements. Desktop only. */
export default function Cursor() {
  const fine = usePointerFine()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onOver = (e) => setHover(Boolean(e.target.closest?.(INTERACTIVE)))
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
    }
  }, [enabled, x, y, visible])

  if (!enabled) return null

  return createPortal(
    <div className={`cursor${visible ? ' is-visible' : ''}${hover ? ' is-hover' : ''}${down ? ' is-down' : ''}`} aria-hidden="true">
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }} />
    </div>,
    document.body
  )
}
