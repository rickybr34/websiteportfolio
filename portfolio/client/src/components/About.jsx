import { motion } from 'framer-motion'
import { SpotifyNowPlaying } from './SpotifyNowPlaying'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const facts = [
  { label: 'EDUCATION', value: 'BS Computer Science, UMass Boston — May 2027' },
  { label: 'MOBILE', value: 'Swift, SwiftUI, Combine, MVVM, Firebase, push notifications' },
  { label: 'WEB & CLOUD', value: 'Python, JavaScript, React, Flask, AWS' },
  { label: 'MUSIC', value: 'Piano and guitar' },
]

export const About = () => (
  <section id="about" className="mx-auto max-w-[1040px] px-8 py-[110px]">
    <motion.p
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="font-mono mb-[18px] text-[11px] tracking-[0.22em] text-alpine-bright"
    >
      02 — ABOUT
    </motion.p>

    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-14">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h2
          className="mb-7 font-bold leading-[1.1] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(28px, 3.4vw, 42px)' }}
        >
          Software is how people reach each other.
        </h2>
        <div className="flex flex-col gap-5 text-[17px] leading-[1.66] text-alpine-white/72">
          <p>
            I'm a Computer Science student at UMass Boston, graduating May
            2027, with a foundation in full-stack web and iOS development. I
            work in Python, JavaScript, Swift, React, Flask, and AWS.
          </p>
          <p>
            Outside of code I play piano and guitar, and I game casually.
            Music really drives me and shows up a lot in my work.
          </p>
        </div>
        <a
          href="/Ricardo_Brutus_Resume_2026.pdf"
          download="Ricardo_Brutus_Resume_2026.pdf"
          className="cosmic-button mt-[34px] inline-block"
        >
          Download résumé
        </a>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col gap-px overflow-hidden rounded-[14px] border border-alpine-emerald/20"
      >
        {facts.map((fact) => (
          <div key={fact.label} className="grid grid-cols-[108px_minmax(0,1fr)] gap-4.5 bg-white/[0.022] px-6 py-5">
            <p className="font-mono pt-1 text-[10px] tracking-[0.16em] text-alpine-white/40">
              {fact.label}
            </p>
            <p className="text-[15px] leading-normal text-alpine-white/88">{fact.value}</p>
          </div>
        ))}
        <SpotifyNowPlaying />
      </motion.div>
    </div>
  </section>
)
