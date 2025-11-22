import { useState, useEffect } from 'react'

/**
 * Greeting Component
 * 
 * Displays a time-based greeting message:
 * - Changes based on time of day (morning, afternoon, evening, night)
 * - Fades in on component mount
 */
export const Greeting = () => {
  const [greeting, setGreeting] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  // Set greeting based on current time of day
  useEffect(() => {
    const hour = new Date().getHours()
    let message = ''

    if (hour >= 5 && hour < 12) {
      message = 'Good Morning'
    } else if (hour >= 12 && hour < 18) {
      message = 'Good Afternoon'
    } else if (hour >= 18 && hour < 24) {
      message = 'Good Evening'
    } else {
      message = 'Burning the midnight oil?'
    }

    setGreeting(message)
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-alpine-white to-alpine-emerald bg-clip-text text-transparent">
        {greeting}
      </h1>
      <p className="text-lg md:text-xl text-alpine-white/80 mt-4">
        I'm Ricardo Brutus, welcome to my interactive portfolio.
      </p>
    </div>
  )
}
