import { Check } from 'lucide-react'
import { EDUCATION } from '../data/education'
import { CountUp, Reveal, SpotlightCard } from './fx'
import './Education.css'

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <Reveal className="edu-head">
          <span className="eyebrow">Education</span>
          <h2 className="section-title">Top of the class, twice.</h2>
          <p className="section-desc">From a national merit list at school to a merit scholarship at university.</p>
        </Reveal>

        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.id} delay={0.08 * i}>
              <SpotlightCard className="edu-card">
                <div className="edu-score">
                  <span className="edu-score-value">
                    <CountUp value={e.score} decimals={e.decimals} duration={1.8} />
                  </span>
                  <span className="edu-score-unit">{e.unit}</span>
                </div>
                <div className="edu-meta">
                  <h3 className="edu-degree">{e.degree}</h3>
                  <p className="edu-school">{e.school}</p>
                  <p className="edu-years mono">{e.years}</p>
                </div>
                <ul className="edu-details">
                  {e.details.map((d) => (
                    <li key={d}><Check size={13} strokeWidth={2.5} /> <span>{d}</span></li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
