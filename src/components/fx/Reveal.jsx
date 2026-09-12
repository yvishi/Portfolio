import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useMedia'
import { EASE } from './variants'

/**
 * Scroll-triggered reveal. Fades, lifts and un-blurs once when entering the viewport.
 * Under reduced motion it only fades.
 */
export default function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
  margin = '-80px',
  className,
  style,
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] || motion.div

  const hidden = reduced ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }
  const visible = reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <Tag
      className={className}
      style={style}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, margin }}
      transition={{ duration: reduced ? 0.3 : duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
