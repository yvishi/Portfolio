import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Awards from './components/Awards'
import Contact from './components/Contact'
import LoadingScreen from './components/LoadingScreen'
import ScrollSpine from './components/ScrollSpine'

const SECTIONS = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'awards', 'contact']

function useLoadingState() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('portfolio_visited')
  })

  useEffect(() => {
    if (!isLoading) return
    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem('portfolio_visited', '1')
    }, 2300)
    return () => clearTimeout(timer)
  }, [isLoading])

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isLoading])

  return isLoading
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const isLoading = useLoadingState()
  const { scrollYProgress } = useScroll()

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observers = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35, rootMargin: '-10% 0px -55% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      {/* Loading screen — slides up when done */}
      <AnimatePresence>
        {isLoading && <LoadingScreen isVisible={isLoading} />}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Scroll spine indicator */}
      <ScrollSpine activeSection={activeSection} />

      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <Analytics />
    </>
  )
}
