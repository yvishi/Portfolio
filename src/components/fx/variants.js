// Shared Framer Motion variants for staggered reveals.
export const EASE = [0.22, 1, 0.36, 1]

/** Parent variants: use with <motion.ul variants={staggerParent()} initial="hidden" whileInView="visible">. */
export const staggerParent = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

/** Child variants for items inside a staggerParent. */
export const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
}
