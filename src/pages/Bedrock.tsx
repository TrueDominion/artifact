/**
 * src/pages/Bedrock.tsx
 */

import MuseumPlaque from '@/components/ui/MuseumPlaque'
import bedrockData from '@/data/bedrock.json'
import type { BedrockEntry } from '@/types'

const bedrock = bedrockData as unknown as BedrockEntry[]

export default function Bedrock() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-32 pb-8">
        <p className="type-label mb-4">Section I</p>
        <h1 className="type-display text-4xl md:text-5xl text-[#1A1A1A] mb-4">BEDROCK</h1>
        <p className="prose-constrained text-[#2D2D2D] font-light text-base leading-relaxed mb-8">
          Seven foundational doctrines of Christian faith — what each one means, what is at stake if it is denied, and where Islamic theology directly contradicts it.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 mb-8">
        <div className="flex items-center gap-8 py-4 border-t border-b border-[#E8E4DF]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-[#E8E4DF] bg-white" />
            <span className="type-label">THE BELIEF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#E8E4DF]" />
            <span className="type-label">HOW ISLAM DIFFERS</span>
          </div>
          <div className="ml-auto flex items-center gap-2 opacity-50">
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
              <path d="M1 1L4 4L7 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="type-label">CLICK TO EXPAND</span>
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
