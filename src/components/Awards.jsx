import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import './Awards.css'

const AWARDS = [
  {
    title: 'JP Morgan Chase Code For Good',
    org: 'JPMorgan Chase & Co.',
    desc: '2026 Finalist, India — selected among top teams building technology for social good in a national hackathon.',
    year: '2026',
  },
  {
    title: 'Meta PyTorch OpenEnv Hackathon',
    org: 'Meta',
    desc: '2026 Finalist, India — built an OpenEnv-compliant reinforcement learning environment as part of a national hackathon.',
    year: '2026',
  },
  {
    title: 'Certificate of Merit in Computer Science',
    org: 'Council for Indian School Certificate Examinations',
    desc: 'Nationally recognized for scoring in the top 0.1% of ISC Class XII Board Computer Science examinees across India.',
    year: '2024',
  },
  {
    title: 'MERIT-I Scholarship',
    org: 'Thapar Institute of Engineering & Technology',
    desc: 'Merit-based scholarship awarded to the top 2% of students for consistently high academic performance.',
    year: '2024',
  },
]

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Awards() {
  return (
    <section id="awards" className="awards-section section-padding">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">07 · Honours</span>
          <h2 className="section-title">Awards &amp; Scholarships</h2>
          <p className="section-desc">
            Merit-based recognition across national and institutional levels.
          </p>
        </motion.div>

        <motion.div
          className="awards-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {AWARDS.map((award) => (
            <motion.div className="award-card" key={award.title} variants={fadeUp}>
              <div className="award-icon">
                <Trophy size={18} />
              </div>
              <div className="award-title">{award.title}</div>
              <div className="award-org">{award.org}</div>
              <div className="award-desc">{award.desc}</div>
              <div className="award-year">{award.year}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
