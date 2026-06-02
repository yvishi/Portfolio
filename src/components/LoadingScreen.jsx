import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const NAME = 'Yash Vishnoi'

export default function LoadingScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          <div className="loading-inner">
            <div className="loading-name" aria-label={NAME}>
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className={ch === ' ' ? 'loading-space' : 'loading-char'}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.25 + i * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="loading-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="loading-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              Portfolio · 2026
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
