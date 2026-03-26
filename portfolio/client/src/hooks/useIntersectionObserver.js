import { useEffect, useRef, useState } from 'react'

/**
 * useIntersectionObserver Hook
 * 
 * Custom hook that detects when an element enters the viewport.
 * Uses Intersection Observer API for efficient scroll-based animations.
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around root element
 * @returns {Object} - { ref: ref to attach to element, isVisible: boolean }
 */
export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [options.threshold, options.rootMargin])

  return { ref, isVisible }
}
