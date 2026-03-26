import { useEffect } from 'react'

/**
 * useCursorGradient Hook
 * 
 * Updates CSS variables based on cursor position to create
 * a dynamic gradient background that follows the mouse.
 * Sets --cursor-x and --cursor-y CSS variables.
 */
export const useCursorGradient = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100

      document.documentElement.style.setProperty('--cursor-x', `${x}%`)
      document.documentElement.style.setProperty('--cursor-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
}
