import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '../data/profile'
import './LoadingScreen.css'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Once-per-session intro. Two lines of the name mask-reveal while a counter
 * runs to 100; the whole screen then wipes upward.
 */
export default function LoadingScreen() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const dur = 1300
    let raf = 0
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - (1 - t) ** 3
      setCount(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      className="loader"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="loader-name">
        {[PROFILE.first, PROFILE.last].map((line, i) => (
          <span className="loader-line" key={line}>
            <motion.span
              className="loader-line-inner"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </div>

      <div className="loader-foot">
        <span className="loader-count">{String(count).padStart(3, '0')}</span>
        <span className="loader-bar" aria-hidden="true">
          <span className="loader-bar-fill" style={{ transform: `scaleX(${count / 100})` }} />
        </span>
        <span className="loader-note">Portfolio · 2026</span>
      </div>
    </motion.div>
  )
}
