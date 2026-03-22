/**
 * src/pages/TheCollection.tsx
 * THE COLLECTION — Thinkers & Intellectual History.
 * Featured profile (large format) + secondary ThinkerCard grid.
 * Both use real portrait images from /public/images/{key}.webp.
 * Graceful fallback to initials if image not yet uploaded.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import ThinkerCard from '@/components/ui/ThinkerCard'
import CrimsonBrushstroke from '@/components/ui/CrimsonBrushstroke'
import thinkersData from '@/data/thinkers.json'
import type { Thinker } from '@/types'

const thinkers = thinkersData as Thinker[]
const featured = thinkers[0]
const secondary = thinkers.slice(1)

// Featured portrait with fallback
function FeaturedPortrait({ thinker }: { thinker: Thinker }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    const initials = thinker.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)
    return (
      <div className="w-full h-full flex items-center justify-center bg-linen min-h-[280px]">
        <span className="font-serif font-bold text-5xl text-graphite-border select-none">
          {initials}
        </span>
      </div>
    )
  }

  return (
    <img
      src={`/images/${thinker.portrait_svg_key}.webp`}
      alt={`Portrait of ${thinker.name}`}
      className="w-full h-full object-cover"
      style={{
        minHeight: '280px',
        maxHeight: '420px',
      }}
      onError={() => setFailed(true)}
    />
  )
}

export default function TheCollection() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE COLLECTION"
        subtitle="Thinkers & Intellectual History."
        label="Section VI"
      />

      <div className="max-w-2xl mx-auto px-6 lg:px-12 pb-12 text-center">
  <p className="font-sans text-sm text-graphite-light leading-relaxed">
    These are some of the brightest minds who made the case for Christian faith —
    thinkers who wrestled seriously with the hardest questions and came out more
    convinced, not less. The last three specifically engaged with Islam. Their work
    is worth knowing before you need it.
  </p>
</div>

      {/* Featured profile */}
      {featured && (
        <motion.section
          className="max-w-7xl mx-auto px-6 lg:px-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="label-museum mb-8 text-graphite-soft">FEATURED PROFILE</p>
          <div className="border border-graphite-border grid grid-cols-1 lg:grid-cols-[320px_1fr]">
<div className="max-w-2xl mx-auto px-6 lg:px-12 pb-12 text-center">
  <p className="font-sans text-sm text-graphite-light leading-relaxed">
    These are some of the brightest minds who have made the case for Christian faith —
    thinkers who wrestled seriously with the hardest questions and came out more convinced,
    not less. Their ideas are still worth knowing.
  </p>
</div>
            {/* Portrait */}
            <div className="overflow-hidden border-b lg:border-b-0 lg:border-r border-graphite-border">
              <FeaturedPortrait thinker={featured} />
            </div>

            {/* Museum placard */}
            <div className="p-10 lg:p-14">
              <p className="label-museum mb-4 text-graphite-soft">{featured.tradition}</p>

              <div className="flex flex-col gap-1 mb-3">
                <h2 className="font-serif font-bold text-3xl lg:text-4xl text-ink tracking-heading">
                  {featured.name}
                </h2>
                <CrimsonBrushstroke width={200} animate={true} />
              </div>

              <p className="font-sans text-sm text-graphite-soft mb-6">{featured.dates}</p>
              <hr className="rule-graphite mb-6" />

              <p className="font-sans text-sm text-graphite leading-body mb-6">
                {featured.summary}
              </p>
              <p className="font-sans text-sm text-graphite-light leading-body mb-8">
                {featured.contribution}
              </p>

              <div>
                <p className="label-museum mb-3 text-graphite-soft">KEY WORKS</p>
                <ul className="space-y-1.5">
                  {featured.key_works.map((work: string, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="font-serif text-graphite-border text-sm flex-shrink-0 mt-0.5">—</span>
                      <span className="font-sans text-xs italic text-graphite-soft">{work}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Secondary profiles grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="flex items-center gap-6 mb-10">
          <hr className="rule-graphite flex-1" />
          <p className="label-museum text-graphite-soft">THE FULL COLLECTION</p>
          <hr className="rule-graphite flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondary.map((thinker, index) => (
            <ThinkerCard key={thinker.id} thinker={thinker} index={index} />
          ))}
        </div>
      </div>

      {/* Closing line */}
      <motion.div
        className="border-t border-graphite-border py-20 text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-serif italic text-xl md:text-2xl text-graphite-light">
          The excavation continues.
        </p>
      </motion.div>
    </div>
  )
}
