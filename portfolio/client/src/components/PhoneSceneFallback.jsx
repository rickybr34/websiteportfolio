const FALLBACK_BARS = Array.from({ length: 40 }, (_, i) => ({
  key: i,
  delay: `${(i * 0.09).toFixed(2)}s`,
  height: `${(16 + Math.abs(Math.sin(i * 0.55)) * 74).toFixed(0)}px`,
}))

const SLABS = [
  { size: 122, height: 248, radius: 20, border: 'rgba(62,201,140,0.45)', bg: 'linear-gradient(160deg, #101a16, #0b0f0d)', shadow: '0 30px 70px rgba(0,0,0,0.6)', pad: 9, screenRadius: 13, screenBg: 'linear-gradient(180deg, rgba(22,122,80,0.85), rgba(22,122,80,0.28))', floatDelay: '0s', glowDuration: '4.4s', glowDelay: '0s' },
  { size: 152, height: 306, radius: 24, border: 'rgba(62,201,140,0.6)', bg: 'linear-gradient(160deg, #131f1a, #0b0f0d)', shadow: '0 40px 90px rgba(0,0,0,0.7)', pad: 10, screenRadius: 16, screenBg: 'linear-gradient(180deg, rgba(62,201,140,0.9), rgba(22,122,80,0.3))', floatDelay: '0.6s', glowDuration: '3.6s', glowDelay: '0.4s' },
  { size: 122, height: 248, radius: 20, border: 'rgba(62,201,140,0.45)', bg: 'linear-gradient(160deg, #101a16, #0b0f0d)', shadow: '0 30px 70px rgba(0,0,0,0.6)', pad: 9, screenRadius: 13, screenBg: 'linear-gradient(180deg, rgba(22,122,80,0.85), rgba(22,122,80,0.28))', floatDelay: '1.2s', glowDuration: '5s', glowDelay: '0.9s' },
]

/**
 * Flat CSS composition shown when WebGL isn't available — the same
 * three-phones-over-a-waveform silhouette as the interactive scene.
 */
export const PhoneSceneFallback = () => (
  <div className="absolute inset-0 z-0 grid place-items-center overflow-hidden">
    <div
      className="absolute left-1/2 flex items-center justify-center gap-[46px] opacity-55"
      style={{ top: '8%', transform: 'perspective(1200px) translateX(-50%) rotateX(8deg) rotateY(-14deg)' }}
    >
      {SLABS.map((slab, i) => (
        <div
          key={i}
          className="animate-slab-float"
          style={{
            width: slab.size,
            height: slab.height,
            borderRadius: slab.radius,
            border: `1px solid ${slab.border}`,
            background: slab.bg,
            boxShadow: slab.shadow,
            padding: slab.pad,
            animationDelay: slab.floatDelay,
          }}
        >
          <div
            className="animate-screen-glow h-full w-full"
            style={{
              borderRadius: slab.screenRadius,
              background: slab.screenBg,
              animationDuration: slab.glowDuration,
              animationDelay: slab.glowDelay,
            }}
          />
        </div>
      ))}
    </div>
    <div className="absolute inset-x-0 bottom-0 flex h-[58px] items-end justify-center gap-[7px] opacity-75">
      {FALLBACK_BARS.map((bar) => (
        <span
          key={bar.key}
          className="animate-bar-pulse w-[3px] origin-bottom rounded-sm bg-alpine-bright"
          style={{ height: bar.height, animationDelay: bar.delay }}
        />
      ))}
    </div>
  </div>
)
