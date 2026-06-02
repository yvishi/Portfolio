import { motion } from 'framer-motion'
import { GraduationCap, Trophy, CheckCircle } from 'lucide-react'
import './Education.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Education() {
  return (
    <section id="education" className="education-section section-padding">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">03 · Education</span>
          <h2 className="section-title">Academic Credentials</h2>
          <p className="section-desc">
            A track record of top-tier academic performance — from school through university.
          </p>
        </motion.div>

        <div className="edu-grid">
          {/* Thapar Card */}
          <motion.div
            className="edu-card"
            initial={{ opacity: 0, y: 32, filter: 'blur(3px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="edu-card-header">
              <div className="edu-badge">
                <GraduationCap size={22} />
              </div>
              <div className="edu-years">2024 — 2028</div>
            </div>

            <div className="edu-degree">B.E. Computer Engineering</div>
            <div className="edu-school">Thapar Institute of Engineering &amp; Technology, Patiala</div>

            <div className="edu-score">
              <span className="edu-score-value teal-score">9.67</span>
              <div>
                <div className="edu-score-denom">/ 10 CGPA</div>
              </div>
            </div>

            <div className="edu-details">
              {[
                'MERIT-I Scholarship recipient',
                
                'Full-stack, AI, and systems coursework',
              ].map((d) => (
                <div className="edu-detail-row" key={d}>
                  <CheckCircle size={13} />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* St. Joseph's Card */}
          <motion.div
            className="edu-card gold-accent"
            initial={{ opacity: 0, y: 32, filter: 'blur(3px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="edu-card-header">
              <div className="edu-badge gold-bg">
                <Trophy size={22} />
              </div>
              <div className="edu-years">Completed 2024</div>
            </div>

            <div className="edu-degree">ISC (Class XII) — Science Stream</div>
            <div className="edu-school">St. Joseph's Academy, Dehradun</div>

            <div className="edu-score">
              <span className="edu-score-value gold-score">97.5</span>
              <div>
                <div className="edu-score-denom">% — ISC Board</div>
              </div>
            </div>

            <div className="edu-details">
              {[
                'Top 0.1% nationally in ISC Merit List',
                // 'Computer Science, Physics, Chemistry, Mathematics',
                'INSPIRE Scholarship — DST, Govt. of India',
              ].map((d) => (
                <div className="edu-detail-row" key={d}>
                  <CheckCircle size={13} />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
