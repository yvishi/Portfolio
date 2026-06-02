import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './ScrollSpine.css'

const SECTIONS = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'awards', 'contact']

export default function ScrollSpine({ activeSection }) {
  const { scrollYProgress } = useScroll()
  const [nodes, setNodes] = useState([])

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

    // Slight delay to ensure DOM is fully painted
    const timeout = setTimeout(calculate, 300)
    window.addEventListener('resize', calculate)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', calculate)
    }
  }, [])

  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="scroll-spine" aria-hidden="true">
      <div className="spine-track">
        <motion.div className="spine-fill" style={{ height: fillHeight }} />
      </div>

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
