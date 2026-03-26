import { useEffect, useRef } from 'react'

/**
 * useParallax Hook
 * 
 * Creates a parallax scrolling effect on an element.
 * Element moves at a different speed than the scroll for depth effect.
 * 
 * @param {number} speed - Parallax speed multiplier (0-1, lower = slower)
 * @returns {Object} - { ref: ref to attach to element }
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * speed
      element.style.transform = `translateY(${parallax}px)`
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [speed])

  return { ref }
}
