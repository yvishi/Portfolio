import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { AWARDS } from '../data/awards'
import { Reveal, fadeUp, staggerParent } from './fx'
import './Awards.css'

export default function Awards() {
  return (
    <section id="awards" className="section awards">
      <div className="container section-split">
        <Reveal className="section-head">
          <span className="eyebrow">Recognition</span>
          <h2 className="section-title">Awards &amp; scholarships.</h2>
          <p className="section-desc">Merit-based recognition at national and institutional levels.</p>
        </Reveal>

        <motion.ol
          className="award-list"
          variants={staggerParent(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {AWARDS.map((a) => (
            <motion.li className="award" key={a.title} variants={fadeUp}>
              <span className="award-year">{a.year}</span>
              <div className="award-main">
                <h3 className="award-title">{a.title}</h3>
                <p className="award-org">{a.org}</p>
                <p className="award-desc">{a.desc}</p>
              </div>
              <span className="award-kind">{a.kind}</span>
              <ArrowUpRight className="award-arrow" size={18} aria-hidden="true" />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
