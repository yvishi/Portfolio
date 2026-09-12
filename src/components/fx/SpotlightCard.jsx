import { useRef } from 'react'
import './SpotlightCard.css'

/**
 * Card with a pointer-following radial glow and a border that lights up
 * nearest the pointer. Sets --mx / --my in px on the element; CSS does the rest.
 */
export default function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <Tag ref={ref} className={`spot ${className}`} onPointerMove={onMove} {...rest}>
      {children}
    </Tag>
  )
}
