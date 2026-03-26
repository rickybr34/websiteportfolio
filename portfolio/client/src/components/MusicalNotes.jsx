import { useEffect, useState, useRef } from 'react'

/**
 * MusicalNotes Component
 * 
 * Creates floating animated symbols (musical notes and code symbols) that:
 * - Float continuously across the screen
 * - Deflect/bounce away from the cursor when it gets close
 * - Wrap around screen edges for continuous animation
 */
export const MusicalNotes = () => {
  const [notes, setNotes] = useState([])
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const animationFrameRef = useRef(null)
  const mousePosRef = useRef({ x: -1000, y: -1000 })
  const notesStateRef = useRef([])

  // Initialize symbols and generate them periodically
  useEffect(() => {
    const noteSymbols = ['♪', '♫', '♬', '♩', '♭', '♯']
    const codeSymbols = ['{', '}', '<', '>', '/', '=', '(', ')', '[', ']', ';', '&', '|', '*', '#', '=>', '//', '{}', '()']
    const allSymbols = [...noteSymbols, ...codeSymbols]
    
    // Generate random symbols with random positions and velocities
    const generateNotes = () => {
      const newNotes = Array.from({ length: 15 }, (_, i) => {
        const symbol = allSymbols[Math.floor(Math.random() * allSymbols.length)]
        const isCodeSymbol = codeSymbols.includes(symbol)
        return {
          id: i,
          symbol: symbol,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + Math.random() * 200,
          size: isCodeSymbol ? 1.5 + Math.random() * 0.8 : 1.2 + Math.random() * 0.8,
          isCode: isCodeSymbol,
          velocityX: (Math.random() - 0.5) * 0.5,
          velocityY: -0.5 - Math.random() * 0.5,
        }
      })
      setNotes(newNotes)
      notesStateRef.current = newNotes
    }

    generateNotes()
    // Regenerate symbols every 20 seconds
    const interval = setInterval(generateNotes, 20000)
    
    return () => {
      clearInterval(interval)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Track mouse position for cursor deflection
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Main animation loop,updates symbol positions and handles cursor deflection
  useEffect(() => {
    if (notes.length === 0) return

    const animate = () => {
      setNotes(prevNotes => {
        if (prevNotes.length === 0) return prevNotes
        
        const currentMouse = mousePosRef.current
        const updatedNotes = prevNotes.map(note => {
          // Update position based on velocity
          let newX = note.x + note.velocityX
          let newY = note.y + note.velocityY
          let newVelocityX = note.velocityX
          let newVelocityY = note.velocityY
          
          // Calculate distance from cursor
          const dx = currentMouse.x - note.x
          const dy = currentMouse.y - note.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          const deflectionRadius = 120
          
          // Apply deflection force when cursor is near
          if (distance < deflectionRadius && distance > 0 && currentMouse.x > 0) {
            const force = (1 - distance / deflectionRadius) * 0.15
            const angle = Math.atan2(dy, dx)
            
            // Push symbol away from cursor
            const pushX = -Math.cos(angle) * force
            const pushY = -Math.sin(angle) * force
            
            newVelocityX += pushX
            newVelocityY += pushY
            
            newX = note.x + newVelocityX
            newY = note.y + newVelocityY
          }
          
          // Smooth horizontal wrapping, symbols wrap from one side to the other
          if (newX < -100) {
            newX = window.innerWidth + 100
          } else if (newX > window.innerWidth + 100) {
            newX = -100
          }
          
          // Smooth vertical wrapping, symbols wrap from top to bottom and vice versa
          if (newY < -150) {
            newY = window.innerHeight + 150
            newX = Math.random() * window.innerWidth
            newVelocityY = -0.5 - Math.random() * 0.5
            newVelocityX = (Math.random() - 0.5) * 0.5
          } else if (newY > window.innerHeight + 150) {
            newY = -150
            newX = Math.random() * window.innerWidth
            newVelocityY = -0.5 - Math.random() * 0.5
            newVelocityX = (Math.random() - 0.5) * 0.5
          }
          
          // Limit velocity to prevent symbols from moving too fast
          const maxVelocity = 2
          newVelocityX = Math.max(-maxVelocity, Math.min(maxVelocity, newVelocityX))
          newVelocityY = Math.max(-maxVelocity, Math.min(maxVelocity, newVelocityY))
          
          return {
            ...note,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
          }
        })
        
        notesStateRef.current = updatedNotes
        return updatedNotes
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [notes.length])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute ${note.isCode ? 'text-alpine-emerald/40 font-mono font-bold' : 'text-alpine-emerald/30'}`}
          style={{
            left: `${note.x}px`,
            top: `${note.y}px`,
            fontSize: `${note.size}rem`,
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        >
          {note.symbol}
        </div>
      ))}
    </div>
  )
}
