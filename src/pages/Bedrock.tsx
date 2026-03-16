/**
 * src/pages/Bedrock.tsx
 * BEDROCK — The immovable foundation.
 * Renders each BedrockEntry as a MuseumPlaque.
 * Visual identity: stone foundation slab, authoritative, quiet.
 */

import SectionHeader from '@/components/ui/SectionHeader'
import MuseumPlaque from '@/components/ui/MuseumPlaque'
import bedrockData from '@/data/bedrock.json'
import type { BedrockEntry } from '@/types'

const bedrock = bedrockData as BedrockEntry[]

export default function Bedrock() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="BEDROCK"
        subtitle="The immovable foundation."
        label="Section I"
      />

      {/* Foundation description */}
      <div className="max-w-2xl mx-auto px-6 lg:px-12 pb-16 text-center">
        <p className="font-sans text-sm text-graphite-light leading-body">
          These are the doctrines that do not shift — the load-bearing walls of Christian belief.
          Each has been refined under pressure across twenty centuries of theological excavation.
          They are not opinions. They are foundations.
        </p>
      </div>

      {/* Plaques */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-32 space-y-6">
        {bedrock.map((entry, index) => (
          <MuseumPlaque key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </div>
  )
}
