import { PROFILE } from '../data/profile'
import { Marquee } from './fx'
import './StackStrip.css'

/** Thin looping strip of the tech stack between the hero and the first section. */
export default function StackStrip() {
  return (
    <div className="strip" aria-label="Technology stack">
      <Marquee items={PROFILE.stack} speed={46} />
    </div>
  )
}
