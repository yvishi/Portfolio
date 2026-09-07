import { motion } from 'framer-motion'
import { Code2, Globe, Database, Wrench, Cloud } from 'lucide-react'
import './Skills.css'

const SKILLS = [
  {
    icon: Code2,
    title: 'Languages',
    sub: 'Core programming',
    tags: ['C++', 'Python', 'C', 'Java', 'JavaScript', 'SQL'],
  },
  {
    icon: Globe,
    title: 'Web Technologies',
    sub: 'Frontend & backend',
    tags: ['React', 'Node.js', 'Express.js', 'REST APIs', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    icon: Database,
    title: 'Databases & Cloud',
    sub: 'Data & deployment',
    tags: ['MySQL', 'MongoDB', 'Firebase', 'Vercel', 'AWS'],
  },
  {
    icon: Cloud,
    title: 'Third-Party APIs',
    sub: 'Integrations',
    tags: ['Stripe', 'Clerk', 'Cloudinary'],
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    sub: 'Build & workflow',
    tags: ['Hugging Face', 'Jupyter', 'Git', 'GitHub', 'Postman'],
  },
]

const stagger = { visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section section-padding">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <span className="section-label">06 · Skills</span>
          <h2 className="section-title">Technical Stack</h2>
          <p className="section-desc">
            A well-rounded toolkit — from UI frameworks to cloud deployments.
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {SKILLS.map(({ icon: Icon, title, sub, tags, featured }) => (
            <motion.div className={`skill-group${featured ? ' skill-group--featured' : ''}`} key={title} variants={fadeUp}>
              <div className="skill-group-header">
                <div className="skill-group-icon">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="skill-group-title">{title}</div>
                  <div className="skill-group-sub">{sub}</div>
                </div>
              </div>
              <div className="skill-tags">
                {tags.map((t) => (
                  <span className={`tag ${featured ? 'tag-teal' : 'tag-navy'} skill-tag`} key={t}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
