import './Marquee.css'

/**
 * Infinite horizontal loop of `items`. Pure CSS animation; pauses on hover.
 * `speed` is seconds per full loop of one sequence.
 */
export default function Marquee({ items, speed = 40, separator = '·', className = '' }) {
  const sequence = (key) => (
    <ul className="marquee-seq" aria-hidden={key !== 'a'} key={key}>
      {items.map((item, i) => (
        <li key={`${key}-${i}`} className="marquee-item">
          <span>{item}</span>
          <span className="marquee-sep" aria-hidden="true">{separator}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`marquee ${className}`} style={{ '--marquee-speed': `${speed}s` }}>
      <div className="marquee-track">
        {sequence('a')}
        {sequence('b')}
      </div>
    </div>
  )
}
