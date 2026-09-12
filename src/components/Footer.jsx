import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { scrollBehavior } from '../hooks/useMedia'
import './Footer.css'

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Kolkata',
})

export default function Footer() {
  const [time, setTime] = useState(() => fmt.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 15000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} {PROFILE.name}</span>
        <span className="footer-time mono">Patiala · {time} IST</span>
        <button className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}>
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}
