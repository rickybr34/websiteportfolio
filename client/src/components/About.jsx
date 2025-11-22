import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { MusicalNotes } from './MusicalNotes'
import { ArrowRight } from 'lucide-react'

/**
 * About Component
 * 
 * About section displaying:
 * - Personal introduction
 * - Profile emoji/avatar
 * - Resume download button
 */
export const About = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })

  // Handle resume PDF download
  const handleResumeDownload = () => {
    const link = document.createElement('a')
    link.href = '/Ricardo_Brutus_Resume_SWE_2025.pdf'
    link.download = 'Ricardo_Brutus_Resume_SWE_2025.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-alpine-deep/80 via-alpine-deep/60 to-alpine-deep/80 pointer-events-none" />
      <MusicalNotes />

      <div
        ref={ref}
        className={`
          relative z-10 w-full max-w-6xl mx-auto text-center transition-all duration-700 ease-out
          flex flex-col items-center justify-center
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="w-full max-w-4xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-alpine-white to-alpine-emerald bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-alpine-emerald/30 to-alpine-emerald/10 border-4 border-alpine-emerald/30 flex items-center justify-center backdrop-blur-sm">
              <span className="text-5xl md:text-6xl">👨🏾‍💻</span>
            </div>
          </div>

          <div className="space-y-6 text-alpine-white/90 text-lg md:text-xl leading-relaxed">
            <p>
              I'm a passionate Computer Science student at UMass Boston
              with a focus on software development, embedded systems, and cybersecurity.
              I love how software helps us connect with people.
              I love playing the piano and guitar in my free time with some games.
            </p>
          </div>
        </div>

        <button
          onClick={handleResumeDownload}
          className="cosmic-button w-fit flex items-center mx-auto gap-2"
        >
          Download Resume <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}
