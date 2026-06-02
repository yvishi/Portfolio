import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import './Experience.css'

const EXP_DATA = [
  {
    role: 'AI Software Engineer Intern',
    company: 'Dakhila AI',
    duration: 'May 2026 — Present',
    location: 'Remote',
    type: 'Internship',
    desc: 'Building AI-powered product features and contributing to core platform development at an early-stage AI company.',
    bullets: [
      'Developed a document integrity verification system that validates the authenticity of OCR-scanned documents, cross-checking structural and semantic signals to flag tampered or invalid submissions',
      'Contributing to feature development and bug fixes across the core AI platform pipeline',
    ],
    tags: ['Python', 'OCR', 'Document AI', 'REST APIs', 'Feature Engineering'],
    accent: true,
  },
  {
    role: 'Software Development Intern',
    company: 'Raise Digital',
    duration: 'March 2025 — April 2025',
    location: 'Remote',
    type: 'Internship',
    desc: 'Built internal tools and customer-facing web applications for a digital agency using Laravel and the MERN stack in a production environment.',
    bullets: [
      'Developed an end-to-end Room Booking Platform with secure user authentication and role-based access using Laravel, backed by a MySQL database managing rooms, users, and reservation records',
      'Built a Task Management System with task creation, deletion, deadlines, and search functionality — REST APIs tested via Postman, email notifications via Mailtrap, Bootstrap-based frontend',
      'Integrated RESTful APIs and optimized database queries, reducing response times by ~40%',
    ],
    tags: ['Laravel', 'MySQL', 'REST APIs', 'Bootstrap', 'Postman', 'Mailtrap'],
    accent: false,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
            Building real-world products across AI platforms and full-stack web development.
          </p>
        </motion.div>

        <div className="exp-timeline">
          {EXP_DATA.map((exp, i) => (
            <motion.div
              className={`exp-item${exp.accent ? ' exp-item--accent' : ''}`}
              key={exp.company}
              initial={{ opacity: 0, x: -24, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="exp-dot-col">
                <div className={`exp-dot${exp.accent ? ' exp-dot--accent' : ''}`}>
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
                    <span className={`exp-type-badge${exp.accent ? ' exp-type-badge--active' : ''}`}>{exp.type}</span>
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
