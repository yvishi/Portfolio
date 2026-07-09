import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import './Contact.css'

// ── EmailJS credentials ──────────────────────────────────
// Replace these three values after creating your EmailJS account.
// See: https://www.emailjs.com/docs/tutorial/overview/
const EMAILJS_SERVICE_ID  = 'service_tph33lx'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_3s2bj7q'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'sEJ7wNYtriFxgLAma'   // e.g. 'AbCdEfGhIjKl12345'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'y.v.s.vishnoi@gmail.com',
    href: 'mailto:y.v.s.vishnoi@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Patiala, Punjab, India',
    href: null,
  },
]

export default function Contact() {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // DOM name attrs use emailjs convention (from_name, from_email); state uses short keys
  const domToState = { from_name: 'name', from_email: 'email', subject: 'subject', message: 'message' }

  const handleChange = (e) => {
    const key = domToState[e.target.name] ?? e.target.name
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Failed to send message. Please try again or email directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">08 · Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-desc">
            Open to full-time roles, internships, and interesting projects. Always happy to connect.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {CONTACT_ITEMS.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href} className="contact-item">
                  <div className="contact-item-icon"><item.icon size={17} /></div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </a>
              ) : (
                <div key={item.label} className="contact-item">
                  <div className="contact-item-icon"><item.icon size={17} /></div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </div>
              )
            )}

            <div className="contact-socials">
              <a
                href="https://github.com/yvishi"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <GithubIcon size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yash-vishnoi-8656a7312/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit} id="contact-form" ref={formRef}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="from_name"
                    type="text"
                    placeholder="Your name"
                    className="form-input"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="from_email"
                    type="email"
                    placeholder="you@example.com"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="form-input"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your message..."
                  className="form-textarea"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>
              {error && (
                <div className="form-error">{error}</div>
              )}

              <button
                type="submit"
                className="form-submit"
                id="contact-submit"
                disabled={loading || submitted}
              >
                {submitted ? (
                  <>
                    <CheckCircle size={15} /> Message Sent!
                  </>
                ) : loading ? (
                  'Sending…'
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer — minimalistic */}
      <footer className="portfolio-footer">
        <div className="container">
          <div className="footer-bottom">
            <span className="footer-copy">© {new Date().getFullYear()} Yash Vishnoi. All rights reserved.</span>
            <span className="footer-made">Built with React · Framer Motion</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
