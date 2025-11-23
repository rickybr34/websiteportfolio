import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { MusicalNotes } from './MusicalNotes'

/**
 * Contact Component
 * 
 * Contact form section with:
 * - Name, email, and message input fields
 * - Form submission handling
 * - Social media links (Email, LinkedIn, GitHub)
 */
export const Contact = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      alert("Message sent! Thank you for your message. I'll get back to you soon.")
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section
      id="contact"
      className="relative py-32 px-4 min-h-screen flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-alpine-deep/80 via-alpine-deep/60 to-alpine-deep/80 pointer-events-none" />
      <MusicalNotes />

      <div
        ref={ref}
        className={`
          relative z-10 w-full max-w-2xl mx-auto flex flex-col min-h-[calc(100vh-200px)]
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-alpine-white to-alpine-emerald bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <p className="text-lg text-alpine-white/60">Let's work together</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full px-0 py-4 bg-transparent text-alpine-white placeholder-alpine-white/40 border-b border-alpine-white/20 focus:outline-none focus:border-alpine-emerald transition-colors duration-300 text-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full px-0 py-4 bg-transparent text-alpine-white placeholder-alpine-white/40 border-b border-alpine-white/20 focus:outline-none focus:border-alpine-emerald transition-colors duration-300 text-lg"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Message"
              className="w-full px-0 py-4 bg-transparent text-alpine-white placeholder-alpine-white/40 border-b border-alpine-white/20 focus:outline-none focus:border-alpine-emerald resize-none transition-colors duration-300 text-lg"
            />
          </div>

          <div className="flex justify-center mt-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cosmic-button w-fit flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send size={16} />}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-6 mt-auto pt-8">
          <a
            href="mailto:rickybr34@gmail.com"
            className="text-alpine-white/60 hover:text-alpine-emerald transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/ricardo-brutus-33b296258/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-alpine-white/60 hover:text-alpine-emerald transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/rickybr34"
            target="_blank"
            rel="noopener noreferrer"
            className="text-alpine-white/60 hover:text-alpine-emerald transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </section>
  )
}
