import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { EXPERIENCE } from '../data/experience'
import { Reveal } from './fx'
import { useReducedMotion } from '../hooks/useMedia'
import './Experience.css'

export default function Experience() {
  const listRef = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section id="experience" className="section experience">
      <div className="container section-split">
        <Reveal className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="section-title">Shipping in production.</h2>
          <p className="section-desc">Real products, real users — across AI platforms and full-stack web.</p>
        </Reveal>

        <ol className="xp-list" ref={listRef}>
          <span className="xp-track" aria-hidden="true">
            <motion.span className="xp-track-fill" style={{ scaleY: reduced ? 1 : fill }} />
          </span>

          {EXPERIENCE.map((xp, i) => (
            <Reveal as="li" key={xp.company} className={`xp-item${xp.current ? ' is-current' : ''}`} delay={i * 0.06}>
              <span className="xp-node" aria-hidden="true">
                {xp.current && <span className="live-dot" />}
              </span>

              <div className="xp-meta">
                <span className="xp-duration">{xp.duration}</span>
                <span className="xp-sub">{xp.location} · {xp.type}</span>
                {xp.current && <span className="xp-current">Current</span>}
              </div>

              <div className="xp-body">
                <h3 className="xp-role">{xp.role}</h3>
                <p className="xp-company">{xp.company}</p>
                <p className="xp-desc">{xp.desc}</p>
                <ul className="xp-bullets">
                  {xp.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <ul className="xp-tags">
                  {xp.tags.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
