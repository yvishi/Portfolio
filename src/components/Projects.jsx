import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/projects'
import { GithubIcon } from './BrandIcons'
import { Reveal, SpotlightCard } from './fx'
import { useMaxWidth, useReducedMotion } from '../hooks/useMedia'
import './Projects.css'

function StackCard({ project, index, total, stacked }) {
  const slotRef = useRef(null)
  const isLast = index === total - 1
  // Progress runs from the moment this slot's bottom reaches the viewport
  // bottom until it reaches the sticky top — i.e. while the next card covers it.
  const { scrollYProgress } = useScroll({ target: slotRef, offset: ['end end', 'end 96px'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.45])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)
  const active = stacked && !isLast

  return (
    <div className="proj-slot" ref={slotRef}>
      <motion.article
        className={`proj-sticky${stacked ? ' is-stacked' : ''}`}
        style={active ? { scale, filter } : undefined}
      >
        <SpotlightCard className={`proj-card proj-card--${project.tone}`}>
          <div className="proj-media">
            {project.shot ? (
              <img src={project.shot} alt={`${project.title} landing page`} loading="lazy" />
            ) : (
              <div className="proj-media-abstract" aria-hidden="true">
                <span>{project.title.charAt(0)}</span>
              </div>
            )}
            <div className="proj-media-scrim" />
            <div className="proj-media-top">
              <span className="proj-index mono">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              {project.live && (
                <span className="proj-live"><span className="live-dot" /> Live</span>
              )}
            </div>
            {project.metric && (
              <div className="proj-metric">
                <span className="proj-metric-value">{project.metric.value}</span>
                <span className="proj-metric-label">{project.metric.label}</span>
              </div>
            )}
          </div>

          <div className="proj-body">
            <div>
              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-subtitle">{project.subtitle}</p>
            </div>
            <p className="proj-desc">{project.desc}</p>
            <ul className="proj-highlights">
              {project.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <ul className="proj-tags">
              {project.tags.map((t) => <li key={t} className="chip">{t}</li>)}
            </ul>
            <div className="proj-links">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                  Visit site <ArrowUpRight size={15} />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <GithubIcon size={14} /> Source
                </a>
              )}
            </div>
          </div>
        </SpotlightCard>
      </motion.article>
    </div>
  )
}

export default function Projects() {
  const narrow = useMaxWidth(768)
  const reduced = useReducedMotion()
  const stacked = !narrow && !reduced

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal className="proj-head">
          <span className="eyebrow">Projects</span>
          <h2 className="section-title">Selected work.</h2>
          <p className="section-desc">Production-ready applications built with care for performance, security, and UX.</p>
        </Reveal>

        <div className={`proj-stack${stacked ? ' is-stacked' : ''}`}>
          {PROJECTS.map((p, i) => (
            <StackCard key={p.id} project={p} index={i} total={PROJECTS.length} stacked={stacked} />
          ))}
        </div>
      </div>
    </section>
  )
}
