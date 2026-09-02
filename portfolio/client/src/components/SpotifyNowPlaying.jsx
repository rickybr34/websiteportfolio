import { useEffect, useState } from 'react'

const API_PATH = '/api/spotify-now-playing'
const FALLBACK_TRACK_URL = 'https://open.spotify.com/track/2EPxhPbZczxce6wHbuOlQ6'
const FALLBACK_TRACK_ID = FALLBACK_TRACK_URL.match(/track\/([A-Za-z0-9]+)/)[1]

/**
 * "What I'm listening to" card — polls the Spotify serverless function for
 * the currently-playing (or last played) track. Falls back to a hand-picked
 * track whenever the function isn't deployed, rate-limited, or offline.
 */
export const SpotifyNowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(API_PATH, { headers: { accept: 'application/json' } })
        if (!res.ok) throw new Error(`status ${res.status}`)
        const data = await res.json()
        if (cancelled || !data || !data.trackId) return
        setNowPlaying(data)
      } catch {
        // No backend deployed yet (or offline) — the hand-picked track stays.
      }
    }

    fetchNowPlaying()
    const timer = setInterval(fetchNowPlaying, 60000)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  const label = nowPlaying
    ? nowPlaying.isPlaying
      ? 'PLAYING RIGHT NOW'
      : 'LAST PLAYED ON SPOTIFY'
    : 'My favorite song at the moment'
  const trackId = nowPlaying ? nowPlaying.trackId : FALLBACK_TRACK_ID
  const embedSrc = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`

  return (
    <div className="flex flex-col gap-4 border-t border-alpine-emerald/20 bg-alpine-emerald/8 p-6">
      <div className="flex items-center gap-2.5">
        <span className="animate-screen-glow h-[7px] w-[7px] rounded-full bg-alpine-bright shadow-[0_0_10px_#3ec98c]" />
        <p className="font-mono text-[10px] tracking-[0.16em] text-alpine-bright">{label}</p>
      </div>
      <iframe
        src={embedSrc}
        width="100%"
        height="152"
        frameBorder="0"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        title="Spotify track"
        className="block rounded-[10px] border-0"
      />
    </div>
  )
}
