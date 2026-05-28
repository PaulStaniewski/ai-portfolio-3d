import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import './App.css'
import { HeroScene } from './components/HeroScene'

const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact']

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

      <section className="content-section" id="projects">
        <div className="section-heading">
          <span>Selected Work</span>
          <h2>Project systems ready for scroll-driven storytelling.</h2>
        </div>
        <p>
          This section is intentionally light: the hero canvas stays fixed and can be extended into deeper project reveals as the page grows.
        </p>
      </section>
    </main>
  )
}

export default App
