import { useRef } from 'react'
import { SKILLS } from '../data/skills'
import { Reveal, SpotlightCard } from './fx'
import './Skills.css'

export default function Skills() {
  const gridRef = useRef(null)

  // One listener for the whole grid: every cell gets the pointer position
  // relative to itself, so the glow continues across gaps.
  const onMove = (e) => {
    const cells = gridRef.current?.querySelectorAll('.spot')
    cells?.forEach((cell) => {
      const r = cell.getBoundingClientRect()
      cell.style.setProperty('--mx', `${e.clientX - r.left}px`)
      cell.style.setProperty('--my', `${e.clientY - r.top}px`)
    })
  }

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal className="skills-head">
          <span className="eyebrow">Skills</span>
          <h2 className="section-title">The toolkit.</h2>
          <p className="section-desc">From UI frameworks to model training to cloud deployment.</p>
        </Reveal>

        <div className="bento" ref={gridRef} onPointerMove={onMove}>
          {SKILLS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.06} style={{ gridColumn: `span ${group.span}` }} className="bento-slot">
              <SpotlightCard className="bento-cell">
                <div className="bento-cell-head">
                  <h3 className="bento-title">{group.title}</h3>
                  <span className="bento-sub">{group.sub}</span>
                </div>
                <ul className="bento-tags">
                  {group.tags.map((t) => <li key={t} className="chip">{t}</li>)}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
