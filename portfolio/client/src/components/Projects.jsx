import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Code2 } from 'lucide-react'
import { MusicalNotes } from './MusicalNotes'

// Animation variants for Framer Motion
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Project data - add or modify projects here
const projects = [
  {
    id: 1,
    title: 'Long Distance Dating App',
    description:
      'iOS app for long-distance couples with shared calendars, reminders, and mood updates.',
    tags: ['Swift', 'SwiftUI', 'iOS', 'CoreData'],
    githubUrl: 'https://github.com/rickybr34/Luvly-Demo',
    category: 'mobile',
  },
  {
    id: 2,
    title: 'RSA Cryptosystem Library',
    description:
      'Modular RSA encryption/decryption library with key generation and command-line utilities.',
    tags: ['Python', 'Cryptography', 'Security'],
    githubUrl: 'https://github.com/rickybr34/Cryptosystem',
    category: 'security',
  },
  {
    id: 3,
    title: 'Markov Text Generator & Decoder',
    description:
      'Probabilistic text generator using k-gram statistics with error-handling for decoding noisy messages.',
    tags: ['Python', 'NLP', 'ML'],
    githubUrl: 'https://github.com/rickybr34/Text-Generator',
    category: 'web',
  },
]

// Available filter categories
const categories = ['all', 'embedded', 'web', 'mobile', 'security']

/**
 * Projects Component
 * 
 * Displays a grid of project cards with:
 * - Category filtering functionality
 * - Animated card hover effects
 * - GitHub links for each project
 */
export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter projects based on selected category
  const filteredProjects = projects.filter(
    (project) => activeFilter === 'all' || project.category === activeFilter
  )

  return (
    <motion.section
      id="projects"
      className="pt-36 pb-40 px-4 relative min-h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-alpine-deep/80 via-alpine-deep/60 to-alpine-deep/80 pointer-events-none" />
      <MusicalNotes />

      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center min-h-[calc(100vh-200px)] justify-between">
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          Featured{' '}
          <span className="bg-gradient-to-r from-alpine-white to-alpine-emerald bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center text-alpine-white/70 mb-12 max-w-2xl"
        >
          Recent work, and things I'm working on.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          role="group"
          aria-label="Filter projects"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                min-w-[100px] px-8 py-3 rounded-full text-base font-medium transition-all duration-300
                capitalize border-2 text-center
                ${
                  activeFilter === category
                    ? 'bg-alpine-emerald text-white border-alpine-emerald'
                    : 'bg-white/5 text-alpine-white/70 border-alpine-emerald/20 hover:bg-alpine-emerald/10 hover:text-alpine-emerald hover:border-alpine-emerald/40'
                }
              `}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {filteredProjects.length === 0 ? (
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center text-alpine-white/70"
          >
            No projects matched this filter just yet — check back soon!
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            key={activeFilter}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="backdrop-blur-md bg-white/5 border border-alpine-emerald/10 rounded-lg overflow-hidden shadow-xl shadow-black/50 p-6 flex flex-col"
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="h-48 w-full rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-alpine-emerald/20 to-alpine-emerald/5 flex items-center justify-center border border-alpine-emerald/20"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Code2 size={64} className="text-alpine-emerald/60" strokeWidth={1.5} />
                </motion.div>

                <div style={{ padding: '0 0.5rem' }} className="flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-alpine-white">
                    {project.title}
                  </h3>

                  <p className="text-alpine-white/70 text-xs mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="project-tech flex flex-wrap gap-3" style={{ marginBottom: 'calc(1.5rem + 0.5px)' }}>
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-alpine-emerald/10 text-alpine-emerald rounded-full px-4 py-1.5 text-sm font-semibold min-w-[80px] text-center inline-block"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3 mt-auto pt-4 pb-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4CAF50] hover:text-[#4CAF50] transition-colors duration-300"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github size={30} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center mt-auto pt-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/rickybr34"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
