import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import './Hero.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" aria-label="Hero section">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient" />
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-tag"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          Software Engineer &amp; Full-Stack Developer
        </motion.div>

        <motion.h1
          className="hero-name"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
        >
          Yash
          <span className="name-accent">Vishnoi.</span>
        </motion.h1>

        <motion.p
          className="hero-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.38}
        >
          MERN Stack · AI Applications · Secure Systems
        </motion.p>

        <motion.p
          className="hero-tagline"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          Final-year Software Engineering student at Thapar Institute of Engineering &amp; Technology
          with a 9.67 CGPA — building production-grade applications that people actually use.
        </motion.p>

        <motion.div
          className="hero-actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.62}
        >
          <button className="btn btn-primary" onClick={scrollToProjects} id="hero-view-projects">
            View Projects →
          </button>
          <button className="btn btn-ghost-white" onClick={scrollToContact} id="hero-contact">
            Get In Touch
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.75}
        >
          {[
            { value: '9.67', unit: '/10', label: 'CGPA — Thapar Institute' },
            { value: '97.5', unit: '%', label: 'ISC Board — Top 0.1%' },
            { value: '3+', unit: '', label: 'Production Projects' },
            { value: 'MERIT-I', unit: '', label: 'Scholarship Recipient' },
          ].map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <div className="hero-stat-value">
                {stat.value}<em>{stat.unit}</em>
              </div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Social Links */}
      <div className="hero-socials" aria-label="Social links">
        <a href="https://github.com/yvishi" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
          <GithubIcon size={16} />
        </a>
        <a href="https://linkedin.com/in/yash-vishnoi" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
          <LinkedinIcon size={16} />
        </a>
        <a href="mailto:yash.vishnoi@thapar.edu" className="social-btn" aria-label="Email">
          <Mail size={16} />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}
