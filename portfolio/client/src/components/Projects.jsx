import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const projects = [
  {
    title: 'Luvly',
    kind: 'iOS',
    status: 'Demo available',
    description:
      "A relationship app built around real-time partner notifications: interactive quiz games (Never Have I Ever, This or That, Who's More Likely To), daily questions, and an anniversary countdown. MVVM with Combine and ObservableObject, topic-based quizzes with smart filtering and progress tracking, multi-step onboarding, and secure 6-digit partner pairing.",
    tags: ['Swift', 'SwiftUI', 'Combine', 'MVVM'],
    githubUrl: 'https://github.com/rickybr34/Luvly-Demo',
  },
  {
    title: 'MunchMatch',
    kind: 'iOS',
    status: 'TestFlight → App Store',
    description:
      'Groups create a shared room, set food preferences, and swipe on nearby restaurants pulled from the Google Places API. Firebase Realtime Database keeps every member in sync live, with Firebase Auth and push notifications. Currently heading to TestFlight with crash reporting and analytics in place ahead of App Store submission.',
    tags: ['Swift', 'SwiftUI', 'Firebase', 'Google Places API'],
    githubUrl: 'https://github.com/rickybr34/MunchMatch-showcase',
  },
  {
    title: 'Portfolio Website',
    kind: 'WEB',
    status: 'Live on Vercel',
    description:
      'A responsive portfolio in React 19 and Vite, animated with Framer Motion and routed client-side with React Router. Deployed on Vercel with GitHub-integrated CI/CD, plus a backend contact form with email handling.',
    tags: ['React 19', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Vercel'],
    githubUrl: 'https://github.com/rickybr34/websiteportfolio',
  },
]

export const Projects = () => (
  <section id="work" className="mx-auto max-w-[1040px] px-8 pb-10 pt-[110px]">
    <motion.p
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="font-mono mb-[18px] text-[11px] tracking-[0.22em] text-alpine-bright"
    >
      01 — SELECTED WORK
    </motion.p>
    <motion.h2
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="mb-[60px] max-w-[640px] font-bold tracking-[-0.03em]"
      style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}
    >
      Three projects, taken all the way to shipped.
    </motion.h2>

    <motion.div
      className="flex flex-col gap-[22px]"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {projects.map((project) => (
        <motion.article
          key={project.title}
          variants={fadeInUp}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
          className="rounded-[14px] border border-alpine-emerald/20 p-[34px] transition-colors duration-250 hover:border-alpine-bright/50"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))' }}
        >
          <div className="mb-5 flex flex-wrap items-baseline gap-3.5">
            <h3 className="text-[27px] font-bold tracking-[-0.02em]">{project.title}</h3>
            <span className="font-mono rounded-full border border-alpine-bright/30 px-2.5 py-1 text-[10px] tracking-[0.16em] text-alpine-bright">
              {project.kind}
            </span>
            <span className="text-[13px] text-alpine-white/42">{project.status}</span>
          </div>
          <p className="mb-5 max-w-[760px] text-base leading-[1.62] text-alpine-white/72">
            {project.description}
          </p>
          <div className="mb-5 flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono rounded-full bg-alpine-emerald/14 px-3 py-1.5 text-[11px] text-alpine-bright"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-[0.1em] text-alpine-bright hover:text-alpine-white"
          >
            VIEW ON GITHUB →
          </a>
        </motion.article>
      ))}
    </motion.div>

    <div className="mt-[34px]">
      <a
        href="https://github.com/rickybr34"
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs tracking-[0.12em] text-alpine-white/55 hover:text-alpine-bright"
      >
        ALL REPOSITORIES →
      </a>
    </div>
  </section>
)
