import { motion } from 'framer-motion'
import { Code2, Globe, Database, Wrench, Smartphone, Cloud } from 'lucide-react'
import './Skills.css'

const SKILLS = [
  {
    icon: Code2,
    title: 'Languages',
    sub: 'Core programming',
    tags: ['JavaScript', 'TypeScript', 'Java', 'Python', 'C', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    icon: Globe,
    title: 'Frontend',
    sub: 'Web & Mobile UI',
    tags: ['React.js', 'React Native', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Expo'],
  },
  {
    icon: Database,
    title: 'Backend',
    sub: 'Server & APIs',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Clerk', 'WebSockets'],
  },
  {
    icon: Database,
    title: 'Databases',
    sub: 'Data persistence',
    tags: ['MongoDB', 'Mongoose', 'Firebase', 'Firestore', 'Redis', 'PostgreSQL'],
  },
  {
    icon: Wrench,
    title: 'Tools & DevOps',
    sub: 'Build & deploy',
    tags: ['Git', 'GitHub', 'Vercel', 'Postman', 'VS Code', 'npm', 'Linux'],
  },
  {
    icon: Cloud,
    title: 'Integrations',
    sub: 'Third-party services',
    tags: ['Stripe', 'Gemini AI', 'EmailJS', 'MongoDB Atlas', 'Cloudinary', 'Google Maps API'],
  },
]

const stagger = { visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
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
          {SKILLS.map(({ icon: Icon, title, sub, tags }) => (
            <motion.div className="skill-group" key={title} variants={fadeUp}>
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
                  <span className="skill-tag" key={t}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
