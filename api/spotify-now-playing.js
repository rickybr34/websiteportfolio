// Vercel serverless function — GET /api/spotify-now-playing
//
// Returns the track you're playing right now, or the last one you played:
//   { trackId, title, artist, isPlaying, url, playedAt }
// Returns 204 (no body) when Spotify has nothing to report, so the front end
// quietly keeps showing the hand-picked track.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   SPOTIFY_CLIENT_ID
//   SPOTIFY_CLIENT_SECRET
//   SPOTIFY_REFRESH_TOKEN
// See SPOTIFY_SETUP.md for how to get the refresh token.

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) throw new Error(`token refresh failed: ${res.status}`);
  const json = await res.json();
  return json.access_token;
}

function shape(track, isPlaying, playedAt) {
  if (!track || !track.id) return null;
  return {
    trackId: track.id,
    title: track.name,
    artist: (track.artists || []).map((a) => a.name).join(', '),
    album: track.album && track.album.name,
    albumArt: track.album && track.album.images && track.album.images[0] && track.album.images[0].url,
    url: track.external_urls && track.external_urls.spotify,
    isPlaying: !!isPlaying,
    playedAt: playedAt || null,
  };
}

export default async function handler(req, res) {
  // Cached at the edge for a minute — Spotify rate-limits, and a portfolio
  // does not need second-by-second accuracy.
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');

  try {
    if (
      !process.env.SPOTIFY_CLIENT_ID ||
      !process.env.SPOTIFY_CLIENT_SECRET ||
      !process.env.SPOTIFY_REFRESH_TOKEN
    ) {
      return res.status(204).end();
    }

    const token = await getAccessToken();
    const auth = { Authorization: `Bearer ${token}` };

    const live = await fetch(NOW_PLAYING_URL, { headers: auth });
    if (live.status === 200) {
      const data = await live.json();
      const out = shape(data.item, data.is_playing);
      if (out) return res.status(200).json(out);
    }

    const recent = await fetch(RECENT_URL, { headers: auth });
    if (recent.status === 200) {
      const data = await recent.json();
      const item = data.items && data.items[0];
      if (item) {
        const out = shape(item.track, false, item.played_at);
        if (out) return res.status(200).json(out);
      }
    }

    return res.status(204).end();
  } catch (err) {
    console.error('spotify-now-playing:', err.message);
    return res.status(204).end();
  }
}
