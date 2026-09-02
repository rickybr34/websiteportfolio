import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { StatsStrip } from '../components/StatsStrip'
import { Projects } from '../components/Projects'
import { About } from '../components/About'
import { Contact } from '../components/Contact'

/**
 * Home Page — hero (3D centerpiece + résumé/contact CTAs), a stats strip,
 * selected work, about (with the live/hand-picked Spotify card), and contact.
 */
export const Home = () => (
  <div className="min-h-screen bg-alpine-deep text-alpine-white">
    <Navbar />
    <Hero />
    <StatsStrip />
    <Projects />
    <About />
    <Contact />
  </div>
)
