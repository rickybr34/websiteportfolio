import { useState } from 'react'

const NAV_LINKS = [
  { name: 'Work', id: 'work' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
]

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-6 border-b border-alpine-emerald/18 px-8 py-[18px] backdrop-blur-[14px]"
      style={{ background: 'rgba(10,10,10,0.62)' }}
    >
      <button
        onClick={() => scrollToSection('top')}
        className="text-base font-bold tracking-[-0.01em] text-alpine-white"
      >
        Ricardo Brutus
      </button>

      <div className="hidden items-center gap-6.5 md:flex">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="text-sm text-alpine-white/62 transition-colors duration-200 hover:text-alpine-white"
          >
            {link.name}
          </button>
        ))}
        <a
          href="/Ricardo_Brutus_Resume_2026.pdf"
          download="Ricardo_Brutus_Resume_2026.pdf"
          className="font-mono inline-flex items-center rounded-full border border-alpine-bright/30 bg-alpine-emerald/12 px-[15px] py-[7px] text-[11px] tracking-[0.08em] text-alpine-bright transition-colors duration-200 hover:bg-alpine-emerald/24"
        >
          RÉSUMÉ
        </a>
      </div>

      <button
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        className="p-2 text-alpine-white md:hidden"
        aria-label="Toggle menu"
      >
        <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
          <span
            className={`block h-0.5 w-full bg-alpine-white transition-all duration-300 ${
              isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-alpine-white transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-alpine-white transition-all duration-300 ${
              isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </div>
      </button>

      <div
        className={`absolute inset-x-0 top-full overflow-hidden border-b border-alpine-emerald/18 backdrop-blur-[14px] transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(10,10,10,0.86)' }}
      >
        <div className="flex flex-col gap-1 px-8 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="py-2 text-left text-sm text-alpine-white/70 transition-colors duration-200 hover:text-alpine-white"
            >
              {link.name}
            </button>
          ))}
          <a
            href="/Ricardo_Brutus_Resume_2026.pdf"
            download="Ricardo_Brutus_Resume_2026.pdf"
            className="font-mono py-2 text-[11px] tracking-[0.08em] text-alpine-bright"
          >
            RÉSUMÉ
          </a>
        </div>
      </div>
    </nav>
  )
}
