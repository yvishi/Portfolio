import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './ScrollSpine.css'

const SECTIONS = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'awards', 'contact']

// A path that's jagged/high-amplitude near the top and flattens toward the
// bottom — literal loss-curve convergence. Coordinates are in a 100 x 1000
// viewBox so it scales to any page height via preserveAspectRatio="none".
const CURVE_PATH = 'M50,0 L38,40 L62,75 L30,115 L58,150 L42,185 L55,215 L46,245 L52,270 L48,295 L51,320 L49,345 L50.5,375 L49.5,410 L50,450 L50,1000'

export default function ScrollSpine({ activeSection }) {
  const { scrollYProgress } = useScroll()
  const [nodes, setNodes] = useState([])
  const pathOffset = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])

  useEffect(() => {
    const calculate = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH <= 0) return
      setNodes(
        SECTIONS.map(id => {
          const el = document.getElementById(id)
          return el ? Math.min(el.offsetTop / docH, 1) : 0
        })
      )
    }

    const timeout = setTimeout(calculate, 300)
    window.addEventListener('resize', calculate)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', calculate)
    }
  }, [])

  return (
    <div className="scroll-spine" aria-hidden="true">
      <svg className="spine-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path className="spine-track" d={CURVE_PATH} />
        <motion.path
          className="spine-fill"
          d={CURVE_PATH}
          pathLength="1"
          style={{ pathOffset }}
        />
      </svg>

      {nodes.map((pos, i) => (
        <div
          key={SECTIONS[i]}
          className={`spine-node${activeSection === SECTIONS[i] ? ' spine-node--active' : ''}`}
          style={{ top: `${pos * 100}%` }}
        >
          <div className="spine-node-dot" />
          {activeSection === SECTIONS[i] && (
            <motion.div
              className="spine-node-ripple"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
