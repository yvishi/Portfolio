import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import sihbuddyShot from '../assets/projects/sihbuddy-landing.jpg'
import hotelBookingShot from '../assets/projects/hotelbooking-landing.jpg'
import './Projects.css'

// ── Tier 1: Full-width featured ──────────────────────────
const FEATURED = {
  title: 'SIH Buddy',
  subtitle: 'Problem Statement Discovery Platform',
  desc: 'A full-stack platform analyzing 226 Smart India Hackathon 2026 problem statements — letting teams search, rank, compare, and shortlist problems, with a Python forecasting pipeline that estimates competition from historical SIH outcomes. Live in production, serving 20,000+ users and 90,000+ views.',
  highlights: [
    'REST APIs for authentication, cross-device shortlist sync, and tokenized sharing on Firebase, Firestore, and Redis',
    'Python forecasting pipeline estimating problem-statement competition from historical SIH outcomes',
    'Analytics, SEO, and usage-based onboarding built to support platform growth',
    'Serving 20,000+ users and 90,000+ views in production',
  ],
  tags: ['React', 'Firebase', 'Firestore', 'Redis', 'Python', 'SEO'],
  github: null,
  live: 'https://www.sihbuddy.in/',
  shot: sihbuddyShot,
}

// ── Tier 1.5: Secondary deployed project ─────────────────
const SECONDARY = {
  label: 'Also Live',
  title: 'Hotel Booking Platform',
  subtitle: 'Full-Stack MERN Application',
  desc: 'A production-grade hotel reservation system with transaction-safe booking logic, real-time availability management, JWT + Clerk authentication, Redis caching, and Stripe payment processing. Deployed on Vercel with MongoDB Atlas.',
  tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Stripe', 'Clerk Auth'],
  github: 'https://github.com/yvishi/Hotel-Booking',
  live: 'https://quickstay-teal.vercel.app/',
  shot: hotelBookingShot,
}

// ── Tier 2: Small grid ───────────────────────────────────
const PROJECTS = [
  {
    num: '03',
    title: 'RankX',
    subtitle: 'Multi-LLM Benchmarking System',
    desc: 'Runs Claude, GPT-4o, and Gemini simultaneously via asyncio.gather — returning latency, token counts, and cost per model. Blind quality scoring with zero server-side key storage.',
    tags: ['Claude API', 'GPT-4o', 'Gemini', 'FastAPI'],
    github: 'https://github.com/yvishi',
    live: null,
  },
  {
    num: '04',
    title: 'SplitSmart',
    subtitle: 'Expense Splitter',
    desc: 'Group expense management app with contact management, group creation, intelligent split logic, and Firestore persistence for shared balances.',
    tags: ['React Native', 'Firestore', 'Expo'],
    github: 'https://github.com/yvishi/SplitSmart',
    live: null,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

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

        {/* Tier 1 — Featured (full-width) */}
        <motion.div
          className="project-featured"
          initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-featured-inner">
            <div className="project-featured-vis">
              <img src={FEATURED.shot} alt={`${FEATURED.title} landing page`} className="project-vis-shot" loading="lazy" />
              <div className="project-vis-scrim" />
              <div className="project-vis-top project-vis-top--end">
                <span className="status-live"><span className="status-dot" />Live</span>
              </div>
              <div className="project-vis-title">{FEATURED.title}</div>
              <div className="project-vis-subtitle">{FEATURED.subtitle}</div>
            </div>
            <div className="project-featured-body">
              <div className="project-tags" style={{ marginBottom: '16px' }}>
                {FEATURED.tags.map((t) => (
                  <span key={t} className="tag tag-teal">{t}</span>
                ))}
              </div>
              <p className="project-desc">{FEATURED.desc}</p>
              <div className="project-highlights">
                {FEATURED.highlights.map((h) => (
                  <div className="project-highlight-item" key={h}>{h}</div>
                ))}
              </div>
              <div className="project-actions">
                <a href={FEATURED.live} className="btn-project-primary" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={13} /> View Live Site
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tier 1.5 — Secondary deployed project */}
        <motion.div
          className="project-secondary"
          initial={{ opacity: 0, y: 32, filter: 'blur(3px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="project-secondary-inner">
            <div className="project-secondary-head">
              <img src={SECONDARY.shot} alt={`${SECONDARY.title} landing page`} className="project-vis-shot" loading="lazy" />
              <div className="project-vis-scrim project-vis-scrim--tight" />
              <div className="project-vis-top">
                <div className="project-vis-label project-vis-label--muted">{SECONDARY.label}</div>
                <span className="status-live"><span className="status-dot" />Live</span>
              </div>
              <div className="project-secondary-title">{SECONDARY.title}</div>
              <div className="project-card-subtitle">{SECONDARY.subtitle}</div>
            </div>
            <div className="project-secondary-body">
              <p className="project-desc project-desc--tight">{SECONDARY.desc}</p>
              <div className="project-tags" style={{ marginBottom: 0 }}>
                {SECONDARY.tags.map((t) => (
                  <span key={t} className="tag tag-teal">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-secondary-actions">
              <a href={SECONDARY.live} className="btn-project-primary" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={13} /> Live Demo
              </a>
              <a href={SECONDARY.github} className="btn-project-outline" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={13} /> GitHub
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tier 2 — Small 2-col grid */}
        <motion.div
          className="projects-grid projects-grid--two"
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
                {p.subtitle && <div className="project-card-subtitle">{p.subtitle}</div>}
                <div className="project-card-desc">{p.desc}</div>
              </div>
              <div className="project-card-bottom">
                <div className="project-card-tags">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="tag tag-teal">{t}</span>
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
