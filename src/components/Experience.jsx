import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import './Experience.css'

const EXP_DATA = [
  {
    role: 'Software Development Intern',
    company: 'Raise Digital',
    duration: 'May 2024 — Aug 2024',
    location: 'Remote',
    type: 'Internship',
    desc: 'Contributed to building internal tools and customer-facing web features for a digital agency, working with the MERN stack in a production environment.',
    bullets: [
      'Developed a room booking management system with real-time availability updates and admin dashboard',
      'Built a task manager application with drag-and-drop UI, priority labels, and team assignment features',
      'Integrated RESTful APIs and optimized database queries, reducing response times by ~40%',
      'Collaborated with design and product teams in an Agile sprint workflow',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs', 'Agile'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function Experience() {
  return (
    <section id="experience" className="experience-section section-padding">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">04 · Experience</span>
          <h2 className="section-title">Professional Work</h2>
          <p className="section-desc">
            Real-world software development experience in a production environment.
          </p>
        </motion.div>

        <div className="exp-timeline">
          {EXP_DATA.map((exp, i) => (
            <motion.div
              className="exp-item"
              key={exp.role}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <div className="exp-dot-col">
                <div className="exp-dot">
                  <Briefcase size={18} />
                </div>
              </div>

              <div className="exp-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-duration">{exp.duration}</span>
                    <span className="exp-location">{exp.location}</span>
                    <span className="exp-type-badge">{exp.type}</span>
                  </div>
                </div>

                <p className="exp-desc">{exp.desc}</p>

                <ul className="exp-bullets">
                  {exp.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>

                <div className="exp-tags">
                  {exp.tags.map((t) => (
                    <span key={t} className="tag tag-teal">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
