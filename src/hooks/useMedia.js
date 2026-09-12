import { useEffect, useState } from 'react'

function useMediaQuery(query, fallback = false) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : fallback
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/** True when the user asked the OS to reduce motion. */
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True on devices with a precise pointer (mouse / trackpad). */
export function usePointerFine() {
  return useMediaQuery('(pointer: fine)', true)
}

/** True when the viewport is at most `px` wide. */
export function useMaxWidth(px) {
  return useMediaQuery(`(max-width: ${px}px)`)
}

/** Scroll behaviour that honours reduced motion for imperative scrolls. */
export function scrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}
