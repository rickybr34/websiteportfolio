import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { MusicalNotes } from './MusicalNotes'

const involvementData = [
  {
    role: 'Member & Peer Tutor',
    organization: 'Computer Science Club — UMass Boston',
    start: '2024',
    end: 'Present',
    location: 'Boston, MA',
    highlights: [
      'Tutored fellow CS students in core topics including data structures, algorithms, and systems programming.',
      'Participated in coding workshops and Leetcode-focused interview prep sessions, sharpening problem-solving skills in algorithms and time complexity.',
      'Attended regular club meetings and collaborative coding events to stay engaged with the broader CS community on campus.',
    ],
    skills: ['Algorithms', 'Data Structures', 'Systems Programming', 'Peer Tutoring'],
  },
]

/**
 * Involvement section — campus activities and community roles (matches resume).
 */
export const Involvement = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section
      id="involvement"
      className="pt-36 pb-40 px-4 relative min-h-screen flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-alpine-deep/80 via-alpine-deep/60 to-alpine-deep/80 pointer-events-none" />
      <MusicalNotes />

      <div
        ref={ref}
        className={`
          container mx-auto max-w-5xl relative z-10 w-full
          transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-alpine-white to-alpine-emerald bg-clip-text text-transparent">
              Involvement
            </span>
          </h2>
        </div>

        <div className="grid gap-4 w-full">
          {involvementData.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border-2 border-alpine-emerald/20 rounded-lg shadow-xl shadow-black/50 transition-all duration-300 cursor-pointer group hover:border-alpine-emerald/40 w-full"
              style={{ padding: '1.5rem 2.5rem' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-nowrap justify-between gap-8 items-start mb-6 w-full">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xl text-alpine-white mb-3">
                    {item.role}
                  </div>
                  <div className="text-alpine-white/80 text-base leading-relaxed">
                    {item.organization}
                  </div>
                </div>
                <div className="text-alpine-white/70 text-sm text-right leading-relaxed flex-shrink-0 ml-8">
                  {item.start} – {item.end}
                  <br />
                  {item.location}
                </div>
              </div>

              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${hoveredIndex === index ? 'max-h-[500px] opacity-100 mt-10' : 'max-h-0 opacity-0'}
                `}
              >
                <ul
                  className="mb-10 text-alpine-white/70 leading-relaxed space-y-4"
                  style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}
                >
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-alpine-emerald/10 text-alpine-emerald rounded-full px-6 py-3 text-sm font-semibold min-w-[100px] text-center inline-block"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
