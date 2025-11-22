import { Greeting } from '../components/Greeting'
import { Navbar } from '../components/Navbar'
import { About } from '../components/About'
import { Experience } from '../components/Experience'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'
import { MusicalNotes } from '../components/MusicalNotes'
import { useParallax } from '../hooks/useParallax'
import { useCursorGradient } from '../hooks/useCursorGradient'

/**
 * Home Page Component
 * 
 * Main portfolio page that combines all sections:
 * - Hero section with greeting and parallax effect
 * - About, Experience, Projects, and Contact sections
 * - Cursor-based gradient background effect
 */
export const Home = () => {
  const heroParallax = useParallax(0.3)
  useCursorGradient()

  return (
    <div
      className="min-h-screen"
      style={{
        background: `radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), 
          #0b2d1f 0%, 
          #0a0a0a 50%)`,
        transition: 'background 0.3s ease-out',
      }}
    >
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 overflow-hidden"
      >
        <Navbar />
        <div className="absolute inset-0 bg-gradient-to-b from-alpine-deep/80 via-alpine-deep/60 to-alpine-deep/80 pointer-events-none" />
        <MusicalNotes />

        <div
          ref={heroParallax.ref}
          className="relative z-10 w-full max-w-6xl mx-auto text-center"
        >
          <Greeting />
        </div>
      </section>

      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  )
}
