/**
 * src/pages/Bedrock.tsx
 * BEDROCK — The immovable foundation.
 * Six WCF-sequenced entries rendered as structured MuseumPlaques.
 * Each plaque: scripture anchor, thesis summary, expandable doctrine + Islamic contrast panels.
 */

import SectionHeader from '@/components/ui/SectionHeader'
import MuseumPlaque from '@/components/ui/MuseumPlaque'
import bedrockData from '@/data/bedrock.json'
import type { BedrockEntry } from '@/types'

const bedrock = bedrockData as unknown as BedrockEntry[]

export default function Bedrock() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="BEDROCK"
        subtitle="The immovable foundation."
        label="Section I"
      />

      {/* Intro */}
      <div className="max-w-2xl mx-auto px-6 lg:px-12 pb-14 text-center">
        <p className="font-sans text-sm text-graphite-light leading-body">
          These are the doctrines that do not shift — the load-bearing walls of Christian belief,
          sequenced according to the Westminster Confession of Faith.
          Each entry presents the doctrine, then places it in direct contrast with the Islamic position.
        </p>
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-8">
        <div className="flex items-center gap-8 py-4 border-t border-b border-graphite-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-graphite-border bg-white rounded-sm" />
            <span className="label-museum text-graphite-soft">THE DOCTRINE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-crimson opacity-60" />
            <span className="label-museum text-graphite-soft">ISLAMIC CONTRAST</span>
          </div>
          <div className="ml-auto flex items-center gap-2 opacity-50">
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
              <path d="M1 1L4 4L7 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="label-museum text-graphite-soft">CLICK TO EXPAND</span>
          </div>
        </div>
      </div>

      {/* Plaques */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-32 space-y-4">
        {bedrock.map((entry, index) => (
          <MuseumPlaque key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </div>
  )
}
