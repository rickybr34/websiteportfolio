import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { MusicalNotes } from './MusicalNotes'

/**
 * Contact Component
 * 
 * Contact form section with:
 * - Name, email, and message input fields
 * - Form submission handling with EmailJS
 * - Social media links (Email, LinkedIn, GitHub)
 */
export const Contact = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Get EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        const missing = []
        if (!serviceId) missing.push('VITE_EMAILJS_SERVICE_ID')
        if (!templateId) missing.push('VITE_EMAILJS_TEMPLATE_ID')
        if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY')
        throw new Error(`EmailJS configuration is missing: ${missing.join(', ')}. Please check your .env file in portfolio/client/.env`)
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'rickybr34@gmail.com', // Your email address
        },
        publicKey
      )

      setSubmitStatus({
        type: 'success',
        message: "Message sent! Thank you for your message. I'll get back to you soon."
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      let errorMessage = 'Failed to send message. Please try again or contact me directly at rickybr34@gmail.com'
      
      // Provide more specific error messages
      if (error.message?.includes('configuration is missing')) {
        errorMessage = error.message
      } else if (error.text) {
        errorMessage = `EmailJS error: ${error.text}`
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setIsSubmitting(false)
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' })
      }, 5000)
    }
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

          {submitStatus.message && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
                submitStatus.type === 'success'
                  ? 'bg-alpine-emerald/20 text-alpine-emerald border border-alpine-emerald/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

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
