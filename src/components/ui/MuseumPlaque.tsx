/**
 * src/components/ui/MuseumPlaque.tsx
 * Museum plaque component for Bedrock entries.
 * Warm linen background, thin graphite border, crimson left-edge rule.
 * Serif title, clean body text, italic scripture citation.
 */

import { motion } from 'framer-motion'
import type { BedrockEntry } from '@/types'

interface MuseumPlaqueProps {
  entry: BedrockEntry
  index: number
}

export default function MuseumPlaque({ entry, index }: MuseumPlaqueProps) {
  return (
    <motion.article
      className="relative flex"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
    >
      {/* Crimson left-edge vertical rule */}
      <div className="w-px flex-shrink-0 bg-crimson self-stretch" style={{ minHeight: '100%' }} />

      {/* Plaque body */}
      <div
        className="flex-1 border border-l-0 border-graphite-border p-8 lg:p-10"
        style={{ backgroundColor: '#FAF8F5' }}
      >
        {/* Entry number */}
        <p className="label-museum mb-4 text-graphite-soft">
          FOUNDATION {String(index + 1).padStart(2, '0')}
        </p>

        {/* Title */}
        <h2 className="font-serif font-bold text-2xl lg:text-3xl text-ink mb-4 tracking-heading">
          {entry.title}
        </h2>

        {/* Thin rule */}
        <hr className="rule-graphite mb-5" />

        {/* Summary */}
        <p className="font-sans text-base text-graphite leading-body mb-6">
          {entry.summary}
        </p>

        {/* Detail */}
        <p className="font-sans text-sm text-graphite-light leading-relaxed mb-7">
          {entry.detail}
        </p>

        {/* Scripture */}
        <div className="border-t border-graphite-border pt-5">
          <p className="scripture-cite">{entry.scripture}</p>
        </div>
      </div>
    </motion.article>
  )
}
