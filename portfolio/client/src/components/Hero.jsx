import { useState } from 'react'
import { PhoneScene } from './PhoneScene'
import { PhoneSceneFallback } from './PhoneSceneFallback'

function greetingForHour(hour) {
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  if (hour < 24) return 'Good evening'
  return 'Burning the midnight oil?'
}

/**
 * Hero — 3D centerpiece on load (three floating phone slabs + a waveform
 * ring), flat headline and CTAs on top. Falls back to a CSS composition
 * when WebGL isn't available.
 */
export const Hero = () => {
  const [greeting] = useState(() => greetingForHour(new Date().getHours()))
  const [noGL, setNoGL] = useState(false)

  return (
    <section
      id="top"
      className="relative grid min-h-screen place-items-center overflow-hidden px-8 pb-20 pt-[120px]"
    >
      <PhoneScene onFallback={setNoGL} />
      {noGL && <PhoneSceneFallback />}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(11,45,31,0.45) 0%, rgba(10,10,10,0.86) 62%, #0a0a0a 100%)',
        }}
      />

      <div className="animate-rise-in relative z-[2] w-full max-w-[1040px] pointer-events-none text-center">
        <p className="font-mono mb-[26px] text-xs tracking-[0.24em] text-alpine-bright uppercase">
          {greeting}
        </p>
        <h1
          className="mb-[26px] font-bold leading-[0.96] tracking-[-0.035em]"
          style={{ fontSize: 'clamp(44px, 7.4vw, 104px)' }}
        >
          iOS engineer who
          <br />
          builds for people.
        </h1>
        <p
          className="mx-auto mb-[38px] max-w-[560px] leading-[1.55] text-alpine-white/66"
          style={{ fontSize: 'clamp(16px, 1.5vw, 20px)' }}
        >
          Swift and SwiftUI apps, shipped end to end. Computer Science at UMass
          Boston, May 2027. Piano and guitar when the code is done :).
        </p>
        <div className="flex flex-wrap justify-center gap-3.5 pointer-events-auto">
          <a href="#work" className="cosmic-button">
            See the work
          </a>
          <a
            href="/Ricardo_Brutus_Resume_2026.pdf"
            download="Ricardo_Brutus_Resume_2026.pdf"
            className="inline-flex items-center rounded-full border border-alpine-white/20 px-[26px] py-3.5 text-[15px] font-medium text-alpine-white/86 transition-colors duration-200 hover:border-alpine-bright hover:text-alpine-bright"
          >
            Download résumé
          </a>
        </div>
        <p className="font-mono mt-[34px] text-[11px] tracking-[0.14em] text-alpine-white/32">
          {noGL ? 'BOSTON, MA · OPEN TO iOS ROLES' : 'DRAG TO ROTATE'}
        </p>
      </div>
    </section>
  )
}
