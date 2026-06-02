import { motion } from 'framer-motion'
import { Code2, Globe, Database, Wrench, Cloud, Brain, Server } from 'lucide-react'
import './Skills.css'

const SKILLS = [
  {
    icon: Brain,
    title: 'ML & Deep Learning',
    sub: 'AI & RL systems',
    tags: ['PyTorch', 'Keras', 'Reinforcement Learning', 'Multi-Agent Systems', 'GRPO', 'QLoRA', 'Hugging Face', 'Jupyter'],
    featured: true,
  },
  {
    icon: Code2,
    title: 'Languages',
    sub: 'Core programming',
    tags: ['C++', 'Python', 'JavaScript', 'Java', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    icon: Globe,
    title: 'Frontend',
    sub: 'Web & Mobile UI',
    tags: ['React.js', 'React Native', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Expo'],
  },
  {
    icon: Server,
    title: 'Backend',
    sub: 'Server & APIs',
    tags: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT Auth', 'Docker'],
  },
  {
    icon: Database,
    title: 'Databases',
    sub: 'Data persistence',
    tags: ['MongoDB', 'MySQL', 'Firebase', 'Firestore', 'Redis', 'PostgreSQL'],
  },
  {
    icon: Wrench,
    title: 'Tools & DevOps',
    sub: 'Build & deploy',
    tags: ['Git', 'GitHub', 'AWS', 'Vercel', 'Postman', 'Hugging Face', 'Linux'],
  },
  {
    icon: Cloud,
    title: 'Integrations',
    sub: 'Third-party services',
    tags: ['Stripe', 'Clerk', 'Claude API', 'OpenAI', 'Gemini', 'Cloudinary'],
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
