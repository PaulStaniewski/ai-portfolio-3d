import { Suspense, useEffect, useState } from 'react'
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

const geebotStack = ['Django REST', 'FastAPI SSE', 'Haystack RAG', 'pgvector', 'AI Agents', 'Quiz Gen']

const projectCards = [
  {
    kicker: 'AI Learning',
    title: 'Codex Platform',
    text: 'FastAPI, React, JWT auth, AI tutor flows, lessons, practice sessions, and progress tracking.',
    stat: 'Tutor OS',
  },
  {
    kicker: 'Analytics',
    title: 'Portfolio Intelligence',
    text: 'Realtime product signals, project insights, and clean dashboards for measuring portfolio impact.',
    stat: 'Live Data',
  },
]

const projectPillars = [
  ['AI Systems', 'RAG, agents, document retrieval'],
  ['Backend', 'FastAPI, Django, SSE, REST'],
  ['Databases', 'PostgreSQL, pgvector, Redis'],
  ['Frontend', 'React, TypeScript, glass UI'],
  ['Delivery', 'Docker, CI/CD, production focus'],
]

const skillsStats = [
  ['20+', 'Technologies'],
  ['5+', 'Years Experience'],
  ['15+', 'Projects Built'],
  ['Always', 'Learning'],
]

const workflowNodes = ['User', 'Query', 'RAG Pipeline', 'Retriever', 'Vector DB', 'LLM', 'Answer']

const buildChecklist = ['Document Retrieval', 'Quiz Generation', 'Real-time Responses', 'Multi-agent System', 'RAG Pipeline']

const skillGroups = [
  { label: 'AI & RAG', icon: 'AI', items: ['Haystack', 'OpenAI', 'LangChain', 'RAG', 'Embeddings', 'Agents'] },
  { label: 'Backend', icon: 'BE', items: ['Python', 'FastAPI', 'Django', 'REST', 'SSE', 'WebSockets'] },
  { label: 'Database', icon: 'DB', items: ['PostgreSQL', 'pgvector', 'Redis', 'SQL', 'Vector DB', 'Indexing'] },
  { label: 'Frontend', icon: 'FE', items: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'HTML5', 'CSS3'] },
  { label: 'DevOps & Tools', icon: 'DO', items: ['Docker', 'Git', 'GitHub', 'Linux', 'VS Code', 'Nginx'] },
]

const contactCards = [
  ['Email', 'pawel@portfolio.dev', 'Send Email'],
  ['LinkedIn', 'linkedin.com/in/pawelth', 'Connect'],
  ['GitHub', 'github.com/pawelth', 'View Profile'],
  ['Location', 'Poland (CET)', 'Remote First'],
]

const contactLabels = ['AI Systems', 'Automation', 'Web Apps', 'APIs & Backend', 'Data Solutions']

const contactStats = [
  ['15+', 'Projects Delivered'],
  ['100%', 'Client Satisfaction'],
  ['24h', 'Avg. Response Time'],
  ['Remote', 'Global Collaboration'],
]

const footerLinks = ['GitHub', 'LinkedIn', 'Email', 'CV']

function useIsMobileHero() {
  const [isMobileHero, setIsMobileHero] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 640px)')
    const updateMobileState = () => setIsMobileHero(mobileQuery.matches)

    updateMobileState()
    mobileQuery.addEventListener('change', updateMobileState)

    return () => {
      mobileQuery.removeEventListener('change', updateMobileState)
    }
  }, [])

  return isMobileHero
}

