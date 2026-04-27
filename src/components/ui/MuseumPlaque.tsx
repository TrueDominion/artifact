import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BedrockEntry } from '@/types'

interface MuseumPlaqueProps {
  entry: BedrockEntry
  index: number
}

export default function MuseumPlaque({ entry, index }: MuseumPlaqueProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      className="border border-graphite-border overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
    >
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-8 py-4 bg-linen border-b border-graphite-border">
        <span className="label-museum text-graphite-soft">{entry.confession}</span>
        <span className="label-museum text-graphite-soft">
          FOUNDATION {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* ── Main body ── */}
      <div className="bg-white">
        <div className="px-8 pt-8 pb-6 lg:px-10">

          {/* Scripture block — crimson bar is intentional, stays */}
          <div className="flex gap-4 mb-7">
            <div className="w-0.5 flex-shrink-0 bg-crimson rounded-full" />
            <div>
              <p className="font-sans text-xs font-medium tracking-museum text-crimson mb-1.5">
                {entry.scripture}
              </p>
              <p className="font-serif italic text-base text-graphite leading-relaxed">
                "{entry.scripture_text}"
              </p>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-serif font-bold text-2xl lg:text-3xl text-ink tracking-heading mb-3">
            {entry.title}
          </h2>

          {/* Summary */}
          <p className="font-sans text-sm font-medium text-graphite leading-relaxed max-w-2xl">
            {entry.summary}
          </p>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(v => !v)}
            className="mt-6 flex items-center gap-3 group"
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse doctrine' : 'Expand doctrine'}
          >
            <span className="label-museum text-graphite-soft group-hover:text-graphite transition-colors duration-300">
              {expanded ? 'COLLAPSE' : 'READ THE FULL EXPLANATION'}
            </span>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </button>
        </div>

        {/* ── Expandable panels ── */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t border-graphite-border grid grid-cols-1 lg:grid-cols-2">

                {/* Left — What We Believe */}
                <motion.div
                  className="px-8 py-8 lg:px-10 lg:py-10 lg:border-r border-graphite-border"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <p className="label-museum text-graphite-soft">WHAT WE BELIEVE</p>
                  </div>
                  <p className="font-sans text-sm text-graphite leading-relaxed">
                    {entry.doctrine}
                  </p>
                </motion.div>

                {/* Right — How Islam Differs */}
                <motion.div
                  className="px-8 py-8 lg:px-10 lg:py-10 border-t lg:border-t-0 border-graphite-border"
                  style={{ backgroundColor: '#FAF8F5' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.18, ease: 'easeOut' }}
                >
                  {/* Graphite rule — was crimson, corrected */}
                  <div className="w-full h-px bg-graphite-border mb-5" />
                  <div className="flex items-center gap-2 mb-5">
                    <p className="label-museum text-graphite-soft">HOW ISLAM DIFFERS</p>
                    {/* Icon strokes corrected from crimson to graphite-soft */}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1,8 L5,2 L9,8" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="2.5" y1="6" x2="7.5" y2="6" stroke="#9A9A9A" strokeWidth="0.7" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="font-sans text-sm text-graphite leading-relaxed">
                    {entry.islamic_contrast}
                  </p>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
