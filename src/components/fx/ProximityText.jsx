import { useEffect, useMemo, useRef } from 'react'
import { usePointerFine, useReducedMotion } from '../../hooks/useMedia'

/**
 * Variable-font proximity effect. Each letter eases its
 * `font-variation-settings` between `from` and `to` based on the pointer's
 * distance (gaussian falloff). Requires a variable font with wdth/wght axes.
 */
export default function ProximityText({
  text,
  radius = 160,
  from = { wdth: 80, wght: 300 },
  to = { wdth: 100, wght: 700 },
  rest = { wdth: 90, wght: 400 }, // used when the effect is disabled
  className,
  as: Tag = 'span',
}) {
  const rootRef = useRef(null)
  const lettersRef = useRef([])
  const reduced = useReducedMotion()
  const fine = usePointerFine()
  const enabled = fine && !reduced

  const letters = useMemo(() => Array.from(text), [text])

  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    if (!root) return

    const pointer = { x: -9999, y: -9999 }
    const cur = new Float32Array(letters.length) // eased influence per letter
    let raf = 0
    let running = false
    const sigma = radius / 2.2
    const limit = radius * radius * 1.6

    const frame = () => {
      let busy = false
      const els = lettersRef.current
      for (let i = 0; i < els.length; i++) {
        const el = els[i]
        if (!el) continue
        const r = el.getBoundingClientRect()
        const dx = pointer.x - (r.left + r.width / 2)
        const dy = pointer.y - (r.top + r.height / 2)
        const d2 = dx * dx + dy * dy
        const target = d2 < limit ? Math.exp(-d2 / (2 * sigma * sigma)) : 0
        const next = cur[i] + (target - cur[i]) * 0.2
        if (Math.abs(next - cur[i]) > 0.0015 || target > 0.002) busy = true
        cur[i] = next
        const wdth = from.wdth + (to.wdth - from.wdth) * next
        const wght = from.wght + (to.wght - from.wght) * next
        el.style.fontVariationSettings = `'wdth' ${wdth.toFixed(1)}, 'wght' ${wght.toFixed(0)}, 'opsz' 96`
      }
      if (busy) raf = requestAnimationFrame(frame)
      else running = false
    }

    const kick = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }
    const onMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      kick()
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
      kick()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', kick, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', kick)
    }
  }, [enabled, radius, from.wdth, from.wght, to.wdth, to.wght, letters.length])

  const staticSettings = enabled
    ? `'wdth' ${from.wdth}, 'wght' ${from.wght}, 'opsz' 96`
    : `'wdth' ${rest.wdth}, 'wght' ${rest.wght}, 'opsz' 96`

  return (
    <Tag ref={rootRef} className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(el) => { lettersRef.current[i] = el }}
          style={{
            display: 'inline-block',
            fontVariationSettings: staticSettings,
            whiteSpace: ch === ' ' ? 'pre' : undefined,
          }}
        >
          {ch}
        </span>
      ))}
    </Tag>
  )
}
