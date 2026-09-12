import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { ReactLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StackStrip from './components/StackStrip'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Awards from './components/Awards'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { Cursor, GradualBlur, Grain } from './components/fx'
import { useReducedMotion } from './hooks/useMedia'

const SECTIONS = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'awards', 'contact']
const LOADER_MS = 1900

function useLoadingState() {
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem('portfolio_visited'))

  useEffect(() => {
    if (!isLoading) return
    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('portfolio_visited', '1')
    }, LOADER_MS)
    return () => clearTimeout(timer)
  }, [isLoading])

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isLoading])

  return isLoading
}

function useActiveSection() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.1, rootMargin: '-15% 0px -55% 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return active
}

export default function App() {
  const isLoading = useLoadingState()
  const activeSection = useActiveSection()
  const lenisRef = useRef()
  const reduced = useReducedMotion()

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return
    if (isLoading) lenis.stop()
    else lenis.start()
  }, [isLoading])

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        ref={lenisRef}
        options={
          reduced
            ? { lerp: 1, duration: 0, smoothWheel: false }
            : { lerp: 0.09, duration: 1.3, smoothWheel: true }
        }
      >
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loader" />}
        </AnimatePresence>

        <Grain />
        <Cursor />
        <GradualBlur height={72} strength={12} />

        <Navbar activeSection={activeSection} />
        <main>
          <Hero />
          <StackStrip />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Awards />
          <Contact />
        </main>
        <Footer />
        <Analytics />
      </ReactLenis>
    </MotionConfig>
  )
}
