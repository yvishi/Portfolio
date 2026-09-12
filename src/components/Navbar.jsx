import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { scrollBehavior } from '../hooks/useMedia'
import { GradualBlur } from './fx'
import './Navbar.css'

const NAV_ITEMS = ['About', 'Education', 'Experience', 'Projects', 'Skills', 'Awards', 'Contact']
const EASE = [0.22, 1, 0.36, 1]

export default function Navbar({ activeSection }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 24)
        if (!open) setHidden(y > last && y > 160)
        last = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
  }
  const top = () => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: scrollBehavior() })
  }

  return (
    <>
      <GradualBlur height={72} strength={12} hidden={hidden} />

      <header className={`nav${hidden ? ' nav--hidden' : ''}${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="nav-mark" onClick={top} aria-label="Back to top">
            <span className="nav-mark-text">YV</span>
          </button>

          <nav className="nav-pill" aria-label="Sections">
            {NAV_ITEMS.map((item) => {
              const id = item.toLowerCase()
              const active = activeSection === id
              return (
                <button
                  key={item}
                  className={`nav-item${active ? ' is-active' : ''}`}
                  onClick={() => go(item)}
                  aria-current={active ? 'page' : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="nav-item-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                    />
                  )}
                  <span className="nav-item-label">{item}</span>
                </button>
              )
            })}
          </nav>

          <div className="nav-right">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume"
            >
              Resume <ArrowUpRight size={14} strokeWidth={2} />
            </a>
            <button
              className={`nav-burger${open ? ' is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav-overlay"
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-overlay"
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="nav-overlay-list" aria-label="Sections">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  className={`nav-overlay-link${activeSection === item.toLowerCase() ? ' is-active' : ''}`}
                  onClick={() => go(item)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: EASE }}
                >
                  <span className="nav-overlay-index">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </motion.button>
              ))}
            </nav>
            <motion.div
              className="nav-overlay-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                View resume <ArrowUpRight size={15} />
              </a>
              <a href={`mailto:${PROFILE.email}`} className="nav-overlay-mail">{PROFILE.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
