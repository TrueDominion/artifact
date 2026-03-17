/**
 * src/pages/TheDig.tsx
 * THE DIG — Arguments Uncovered.
 * 8-card grid with 4-step flip cards.
 * Sidebar: vertical stratum key with rotated labels running top to bottom.
 */

import SectionHeader from '@/components/ui/SectionHeader'
import ArtifactCard from '@/components/ui/ArtifactCard'
import argumentsData from '@/data/arguments.json'
import type { Argument } from '@/types'

const args = argumentsData as unknown as Argument[]

const strata = [
  { label: 'CLAIM',     number: '01' },
  { label: 'LOGIC',     number: '02' },
  { label: 'OBJECTION', number: '03' },
  { label: 'RESPONSE',  number: '04' },
]

export default function TheDig() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE DIG"
        subtitle="Arguments Uncovered."
        label="Section II"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="flex gap-8 lg:gap-12">

          {/* ── Stratum sidebar — desktop only ── */}
          <aside
            className="hidden lg:flex flex-col flex-shrink-0 w-10"
            aria-label="Argument layers"
          >
            <p
              className="label-museum text-graphite-border text-center mb-3"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.12em' }}
            >
              DEPTH
            </p>

            <div className="flex flex-col flex-1 border border-graphite-border overflow-hidden">
              {strata.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 ${
                    i < strata.length - 1 ? 'border-b border-graphite-border' : ''
                  }`}
                  style={{
                    backgroundColor:
                      i === 0 ? '#FFFFFF' :
                      i === 1 ? '#FAF8F5' :
                      i === 2 ? '#EFEDE9' :
                               '#E8E5E0',
                  }}
                >
                  <span
                    className="font-serif font-bold text-graphite-border select-none"
                    style={{ fontSize: '0.65rem' }}
                  >
                    {s.number}
                  </span>
                  <span
                    className="label-museum text-graphite-soft"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      letterSpacing: '0.1em',
                      fontSize: '0.55rem',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="label-museum text-graphite-border text-center mt-3"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.12em' }}
            >
              SURFACE
            </p>
          </aside>

          {/* ── Card grid ── */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-10">
              <hr className="flex-1 border-t border-graphite-border" />
              <p className="label-museum text-graphite-soft">CLICK ANY CARD TO EXCAVATE</p>
              <hr className="flex-1 border-t border-graphite-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {args.map((arg) => (
                <ArtifactCard key={arg.id} argument={arg} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
