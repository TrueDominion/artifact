/**
 * src/pages/TheDig.tsx
 * THE DIG — Arguments Uncovered.
 * 3-column grid of ArtifactCards with expandable accordion layers.
 * Desktop: left sidebar with depth labels (SURFACE → BEDROCK).
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
          <aside className="hidden lg:flex flex-col items-center flex-shrink-0 pt-2" aria-label="Excavation depth levels">
            <div className="flex flex-col items-center gap-0 relative">
              {/* Vertical graphite line */}
              <div className="absolute top-5 bottom-5 left-1/2 -translate-x-1/2 w-px bg-graphite-border" />

              {['SURFACE', 'LAYER 1', 'LAYER 2', 'BEDROCK'].map((level, i) => (
                <div key={level} className="flex items-center gap-3 py-6 z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full border border-graphite-soft bg-white" />
                  <span
                    className="label-museum text-graphite-soft"
                    style={{ writingMode: 'horizontal-tb' }}
                  >
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* Arguments grid */}
          <div className="flex-1">
            <p className="font-sans text-sm text-graphite-light leading-body mb-10 max-w-xl">
              Select any artifact to excavate its layers: the claim at the surface,
              the logical structure beneath, the counterargument underneath that,
              and the response at the deepest stratum.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-graphite-border">
              {args.map((arg) => (
                <div key={arg.id} className="bg-white">
                  <ArtifactCard argument={arg} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
