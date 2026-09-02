# Spotify "last played" setup

The portfolio shows a hand-picked track by default. Once this function is deployed
with credentials, it upgrades itself to your real listening activity — currently
playing if there is one, otherwise your last played track. If anything fails
(expired token, rate limit, Spotify down), the page silently falls back to the
hand-picked track. Nothing breaks.

Files involved:

- `api/spotify-now-playing.js` — the serverless function (Vercel format)
- `portfolio/client/src/components/SpotifyNowPlaying.jsx` — fetches `/api/spotify-now-playing` on load, then once a minute

## 1. Create a Spotify app

1. Go to <https://developer.spotify.com/dashboard> and click **Create app**.
2. Name it anything ("Portfolio now playing").
3. Set **Redirect URI** to `http://127.0.0.1:8888/callback` and save.
4. Copy the **Client ID** and **Client Secret**.

## 2. Get a refresh token (one time)

Paste this in a browser, with your client ID filled in:

```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
```

Approve it. The browser lands on a dead `127.0.0.1` page — that's fine. Copy the
`code=...` value out of the address bar, then run this in a terminal:

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "YOUR_CLIENT_ID:YOUR_CLIENT_SECRET" \
  -d "grant_type=authorization_code" \
  -d "code=THE_CODE_FROM_THE_URL" \
  -d "redirect_uri=http://127.0.0.1:8888/callback"
```

The response contains `refresh_token`. That token does not expire — keep it secret,
never put it in front-end code.

## 3. Add the environment variables

In Vercel → your project → **Settings → Environment Variables**, add:

| Name | Value |
| --- | --- |
| `SPOTIFY_CLIENT_ID` | from the dashboard |
| `SPOTIFY_CLIENT_SECRET` | from the dashboard |
| `SPOTIFY_REFRESH_TOKEN` | from step 2 |

Redeploy. Visit `https://your-domain/api/spotify-now-playing` — you should see JSON
with your track, or a `204` if Spotify has nothing recent.

## Changing the hand-picked track

No backend needed. Edit `FALLBACK_TRACK_URL` in
`portfolio/client/src/components/SpotifyNowPlaying.jsx` to any Spotify track
link. That's the fallback, and also what shows before the function responds.

## Known limit

The Spotify embed's audio is cross-origin, so nothing on the page can analyze it —
the 3D waveform in the hero animates on its own rather than reacting to the track.
No browser permits otherwise.
