import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import './Contact.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'yash.vishnoi@thapar.edu',
    href: 'mailto:yash.vishnoi@thapar.edu',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Patiala, Punjab, India',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate form submission (connect to Formspree/EmailJS in production)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="contact" className="contact-section section-padding">
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
                href="https://linkedin.com/in/yash-vishnoi"
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
            <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
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
                    name="email"
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

        {/* Footer */}
        <div className="portfolio-footer">
          <div className="container footer-inner" style={{ padding: 0 }}>
            <div className="footer-copy">
              © 2026 <span>Yash Vishnoi</span>. All rights reserved.
            </div>
            <div className="footer-made">
              Built with React + Framer Motion · Deployed on Vercel
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
