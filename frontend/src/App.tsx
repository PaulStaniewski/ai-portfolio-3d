import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'
import { HeroScene } from './components/HeroScene'

const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact']

const strengths = [
  {
    icon: 'AI',
    title: 'AI-Powered Systems',
    text: 'Building RAG pipelines, AI agents, and intelligent applications that understand context and deliver reliable output.',
  },
  {
    icon: '</>',
    title: 'Fullstack Expertise',
    text: 'From polished React interfaces to robust FastAPI and Django backends built for real product workflows.',
  },
  {
    icon: 'UP',
    title: 'Scalable & Secure',
    text: 'Production-focused systems with clean architecture, strong performance, and maintainable engineering habits.',
  },
]

const stackGroups = [
  { label: 'Frontend', items: ['React', 'TS', 'Vite', 'CSS'] },
  { label: 'Backend', items: ['Python', 'FastAPI', 'Django', 'REST'] },
  { label: 'Data & Infra', items: ['Postgres', 'Vector DB', 'Redis', 'Docker'] },
  { label: 'AI & Tools', items: ['RAG', 'OpenAI', 'Agents', 'LangChain'] },
]

function App() {
  const { scrollYProgress } = useScroll()
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.34, 0.52], [1, 0.86, 0.24])
  const canvasY = useTransform(scrollYProgress, [0, 0.52], ['0svh', '-5svh'])

  return (
    <main className="portfolio-shell">
      <motion.div className="fixed-canvas" style={{ opacity: canvasOpacity, y: canvasY }} aria-hidden="true">
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.18, 8.9], fov: 36, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#eef4ff']} />
          <fog attach="fog" args={['#eef4ff', 9, 24]} />
          <ambientLight intensity={0.85} />
          <directionalLight position={[-4, 5, 7]} intensity={2.4} color="#ffffff" />
          <pointLight position={[4.5, 1.6, 3.2]} intensity={42} color="#7c8cff" />
          <pointLight position={[1.6, -2.6, 2.4]} intensity={26} color="#f7d782" />
          <Suspense fallback={null}>
            <HeroScene />
            <Environment preset="city" environmentIntensity={0.65} />
            <Preload all />
          </Suspense>
        </Canvas>
      </motion.div>

      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Portfolio home">
          PH
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a className={item === 'Home' ? 'active' : undefined} href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </div>
        <a className="talk-button" href="#contact">
          Let's Talk <span aria-hidden="true" />
        </a>
      </nav>

      <section className="hero-section" id="home">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow">
            <span className="spark-icon" aria-hidden="true" />
            AI Engineer & Fullstack Developer
          </div>
          <h1>
            Building AI Powered Solutions & Modern Web Experiences
          </h1>
          <p>
            I design intelligent systems, scalable applications, and immersive interfaces that make complex products feel clear, fast, and premium.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">
              Explore My Work <span aria-hidden="true">{'->'}</span>
            </a>
            <a className="secondary-action" href="/cv.pdf">
              Download CV <span aria-hidden="true">v</span>
            </a>
          </div>
        </motion.div>
      </section>

      <div className="scroll-cue" aria-hidden="true">
        <span className="mouse">
          <span>v</span>
        </span>
        <span>Scroll to explore</span>
        <div className="progress-dots">
          <i />
          <i className="current" />
          <i />
          <i />
        </div>
      </div>

      <section className="section-bridge" aria-hidden="true" />

      <section className="content-section about-section" id="about">
        <span className="section-anchor" id="projects" aria-hidden="true" />
        <motion.div
          className="about-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-heading">
            <span>About Me</span>
            <h2>AI Engineer & Fullstack Developer</h2>
          </div>
          <p>
            I build intelligent systems, scalable applications, and immersive web experiences that turn complex product ideas into fast, usable software.
          </p>

          <div className="strength-list">
            {strengths.map((item, index) => (
              <motion.article
                className="strength-card"
                key={item.title}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-visual"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orbital-shard shard-one" />
          <div className="orbital-shard shard-two" />
          <div className="profile-panel">
            <div className="portrait-glow">
              <span>PS</span>
            </div>
            <div className="profile-caption">
              <h3>Pawel Staniewski</h3>
              <p>AI Engineer & Fullstack Developer</p>
              <span>Poland / Remote</span>
            </div>
          </div>
          <div className="availability-card">
            <span />
            Available for work
          </div>
          <div className="metric-stack">
            <article>
              <span>Experience</span>
              <strong>4+</strong>
              <p>Years building products</p>
            </article>
            <article>
              <span>Projects</span>
              <strong>10+</strong>
              <p>Completed real-world systems</p>
            </article>
            <article>
              <span>Technologies</span>
              <strong>20+</strong>
              <p>Tools in my production stack</p>
            </article>
          </div>
        </motion.div>

        <motion.div
          className="tech-stack-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stack-title">
            <span />
            <h3>My Core Tech Stack</h3>
          </div>
          <div className="stack-grid">
            {stackGroups.map((group) => (
              <div className="stack-group" key={group.label}>
                <h4>{group.label}</h4>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}

export default App
