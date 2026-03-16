/**
 * src/components/ui/ArtifactCard.tsx
 * Card component for The Dig section.
 * Default state: artifact icon + title + summary with sandy overlay.
 * Hover: overlay fades, card elevates, crimson annotation appears.
 * Click: Framer Motion accordion expands revealing 5 structured layers.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Argument, ArgumentSource } from '@/types'
import { ArtifactIcon } from '@/components/ui/ExhibitLabel'

interface ArtifactCardProps {
  argument: Argument
}

const layers: { key: keyof Pick<Argument, 'claim' | 'logic' | 'counterargument' | 'response'>; label: string }[] = [
  { key: 'claim', label: 'CLAIM' },
  { key: 'logic', label: 'LOGICAL STRUCTURE' },
  { key: 'counterargument', label: 'COUNTERARGUMENT' },
  { key: 'response', label: 'RESPONSE' },
]

export default function ArtifactCard({ argument }: ArtifactCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      className="relative border border-graphite-border bg-white cursor-pointer group overflow-hidden"
      whileHover={expanded ? {} : { y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => setExpanded((v) => !v)}
      role="button"
      aria-expanded={expanded}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setExpanded((v) => !v)}
    >
      {/* Sandy overlay — fades on hover */}
      {!expanded && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-400 group-hover:opacity-0"
          style={{
            background: 'linear-gradient(135deg, rgba(250,248,245,0.7) 0%, rgba(245,243,240,0.5) 100%)',
          }}
        />
      )}

      {/* Crimson annotation — appears on hover */}
      {!expanded && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2,14 L8,2 L14,14" stroke="#C41E3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="4.5" y1="10" x2="11.5" y2="10" stroke="#C41E3A" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* Card header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center opacity-60">
            <ArtifactIcon svgKey={argument.artifact_svg_key} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="label-museum mb-2">{argument.category}</p>
            <h3 className="font-serif text-lg text-ink mb-2 leading-snug">{argument.title}</h3>
            <p className="font-sans text-sm text-graphite-light leading-relaxed">{argument.summary}</p>
          </div>
        </div>

        {/* Expand indicator */}
        <div className="mt-4 flex items-center gap-2">
          <span className="label-museum">{expanded ? 'COLLAPSE' : 'EXCAVATE'}</span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
              <path d="M1 1L5 5L9 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <hr className="rule-graphite mb-6" />

              {/* Argument layers */}
              {layers.map(({ key, label }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3, ease: 'easeOut' }}
                  className="mb-5"
                >
                  <p className="label-museum mb-2 text-graphite-soft">{label}</p>
                  <p className="font-sans text-sm text-graphite leading-body">{argument[key]}</p>
                  {i < layers.length - 1 && <hr className="rule-graphite mt-5" />}
                </motion.div>
              ))}

              {/* Sources layer */}
              {argument.sources.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.3, ease: 'easeOut' }}
                >
                  <hr className="rule-graphite mb-5" />
                  <p className="label-museum mb-3 text-graphite-soft">SOURCES</p>
                  <ul className="space-y-1.5">
                    {argument.sources.map((source: ArgumentSource, idx: number) => (
                      <li key={idx} className="font-sans text-xs text-graphite-soft">
                        <span className="text-graphite-light">{source.author}</span>
                        {' — '}
                        <span className="italic">{source.title}</span>
                        {source.year && <span className="ml-1">({source.year})</span>}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
