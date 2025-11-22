import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-alpine-deep text-alpine-white">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg text-alpine-white/70 mb-6">The page you are looking for does not exist</p>
      <Link to="/" className="text-alpine-emerald hover:text-alpine-emerald/80 transition-colors">
        Go to home
      </Link>
    </div>
  )
}
