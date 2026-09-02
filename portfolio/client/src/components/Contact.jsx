import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export const Contact = () => (
  <section id="contact" className="border-t border-alpine-emerald/16 bg-alpine-dark/16">
    <div className="mx-auto max-w-[1040px] px-8 pb-[90px] pt-[110px]">
      <motion.p
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="font-mono mb-[18px] text-[11px] tracking-[0.22em] text-alpine-bright"
      >
        03 — CONTACT
      </motion.p>
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mb-[34px] font-bold tracking-[-0.035em]"
        style={{ fontSize: 'clamp(30px, 4.6vw, 56px)' }}
      >
        Open to iOS roles and internships.
      </motion.h2>
      <motion.a
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        href="mailto:ricardobrutus.rb@gmail.com"
        className="inline-block border-b border-alpine-bright/40 pb-1.5 font-medium tracking-[-0.02em] hover:border-alpine-white"
        style={{ fontSize: 'clamp(18px, 2.6vw, 32px)' }}
      >
        ricardobrutus.rb@gmail.com
      </motion.a>
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-12 flex flex-wrap gap-6.5"
      >
        <a
          href="https://www.linkedin.com/in/ricardobrutus/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-[0.12em] text-alpine-white/60 hover:text-alpine-bright"
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/rickybr34"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs tracking-[0.12em] text-alpine-white/60 hover:text-alpine-bright"
        >
          GITHUB
        </a>
        <a
          href="/Ricardo_Brutus_Resume_2026.pdf"
          download="Ricardo_Brutus_Resume_2026.pdf"
          className="font-mono text-xs tracking-[0.12em] text-alpine-white/60 hover:text-alpine-bright"
        >
          RÉSUMÉ (PDF)
        </a>
      </motion.div>
      <p className="font-mono mt-[70px] text-[11px] tracking-[0.1em] text-alpine-white/26">
        © 2026 Ricardo Brutus · Boston, MA
      </p>
    </div>
  </section>
)
