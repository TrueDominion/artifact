/**
 * src/pages/TheDig.tsx
 * THE DIG — Arguments Uncovered.
 */

import { useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'
import ArtifactCard from '@/components/ui/ArtifactCard'
import argumentsData from '@/data/arguments.json'
import type { Argument } from '@/types'

const args = argumentsData as unknown as Argument[]

const FILTERS = [
  { key: 'all',           label: 'ALL ARGUMENTS' },
  { key: 'islam',         label: 'MOST RELEVANT FOR ISLAM' },
  { key: 'historical',    label: 'HISTORICAL' },
  { key: 'philosophical', label: 'PHILOSOPHICAL' },
]

const ISLAM_RELEVANT     = ['kalam', 'resurrection', 'moral', 'prophecy']
const HISTORICAL_IDS     = ['resurrection', 'prophecy']
const PHILOSOPHICAL_IDS  = ['kalam', 'teleological', 'moral', 'reason', 'ontological', 'consciousness']

const strata = [
  { label: 'CLAIM',     number: '01' },
  { label: 'LOGIC',     number: '02' },
  { label: 'OBJECTION', number: '03' },
  { label: 'RESPONSE',  number: '04' },
]

export default function TheDig() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = args.filter(arg => {
    if (activeFilter === 'all')           return true
    if (activeFilter === 'islam')         return ISLAM_RELEVANT.includes(arg.id)
    if (activeFilter === 'historical')    return HISTORICAL_IDS.includes(arg.id)
    if (activeFilter === 'philosophical') return PHILOSOPHICAL_IDS.includes(arg.id)
    return true
  })

  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE DIG"
        subtitle="The case for Christianity, layer by layer."
        label="Section II"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="flex gap-8 lg:gap-12">

          {/* Stratum sidebar — desktop only */}
          <aside className="hidden lg:flex flex-col flex-shrink-0 w-10" aria-label="Argument layers">
            <p
              className="label-museum text-graphite-border text-center mb-3"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.12em' }}
            >
              SURFACE
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
                      i === 2 ? '#EFEDE9' : '#E8E5E0',
                  }}
                >
                  <span className="font-serif font-bold text-graphite-border select-none" style={{ fontSize: '0.65rem' }}>
                    {s.number}
                  </span>
                  <span
                    className="label-museum text-graphite-soft"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em', fontSize: '0.55rem' }}
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
              DEPTH
            </p>
          </aside>

          {/* Card grid */}
          <div className="flex-1">

            {/* Intro paragraph — now Playfair italic to match the editorial tier */}
            <p className="font-serif italic text-base text-graphite-light leading-relaxed mb-8 max-w-lg">
              Eight arguments for God's existence and the truth of Christianity — each examined
              through four layers: claim, reasoning, strongest objection, and response. Open any
              card to work through the full argument. Filter by type or by what is most relevant
              to conversations with Muslims.
            </p>

            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 mb-8">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`px-3 py-1.5 border font-sans text-[0.6rem] tracking-widest uppercase transition-colors duration-200 ${
                    activeFilter === f.key
                      ? 'bg-ink text-white border-ink'
                      : 'bg-white text-graphite-soft border-graphite-border hover:border-graphite hover:text-graphite'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <hr className="flex-1 border-t border-graphite-border" />
              <p className="label-museum text-graphite-soft">OPEN ANY CARD TO BEGIN</p>
              <hr className="flex-1 border-t border-graphite-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((arg) => (
                <ArtifactCard key={arg.id} argument={arg} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
