import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'
import logo from '../assets/initials-removebg-preview.png'

const NAV_ITEMS = ['About', 'Education', 'Experience', 'Projects', 'Skills', 'Awards', 'Contact']

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="nav-logo" onClick={scrollToTop} aria-label="Scroll to top">
          <img src={logo} alt="Yash Vishnoi" className="nav-logo-img" />
        </button>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <button
                  className={`nav-link-btn${activeSection === item.toLowerCase() ? ' active' : ''}`}
                  onClick={() => scrollTo(item)}
                  aria-current={activeSection === item.toLowerCase() ? 'page' : undefined}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-cta-wrap">
          <a
            href="https://drive.google.com/file/d/16H26VaYQmDu47id2lIQwt7Qqtwa5FY04/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '12.5px', padding: '8px 18px' }}
            title="View resume"
          >
            Resume ↓
          </a>
          <button
            className={`nav-toggle${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile open"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className={`nav-mobile-link${activeSection === item.toLowerCase() ? ' active' : ''}`}
                onClick={() => scrollTo(item)}
              >
                {item}
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1gsCrsWixjqLbRhlPvPKeX3n6nkxqOl5G/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: '12px', alignSelf: 'flex-start' }}
              title="View resume"
            >
              Download Resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
