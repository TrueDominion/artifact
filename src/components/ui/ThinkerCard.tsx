/**
 * src/components/ui/ThinkerCard.tsx
 * Secondary thinker profile card for The Collection.
 * Small graphite bust SVG, name, dates, tradition, one-line summary.
 */

import { motion } from 'framer-motion'
import type { Thinker } from '@/types'
import { ThinkerBust } from '@/components/ui/ExhibitLabel'

interface ThinkerCardProps {
  thinker: Thinker
  index: number
}

export default function ThinkerCard({ thinker, index }: ThinkerCardProps) {
  return (
    <motion.article
      className="border border-graphite-border bg-white p-6 flex flex-col gap-4 hover:shadow-card-hover transition-shadow duration-400"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
    >
      {/* Bust illustration */}
      <div className="flex justify-center py-3 border-b border-graphite-border">
        <ThinkerBust svgKey={thinker.portrait_svg_key} />
      </div>

      {/* Info */}
      <div>
        <p className="label-museum mb-2 text-graphite-soft">{thinker.tradition}</p>
        <h3 className="font-serif font-bold text-xl text-ink mb-1 tracking-heading">
          {thinker.name}
        </h3>
        <p className="font-sans text-xs text-graphite-soft mb-3">{thinker.dates}</p>
        <p className="font-sans text-sm text-graphite-light leading-relaxed">
          {thinker.summary}
        </p>
      </div>

      {/* Key works */}
      {thinker.key_works.length > 0 && (
        <div className="pt-3 border-t border-graphite-border">
          <p className="label-museum mb-2 text-graphite-soft">KEY WORKS</p>
          <ul className="space-y-1">
            {thinker.key_works.slice(0, 3).map((work: string, i: number) => (
              <li key={i} className="font-sans text-xs italic text-graphite-soft">
                {work}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.article>
  )
}
