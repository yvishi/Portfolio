import { motion } from 'framer-motion'
import { MapPin, Calendar, Code2 } from 'lucide-react'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const INFO_ITEMS = [
  { label: 'Location', value: 'Patiala, Punjab, India', sub: 'Open to remote & relocation' },
  { label: 'Institution', value: 'Thapar Institute of Engineering & Technology', sub: 'B.E. Software Engineering, 2022–2026' },
  { label: 'Current CGPA', value: '9.67 / 10', sub: 'Consistently top-tier academic standing' },
  { label: 'Availability', value: 'Open to Opportunities', sub: 'Full-time roles & internships' },
]

const INTERESTS = [
  'Full-Stack Web', 'AI/ML Integration', 'System Design',
  'Database Architecture', 'Open Source', 'DevOps',
]

export default function About() {
  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div className="about-heading-block" variants={fadeUp}>
              <span className="section-label">02 · About</span>
              <h2 className="section-title">Building things that matter.</h2>
            </motion.div>

            <motion.p className="about-body" variants={fadeUp}>
              I'm a <span className="about-highlight">final-year Software Engineering student</span> at
              Thapar Institute with a 9.67 CGPA — passionate about writing clean, scalable code and
              shipping products that solve real problems.
            </motion.p>

            <motion.p className="about-body" variants={fadeUp}>
              My work spans the full stack: from crafting responsive React interfaces to designing
              secure Node.js APIs, integrating{' '}
              <span className="about-highlight-teal">Redis caching</span>,{' '}
              <span className="about-highlight-teal">Stripe payments</span>, and deploying to
              production via Vercel and MongoDB Atlas.
            </motion.p>

            <motion.p className="about-body" variants={fadeUp}>
              I also build AI-powered mobile applications — most recently an emergency hospital
              recommendation system using real-time ETA data, location APIs, and the Gemini AI model.
              I care deeply about user experience, code quality, and systems that scale.
            </motion.p>

            <motion.div className="about-interests" variants={fadeUp}>
              {INTERESTS.map((item) => (
                <span key={item} className="tag tag-teal">{item}</span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="about-side"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {INFO_ITEMS.map((item) => (
              <div className="about-info-card" key={item.label}>
                <span className="about-info-label">{item.label}</span>
                <div className="about-info-value">{item.value}</div>
                <div className="about-info-sub">{item.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
