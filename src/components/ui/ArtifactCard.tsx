/**
 * src/components/ui/ArtifactCard.tsx
 * Card component for The Dig section.
 * Front face: category label, title, summary, artifact icon.
 * Click: card flips 180° on Y-axis with CSS perspective + lifts off grid.
 * Back face: 4 argument layers + sources, staggered reveal after flip completes.
 * Mobile: tap flips; desktop: click flips. ESC or click-outside collapses.
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Argument, ArgumentSource } from '@/types'
import { ArtifactIcon } from '@/components/ui/ExhibitLabel'

interface ArtifactCardProps {
  argument: Argument
}

const layers: {
  key: keyof Pick<Argument, 'claim' | 'logic' | 'counterargument' | 'response'>
  label: string
  number: string
}[] = [
  { key: 'claim',           label: 'CLAIM',              number: '01' },
  { key: 'logic',           label: 'LOGICAL STRUCTURE',  number: '02' },
  { key: 'counterargument', label: 'COUNTERARGUMENT',    number: '03' },
  { key: 'response',        label: 'RESPONSE',           number: '04' },
]

export default function ArtifactCard({ argument }: ArtifactCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Show back-face content only after flip is halfway done (~300ms)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (flipped) {
      timer = setTimeout(() => setShowBack(true), 320)
    } else {
      setShowBack(false)
    }
    return () => clearTimeout(timer)
  }, [flipped])

  // ESC key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && flipped) setFlipped(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped])

  return (
    // Perspective wrapper — does NOT move
    <div
      ref={cardRef}
      className="relative w-full"
      style={{ perspective: '1200px', minHeight: '320px' }}
    >
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: flipped ? 180 : 0,
          y: flipped ? -16 : 0,
          scale: flipped ? 1.02 : 1,
          zIndex: flipped ? 50 : 1,
          boxShadow: flipped
            ? '0 24px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)'
            : '0 1px 4px rgba(0,0,0,0.04)',
        }}
        transition={{
          rotateY: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          y:       { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          scale:   { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          boxShadow: { duration: 0.65 },
        }}
        onClick={() => setFlipped(v => !v)}
        role="button"
        aria-expanded={flipped}
        aria-label={`${argument.title} — click to ${flipped ? 'collapse' : 'excavate'}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped(v => !v)}
      >

        {/* ── FRONT FACE ── */}
        <div
          className="absolute inset-0 w-full h-full bg-white border border-graphite-border overflow-hidden group"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Sandy gradient overlay — fades on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
            style={{
              background:
                'linear-gradient(145deg, rgba(250,248,245,0.75) 0%, rgba(245,243,240,0.45) 100%)',
            }}
          />

          {/* Crimson annotation mark — appears on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2,12 L7,2 L12,12" stroke="#C41E3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="4" y1="9" x2="10" y2="9" stroke="#C41E3A" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
          </div>

          <div className="p-7 flex flex-col h-full min-h-[320px]">
            {/* Icon + category */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 opacity-50 flex-shrink-0">
                <ArtifactIcon svgKey={argument.artifact_svg_key} />
              </div>
              <p className="label-museum text-graphite-soft">{argument.category}</p>
            </div>

            {/* Title */}
            <h3 className="font-serif font-bold text-xl text-ink mb-3 leading-snug tracking-heading">
              {argument.title}
            </h3>

            {/* Thin rule */}
            <div className="w-8 h-px bg-graphite-border mb-4" />

            {/* Summary */}
            <p className="font-sans text-sm text-graphite-light leading-relaxed flex-1">
              {argument.summary}
            </p>

            {/* Excavate prompt */}
            <div className="mt-6 flex items-center gap-2 pt-4 border-t border-graphite-border">
              <span className="label-museum text-graphite-soft">EXCAVATE</span>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                <path d="M1 4H13M9 1L13 4L9 7" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          className="w-full bg-white border border-graphite-border overflow-y-auto"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            minHeight: '320px',
            maxHeight: '520px',
          }}
        >
          <div className="p-7">
            {/* Back header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="label-museum text-graphite-soft mb-1">{argument.category}</p>
                <h3 className="font-serif font-bold text-lg text-ink leading-snug tracking-heading">
                  {argument.title}
                </h3>
              </div>
              {/* Close hint */}
              <div className="flex-shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <line x1="2" y1="2" x2="12" y2="12" stroke="#C41E3A" strokeWidth="1" strokeLinecap="round" />
                  <line x1="12" y1="2" x2="2" y2="12" stroke="#C41E3A" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <hr className="rule-graphite mb-5" />

            {/* Staggered layers — only render after flip completes */}
            <AnimatePresence>
              {showBack && (
                <>
                  {layers.map(({ key, label, number }, i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.09, duration: 0.35, ease: 'easeOut' }}
                      className="mb-5"
                    >
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="font-serif text-xs text-graphite-border font-bold">{number}</span>
                        <p className="label-museum text-graphite-soft">{label}</p>
                      </div>
                      <p className="font-sans text-xs text-graphite leading-relaxed">
                        {argument[key]}
                      </p>
                      {i < layers.length - 1 && <hr className="rule-graphite mt-5" />}
                    </motion.div>
                  ))}

                  {/* Sources */}
                  {argument.sources.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.38, duration: 0.35, ease: 'easeOut' }}
                    >
                      <hr className="rule-graphite mb-4" />
                      <p className="label-museum mb-2 text-graphite-soft">SOURCES</p>
                      <ul className="space-y-1">
                        {argument.sources.map((source: ArgumentSource, idx: number) => (
                          <li key={idx} className="font-sans text-[0.6rem] text-graphite-soft leading-relaxed">
                            <span className="text-graphite-light">{source.author}</span>
                            {' — '}
                            <span className="italic">{source.title}</span>
                            {source.year && <span className="ml-1 not-italic">({source.year})</span>}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
