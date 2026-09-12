import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useMedia'

/**
 * Canvas dot grid that brightens and drifts toward the pointer, then springs back.
 * Fills its positioned parent. Static under reduced motion.
 */
export default function DotField({
  gap = 28,
  dotSize = 1.4,
  radius = 170,
  pull = 14,
  color = '143, 169, 255',
  baseAlpha = 0.22,
  maxAlpha = 0.95,
  className,
}) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement

    let dots = []
    let width = 0
    let height = 0
    let raf = 0
    let visible = true
    let dpr = 1
    const pointer = { x: -9999, y: -9999, active: false }

    const build = () => {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.ceil(width / gap) + 1
      const rows = Math.ceil(height / gap) + 1
      const offX = (width - (cols - 1) * gap) / 2
      const offY = (height - (rows - 1) * gap) / 2
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ ox: offX + c * gap, oy: offY + r * gap, x: 0, y: 0, vx: 0, vy: 0, a: baseAlpha })
        }
      }
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = `rgba(${color}, ${baseAlpha})`
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.ox, d.oy, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const r2 = radius * radius
    const step = () => {
      if (!visible) return
      ctx.clearRect(0, 0, width, height)
      for (const d of dots) {
        const dx = pointer.x - d.ox
        const dy = pointer.y - d.oy
        const dist2 = dx * dx + dy * dy
        let tx = 0
        let ty = 0
        let ta = baseAlpha
        if (pointer.active && dist2 < r2) {
          const dist = Math.sqrt(dist2) || 1
          const f = 1 - dist / radius // 0..1
          const ease = f * f * (3 - 2 * f) // smoothstep
          tx = (dx / dist) * pull * ease
          ty = (dy / dist) * pull * ease
          ta = baseAlpha + (maxAlpha - baseAlpha) * ease
        }
        // spring toward target
        d.vx += (tx - d.x) * 0.12
        d.vy += (ty - d.y) * 0.12
        d.vx *= 0.78
        d.vy *= 0.78
        d.x += d.vx
        d.y += d.vy
        d.a += (ta - d.a) * 0.15

        ctx.fillStyle = `rgba(${color}, ${d.a})`
        ctx.beginPath()
        ctx.arc(d.ox + d.x, d.oy + d.y, dotSize + d.a * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(step)
    }

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => { pointer.active = false }

    build()
    if (reduced) {
      drawStatic()
    } else {
      raf = requestAnimationFrame(step)
      parent.addEventListener('pointermove', onMove, { passive: true })
      parent.addEventListener('pointerleave', onLeave, { passive: true })
    }

    const ro = new ResizeObserver(() => {
      build()
      if (reduced) drawStatic()
    })
    ro.observe(parent)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduced) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(step)
      }
    })
    io.observe(parent)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [gap, dotSize, radius, pull, color, baseAlpha, maxAlpha, reduced])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'block' }}
    />
  )
}
