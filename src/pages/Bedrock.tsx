/**
 * src/pages/Bedrock.tsx
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
        subtitle="The beliefs that don't move."
        label="Section I"
      />

      <div className="max-w-2xl mx-auto px-6 lg:px-12 pb-14 text-center">
        <p className="font-sans text-sm text-graphite-light leading-body">
          These are the core beliefs of the Christian faith — the ones that hold everything else up.
          Each entry explains what Christians believe, why it matters, and how it directly
          conflicts with what Islam teaches. Expand any entry to read the full explanation.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-8">
        <div className="flex items-center gap-8 py-4 border-t border-b border-graphite-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-graphite-border bg-white rounded-sm" />
            <span className="label-museum text-graphite-soft">THE BELIEF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-crimson opacity-60" />
            <span className="label-museum text-graphite-soft">HOW ISLAM DIFFERS</span>
          </div>
          <div className="ml-auto flex items-center gap-2 opacity-50">
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
              <path d="M1 1L4 4L7 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="label-museum text-graphite-soft">CLICK TO EXPAND</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-32 space-y-4">
        {bedrock.map((entry, index) => (
          <MuseumPlaque key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </div>
  )
}
