import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import './Projects.css'

const FEATURED = {
  label: '★ Featured Project',
  title: 'Hotel Booking Platform',
  subtitle: 'Full-Stack MERN Application',
  desc: 'A production-grade hotel reservation system with transaction-safe booking logic, real-time availability management, JWT + Clerk authentication, Redis caching for performance, and Stripe payment processing. Deployed on Vercel with MongoDB Atlas.',
  highlights: [
    'Transaction-safe concurrent booking with optimistic locking',
    'Redis caching layer — 60% reduction in repeat query load',
    'Stripe checkout with webhook-based booking confirmation',
    'Role-based access — guest, admin, and hotel manager views',
  ],
  tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Redis', 'Stripe', 'Clerk Auth', 'Vercel'],
  github: 'https://github.com/yvishi',
  live: '#',
}

const PROJECTS = [
  {
    num: '02',
    title: 'Pulse — AI Emergency Hospital App',
    desc: 'AI-powered mobile app recommending the nearest hospital in real-time using ETA, bed availability, specialty match, and insurance compatibility with Gemini AI triage guidance.',
    tags: ['React Native', 'Firebase', 'Gemini AI', 'Location API'],
    github: 'https://github.com/yvishi',
    live: null,
  },
  {
    num: '03',
    title: 'Room Booking & Task Manager',
    desc: 'Internal tool suite built during internship at Raise Digital — real-time room availability tracker and drag-and-drop task management system for teams.',
    tags: ['MERN Stack', 'REST API', 'Drag & Drop'],
    github: 'https://github.com/yvishi',
    live: null,
  },
  {
    num: '04',
    title: 'SplitSmart — Expense Splitter',
    desc: 'Group expense management app with contact management, group creation, intelligent split logic, and Firestore persistence for shared balances.',
    tags: ['React Native', 'Firestore', 'Expo'],
    github: 'https://github.com/yvishi',
    live: null,
  },
]

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section section-padding">
      <div className="container">
        <motion.div
          className="projects-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">05 · Projects</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-desc">
            Production-ready applications built with care for performance, security, and UX.
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div
          className="project-featured"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="project-featured-inner">
            <div className="project-featured-vis">
              <div className="project-vis-label">{FEATURED.label}</div>
              <div className="project-vis-title">{FEATURED.title}</div>
            </div>
            <div className="project-featured-body">
              <div className="project-tags" style={{ marginBottom: '16px' }}>
                {FEATURED.tags.map((t) => (
                  <span key={t} className="project-tag-dark">{t}</span>
                ))}
              </div>

              <p className="project-desc">{FEATURED.desc}</p>

              <div className="project-highlights">
                {FEATURED.highlights.map((h) => (
                  <div className="project-highlight-item" key={h}>{h}</div>
                ))}
              </div>

              <div className="project-actions">
                <a href={FEATURED.live || '#'} className="btn-project-primary" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={13} /> Live Demo
                </a>
                <a href={FEATURED.github} className="btn-project-outline" target="_blank" rel="noopener noreferrer">
                                  <GithubIcon size={13} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {PROJECTS.map((p) => (
            <motion.div className="project-card" key={p.title} variants={fadeUp}>
              <div className="project-card-top">
                <div className="project-card-num">{p.num}</div>
                <div className="project-card-title">{p.title}</div>
                <div className="project-card-desc">{p.desc}</div>
              </div>
              <div className="project-card-bottom">
                <div className="project-card-tags">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t} className="project-tag-dark">{t}</span>
                  ))}
                </div>
                <div className="project-card-links">
                  {p.live && (
                    <a href={p.live} className="project-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                      <ExternalLink size={13} />
                    </a>
                  )}
                  <a href={p.github} className="project-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub repo">
                    <GithubIcon size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
