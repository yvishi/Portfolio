import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import './Awards.css'

const AWARDS = [
  {
    title: 'MERIT-I Scholarship',
    org: 'Thapar Institute of Engineering & Technology',
    desc: 'Merit-based scholarship awarded to top-performing students in the department for consistently high CGPA throughout the degree.',
    year: '2024 — Present',
  },
  {
    title: 'ISC Merit List',
    org: 'Council for Indian School Certificate Examinations',
    desc: 'Nationally recognized for scoring in the top 0.1% of ISC Class XII Board Computer Science examinees across India with a 97.5% aggregate.',
    year: '2024',
  },
  {
    title: 'INSPIRE Scholarship',
    org: 'Dept. of Science and Technology, Govt. of India',
    desc: 'Prestigious government scholarship awarded to students who ranked in the top 1% of their respective Board examinations.',
    year: '2024',
  },
]

const stagger = { visible: { transition: { staggerChildren: 0.12 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
