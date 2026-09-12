import { PROFILE } from '../data/profile'
import { Reveal, ScrollWords } from './fx'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container section-split">
        <Reveal className="section-head">
          <span className="eyebrow">About</span>
          <h2 className="section-title">Building things that matter.</h2>
          <p className="section-desc">
            Clean, scalable code. Products that ship and get used.
          </p>
        </Reveal>

        <div className="about-body">
          <ScrollWords text={PROFILE.about} className="about-lead" />

          <Reveal className="rows about-facts" delay={0.05}>
            {PROFILE.facts.map((f) => (
              <div className="row" key={f.key}>
                <span className="row-key">{f.key}</span>
                <div>
                  <div className="row-val">{f.value}</div>
                  <div className="row-sub">{f.sub}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="about-interests" delay={0.1}>
            <span className="row-key about-interests-key">Interests</span>
            <ul className="about-chips">
              {PROFILE.interests.map((i) => (
                <li key={i} className="chip">{i}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
