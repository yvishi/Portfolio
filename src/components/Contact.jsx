import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { Magnetic, Reveal } from './fx'
import './Contact.css'

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_tph33lx'
const EMAILJS_TEMPLATE_ID = 'template_3s2bj7q'
const EMAILJS_PUBLIC_KEY = 'sEJ7wNYtriFxgLAma'

function Field({ id, name, label, as = 'input', ...rest }) {
  const Tag = as
  return (
    <div className="field">
      <Tag id={id} name={name} className="field-input" placeholder=" " {...rest} />
      <label htmlFor={id} className="field-label">{label}</label>
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY })
      setStatus('sent')
      formRef.current?.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <Reveal className="contact-intro">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title contact-title">Let's build<br />something.</h2>
          <p className="contact-avail">
            <span className="live-dot" /> Open to full-time roles, internships, and interesting projects.
          </p>

          <div className="contact-email">
            <a href={`mailto:${PROFILE.email}`} className="contact-email-link">{PROFILE.email}</a>
            <Magnetic strength={0.3} radius={40}>
              <button className={`contact-copy${copied ? ' is-copied' : ''}`} onClick={copyEmail} aria-live="polite">
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </Magnetic>
          </div>

          <ul className="contact-links">
            <li>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                <GithubIcon size={15} /> GitHub <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                <LinkedinIcon size={15} /> LinkedIn <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="contact-link">
                Resume <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="contact-form" ref={formRef} onSubmit={onSubmit} noValidate={false}>
            <div className="field-row">
              <Field id="c-name" name="from_name" label="Name" type="text" required autoComplete="name" />
              <Field id="c-email" name="from_email" label="Email" type="email" required autoComplete="email" />
            </div>
            <Field id="c-subject" name="subject" label="Subject" type="text" required />
            <Field id="c-message" name="message" label="Message" as="textarea" rows={5} required />

            {status === 'error' && (
              <p className="form-error" role="alert">
                The message didn't send. Try again, or email {PROFILE.email} directly.
              </p>
            )}

            <button
              type="submit"
              className={`btn btn-solid form-submit${status === 'sent' ? ' is-sent' : ''}`}
              disabled={status === 'sending' || status === 'sent'}
            >
              {status === 'sent' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  Sent
                </>
              ) : status === 'sending' ? (
                'Sending…'
              ) : (
                <>Send message <ArrowUpRight size={15} /></>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
