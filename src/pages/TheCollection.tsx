/**
 * src/pages/TheCollection.tsx
 * THE COLLECTION — Thinkers & Intellectual History.
 * Featured profile (large format) + secondary ThinkerCard grid.
 * Closing full-width italic line: "The excavation continues."
 */

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import ThinkerCard from '@/components/ui/ThinkerCard'
import CrimsonBrushstroke from '@/components/ui/CrimsonBrushstroke'
import { ThinkerBust } from '@/components/ui/ExhibitLabel'
import thinkersData from '@/data/thinkers.json'
import type { Thinker } from '@/types'

const thinkers = thinkersData as Thinker[]
const featured = thinkers[0]
const secondary = thinkers.slice(1)

export default function TheCollection() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE COLLECTION"
        subtitle="Thinkers & Intellectual History."
        label="Section VI"
      />

      {/* Featured profile */}
      {featured && (
        <motion.section
          className="max-w-7xl mx-auto px-6 lg:px-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="label-museum mb-8 text-graphite-soft">FEATURED PROFILE</p>
          <div className="border border-graphite-border grid grid-cols-1 lg:grid-cols-[280px_1fr]">
            {/* Portrait */}
            <div className="flex items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-graphite-border bg-linen">
              <div className="w-40 h-52">
                <ThinkerBust svgKey={featured.portrait_svg_key} className="w-full h-full" />
              </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite-border">
          {secondary.map((thinker, index) => (
            <div key={thinker.id} className="bg-white">
              <ThinkerCard thinker={thinker} index={index} />
            </div>
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
