const STATS = [
  { label: 'FOCUS', value: 'iOS · Swift · SwiftUI' },
  { label: 'ALSO FLUENT', value: 'Python · JavaScript · React · Flask · AWS' },
  { label: 'GRADUATING', value: 'May 2027, UMass Boston' },
  { label: 'BASED', value: 'Boston, MA' },
]

export const StatsStrip = () => (
  <section className="border-y border-alpine-emerald/16 bg-alpine-dark/14">
    <div className="mx-auto grid max-w-[1040px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[26px] px-8 py-[30px]">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <p className="font-mono mb-2 text-[10px] tracking-[0.2em] text-alpine-white/40">
            {stat.label}
          </p>
          <p className="text-[15px] text-alpine-white/90">{stat.value}</p>
        </div>
      ))}
    </div>
  </section>
)