function App() {
  const { scrollYProgress } = useScroll()
  const isMobileHero = useIsMobileHero()
  const canvasOpacity = useTransform(
    scrollYProgress,
    isMobileHero ? [0, 1] : [0, 0.34, 0.52],
    isMobileHero ? [1, 1] : [1, 0.86, 0.24]
  )
  const canvasY = useTransform(
    scrollYProgress,
    isMobileHero ? [0, 1] : [0, 0.52],
    isMobileHero ? ['0svh', '0svh'] : ['0svh', '-5svh']
  )

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
          GEE SOLUTION
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

      <section className="section-bridge" aria-hidden="true" />

      <section className="content-section about-section" id="about">
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

      <section className="projects-section" id="projects">
        <div className="project-atmosphere" aria-hidden="true">
          <span className="project-crystal crystal-a" />
          <span className="project-crystal crystal-b" />
          <span className="project-crystal crystal-c" />
          <span className="project-ring" />
        </div>

        <motion.div
          className="projects-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Featured Projects</span>
          <h2>Projects I Build That Make Impact</h2>
          <p>Production-ready systems, AI-powered workflows, and modern web experiences shaped into polished product showcases.</p>
        </motion.div>

        <motion.div
          className="project-showcase"
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <article className="support-project support-left">
            <span>{projectCards[0].kicker}</span>
            <h3>{projectCards[0].title}</h3>
            <p>{projectCards[0].text}</p>
            <div className="mini-screen">
              <i />
              <i />
              <i />
            </div>
            <strong>{projectCards[0].stat}</strong>
          </article>

          <article className="main-project-panel">
            <div className="project-copy">
              <span>Live System</span>
              <h3>GeeBOT</h3>
              <p>
                Multi-agent AI chatbot platform with RAG, document retrieval, realtime streaming, smart tools, and quiz generation.
              </p>
              <div className="project-tags">
                {geebotStack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-actions">
                <a href="#contact">View Project {'->'}</a>
                <a href="#contact">Live Demo</a>
              </div>
            </div>

            <div className="chat-product-card">
              <div className="chat-sidebar">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="chat-window">
                <div>
                  <strong>GeeBOT</strong>
                  <span>Online</span>
                </div>
                <p className="chat-question">What is RAG and how does it work?</p>
                <article>
                  <h4>RAG Architecture</h4>
                  <p>Combines document retrieval with generated answers for accurate, source-aware responses.</p>
                </article>
                <footer>Ask anything...</footer>
              </div>
            </div>
          </article>

          <article className="support-project support-right">
            <span>{projectCards[1].kicker}</span>
            <h3>{projectCards[1].title}</h3>
            <p>{projectCards[1].text}</p>
            <div className="analytics-grid">
              <div><strong>2.4K</strong><small>Visits</small></div>
              <div><strong>12</strong><small>Projects</small></div>
              <div><strong>8.3K</strong><small>Views</small></div>
            </div>
            <strong>{projectCards[1].stat}</strong>
          </article>
        </motion.div>

        <motion.div
          className="project-pillars"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span />
            <h3>What I Work On</h3>
            <p>End-to-end systems that are scalable, performant, and useful for real users.</p>
          </div>
          {projectPillars.map(([title, text]) => (
            <article key={title}>
              <span>{title.slice(0, 2)}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="skills-section" id="skills">
        <div className="skills-atmosphere" aria-hidden="true">
          <span className="workspace-cube cube-one" />
          <span className="workspace-cube cube-two" />
          <span className="workspace-orb orb-one" />
          <span className="workspace-orb orb-two" />
        </div>

        <motion.div
          className="skills-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Skills & Technologies</span>
          <h2>The Tech Stack Behind My Work</h2>
          <p>A modern toolkit for building AI-powered systems, scalable applications, and intuitive interfaces. Crafted for performance, designed for impact.</p>
          <div className="skills-stats">
            {skillsStats.map(([value, label]) => (
              <article key={label}>
                <span>{value}</span>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="workspace-composition"
          initial={{ opacity: 0, y: 34, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          <article className="editor-monitor">
            <div className="window-dots"><span /><span /><span /></div>
            <aside>
              <strong>EXPERTISE</strong>
              <span>AI & RAG</span>
              <span>Backend</span>
              <span>Frontend</span>
              <span>Database</span>
              <span>Architecture</span>
            </aside>
            <div className="code-screen">
              <span>skills.py</span>
              <pre>{`class Developer:
  def __init__(self):
    self.focus = [
      "AI-powered systems",
      "Scalable backend architecture",
      "Real-time data processing",
      "Intuitive user experiences",
    ]

  def solve(self, problem):
    plan = self.analyze(problem)
    solution = self.build(plan)
    return self.deliver(solution)

# Built to create impact
dev = Developer()`}</pre>
            </div>
          </article>

          <article className="terminal-panel">
            <strong>bash</strong>
            <p><span>pawel@portfolio:~$</span> ls skills/</p>
            <p>ai/ backend/ frontend/ devops/</p>
            <p><span>pawel@portfolio:~$</span> cat mindset.txt</p>
            <p>{'>'} Solve problems</p>
            <p>{'>'} Build scalable systems</p>
            <p>{'>'} Automate everything</p>
          </article>

          <article className="ai-flow-panel">
            <h3>AI System Flow</h3>
            <div className="flow-grid">
              {workflowNodes.map((node) => (
                <span key={node}>{node}</span>
              ))}
            </div>
          </article>

          <article className="currently-building">
            <h3>Currently Building</h3>
            <div>
              <span>G</span>
              <div>
                <strong>GeeBOT</strong>
                <p>AI Agent Chatbot Platform</p>
              </div>
            </div>
            <ul>
              {buildChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="build-progress"><span /></div>
          </article>
        </motion.div>

        <motion.div
          className="skills-stack-board"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {skillGroups.map((group) => (
            <article key={group.label}>
              <div>
                <span>{group.icon}</span>
                <h3>{group.label}</h3>
              </div>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </motion.div>

        <motion.p
          className="skills-quote"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Combining AI, robust backend systems, and modern interfaces to build products that solve real problems.
        </motion.p>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-atmosphere" aria-hidden="true">
          <span className="contact-orb contact-orb-one" />
          <span className="contact-orb contact-orb-two" />
          <span className="contact-orb contact-orb-three" />
          <span className="contact-crystal contact-crystal-one" />
          <span className="contact-crystal contact-crystal-two" />
        </div>

        <motion.div
          className="contact-copy"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Let's Connect</span>
          <h2>Let's Create The Future Together</h2>
          <p>Whether you have a project in mind or just want to say hi, I would love to hear from you.</p>
          <div className="contact-intent-grid">
            <article>Open to new opportunities</article>
            <article>Collaborations & partnerships</article>
            <article>AI & innovative projects</article>
            <article>Long-term relationships</article>
          </div>
          <div className="contact-stats">
            {contactStats.map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="connect-universe"
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="digital-core">
            <div className="core-message">
              <span>Send a Message</span>
              <p>Tell me about your project and let's build something extraordinary together.</p>
              <a href="mailto:pawel@portfolio.dev">Start Conversation {'->'}</a>
            </div>
          </div>
          {contactLabels.map((label, index) => (
            <span className={`orbit-label orbit-label-${index + 1}`} key={label}>
              {label}
            </span>
          ))}
        </motion.div>

        <motion.aside
          className="contact-card"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3>Get In Touch</h3>
          {contactCards.map(([title, detail, action]) => (
            <article key={title}>
              <span>{title.slice(0, 2)}</span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
              <a href={title === 'Email' ? 'mailto:pawel@portfolio.dev' : '#contact'}>{action}</a>
            </article>
          ))}
          <p>Available Worldwide</p>
        </motion.aside>

        <motion.div
          className="contact-banner"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          Building modern, AI-powered solutions that solve real problems and create real impact.
        </motion.div>

        <footer className="site-footer">
          <div>
            <span className="footer-mark">{'</>'}</span>
            <div>
              <h3>Let's turn ideas into impactful digital products.</h3>
              <p>I am excited to learn about your project and explore how we can work together.</p>
            </div>
          </div>
          <a className="footer-cta" href="mailto:pawel@portfolio.dev">Ready to start your next project? {'->'}</a>
          <div className="quick-response">
            <span />
            <strong>Quick Response</strong>
            <p>I usually reply within 24 hours</p>
          </div>
          <nav className="footer-socials" aria-label="Footer social links">
            {footerLinks.map((link) => (
              <a href={link === 'Email' ? 'mailto:pawel@portfolio.dev' : '#contact'} key={link}>
                {link}
              </a>
            ))}
          </nav>
          <p className="footer-bottom">© 2026 Pawel H. All rights reserved. Crafted with passion.</p>
        </footer>
      </section>
    </main>
  )
}

export default App
