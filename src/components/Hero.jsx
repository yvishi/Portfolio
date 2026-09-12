import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { CountUp, DotField, Magnetic, ProximityText, RotatingText } from './fx'
import { scrollBehavior } from '../hooks/useMedia'
import './Hero.css'

const EASE = [0.22, 1, 0.36, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 22, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: EASE },
})

export default function Hero() {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior() })

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-field" aria-hidden="true">
        <DotField gap={30} radius={190} pull={16} />
        <div className="hero-vignette" />
        <div className="hero-glow" />
      </div>

      <div className="container hero-inner">
        <motion.p className="eyebrow hero-eyebrow" {...rise(0.1)}>
          {PROFILE.eyebrow}
        </motion.p>

        <motion.h1 className="hero-name" {...rise(0.2)}>
          <ProximityText as="span" text={PROFILE.first} className="hero-name-line" />
          <ProximityText as="span" text={PROFILE.last} className="hero-name-line" />
        </motion.h1>

        <div className="hero-below">
          <div className="hero-copy">
            <motion.p className="hero-role" {...rise(0.4)}>
              Building <RotatingText words={PROFILE.rotating} className="hero-role-word" />
            </motion.p>
            <motion.p className="hero-tagline" {...rise(0.5)}>
              {PROFILE.tagline}
            </motion.p>
            <motion.div className="hero-actions" {...rise(0.6)}>
              <Magnetic>
                <button className="btn btn-solid" onClick={() => goTo('projects')} data-cursor>
                  View work <ArrowDown size={15} />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-ghost" onClick={() => goTo('contact')} data-cursor>
                  Get in touch
                </button>
              </Magnetic>
            </motion.div>
          </div>

          <motion.ul className="hero-stats" {...rise(0.7)} aria-label="Highlights">
            {PROFILE.stats.map((s, i) => (
              <li className="hero-stat" key={s.label}>
                <span className="hero-stat-value">
                  <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} delay={0.8 + i * 0.1} />
                </span>
                <span className="hero-stat-label">{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <motion.div className="hero-foot container" {...rise(0.9)}>
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-line" />
          <span>Scroll</span>
        </div>
        <ul className="hero-socials" aria-label="Profiles">
          <li>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="GitHub">
              <GithubIcon size={15} /> <span>GitHub</span> <ArrowUpRight size={12} />
            </a>
          </li>
          <li>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social" aria-label="LinkedIn">
              <LinkedinIcon size={15} /> <span>LinkedIn</span> <ArrowUpRight size={12} />
            </a>
          </li>
          <li>
            <a href={`mailto:${PROFILE.email}`} className="hero-social" aria-label="Email">
              <Mail size={15} /> <span>Email</span> <ArrowUpRight size={12} />
            </a>
          </li>
        </ul>
      </motion.div>
    </section>
  )
}
