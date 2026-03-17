/**
 * src/pages/TheDig.tsx
 * THE DIG — Arguments Uncovered.
 * 8-card grid. Each card flips to reveal 4-step argument navigator.
 * Desktop sidebar retains excavation depth metaphor.
 */

import SectionHeader from '@/components/ui/SectionHeader'
import ArtifactCard from '@/components/ui/ArtifactCard'
import argumentsData from '@/data/arguments.json'
import type { Argument } from '@/types'

const args = argumentsData as unknown as Argument[]

export default function TheDig() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE DIG"
        subtitle="Arguments Uncovered."
        label="Section II"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="flex gap-10 lg:gap-16">

          {/* Depth sidebar — desktop only */}
          <aside
            className="hidden lg:flex flex-col items-center flex-shrink-0 pt-2"
            aria-label="Excavation depth levels"
          >
            <div className="flex flex-col items-center gap-0 relative">
              <div className="absolute top-5 bottom-5 left-1/2 -translate-x-1/2 w-px bg-graphite-border" />
              {['CLAIM', 'LOGIC', 'OBJECTION', 'RESPONSE'].map((level) => (
                <div key={level} className="flex items-center gap-3 py-8 z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full border border-graphite-soft bg-white" />
                  <span className="label-museum text-graphite-soft whitespace-nowrap">
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* Grid */}
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
