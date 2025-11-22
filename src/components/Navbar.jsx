import { useState } from 'react'

/**
 * Navbar Component
 * 
 * Navigation bar with:
 * - Smooth scroll to sections
 * - Responsive mobile menu
 * - Hover effects on navigation links
 */
export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Smooth scroll to section by ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ]

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full bg-transparent">
      <div className="w-full pl-4 md:pl-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => scrollToSection('home')}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-alpine-white to-alpine-emerald bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
            style={{ paddingLeft: '3rem' }}
          >
            Ricardo Brutus
          </button>

          <div className="hidden md:flex items-center gap-8" style={{ paddingRight: '3rem' }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-alpine-white/80 hover:text-alpine-white font-medium transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-alpine-emerald group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-alpine-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <span
                className={`block h-0.5 w-full bg-alpine-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-alpine-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-alpine-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
            ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-alpine-white/80 hover:text-alpine-white font-medium transition-colors duration-300 py-2"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
