import './GradualBlur.css'

/**
 * Progressive blur strip fixed to the top of the viewport so content softens
 * as it slides under the nav. Five stacked backdrop-filter layers with
 * increasing blur and offset gradient masks.
 */
export default function GradualBlur({ height = 64, layers = 5, strength = 10 }) {
  const items = Array.from({ length: layers }, (_, i) => {
    const p = (i + 1) / layers
    const blur = (strength * p).toFixed(1)
    const start = Math.max(0, (i / layers) * 100 - 100 / layers)
    const mid = (i / layers) * 100
    const end = Math.min(100, ((i + 1) / layers) * 100)
    // mask is inverted (strongest blur at the top edge)
    const mask = `linear-gradient(to top, transparent ${100 - end}%, #000 ${100 - mid}%, #000 ${100 - start}%, transparent 100%)`
    return (
      <div
        key={i}
        className="gblur-layer"
        style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: mask, WebkitMaskImage: mask }}
      />
    )
  })

  return (
    <div className="gblur" style={{ height }} aria-hidden="true">
      {items}
    </div>
  )
}
