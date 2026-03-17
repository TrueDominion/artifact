/**
 * src/components/ui/ArtifactCard.tsx
 * Redesigned card for The Dig section.
 * Front face: category, title, summary, excavate prompt.
 * Flip reveals back face with 4-step tab navigator.
 * User steps through: CLAIM → LOGIC → OBJECTION → RESPONSE.
 * Sources appear as collapsed footnote on final step.
 * Progress indicator at top. Forward/back navigation. ESC closes.
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Argument, ArgumentSource } from '@/types'

interface ArtifactCardProps {
  argument: Argument
}

const steps: {
  key: keyof Pick<Argument, 'claim' | 'logic' | 'counterargument' | 'response'>
  label: string
  sublabel: string
}[] = [
  { key: 'claim',           label: 'CLAIM',         sublabel: 'The proposition' },
  { key: 'logic',           label: 'LOGIC',         sublabel: 'The structure' },
  { key: 'counterargument', label: 'OBJECTION',     sublabel: 'The challenge' },
  { key: 'response',        label: 'RESPONSE',      sublabel: 'The rebuttal' },
]

export default function ArtifactCard({ argument }: ArtifactCardProps) {
  const [flipped, setFlipped]     = useState(false)
  const [showBack, setShowBack]   = useState(false)
  const [step, setStep]           = useState(0)
  const [showSources, setShowSources] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Reveal back content after flip animation crosses midpoint
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (flipped) {
      t = setTimeout(() => setShowBack(true), 340)
    } else {
      setShowBack(false)
      setStep(0)
      setShowSources(false)
    }
    return () => clearTimeout(t)
  }, [flipped])

  // ESC closes
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && flipped) setFlipped(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [flipped])

  const isLast  = step === steps.length - 1
  const isFirst = step === 0

  return (
    <div
      ref={cardRef}
      className="relative w-full"
      style={{ perspective: '1400px', minHeight: '380px' }}
    >
      <motion.div
        className="relative w-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY:   flipped ? 180 : 0,
          y:         flipped ? -20 : 0,
          scale:     flipped ? 1.02 : 1,
          zIndex:    flipped ? 50 : 1,
          boxShadow: flipped
            ? '0 32px 72px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)'
            : '0 1px 6px rgba(0,0,0,0.04)',
        }}
        transition={{
          rotateY:   { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          y:         { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          scale:     { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
          boxShadow: { duration: 0.65 },
        }}
        onClick={() => !flipped && setFlipped(true)}
        role="button"
        aria-expanded={flipped}
        aria-label={`${argument.title} — click to excavate`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && !flipped && setFlipped(true)}
      >

        {/* ── FRONT FACE ─────────────────────────────── */}
        <div
          className="absolute inset-0 w-full h-full bg-white border border-graphite-border group overflow-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* Linen overlay fades on hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
            style={{ background: 'linear-gradient(150deg, rgba(250,248,245,0.8) 0%, rgba(245,243,240,0.4) 100%)' }}
          />

          {/* Crimson mark on hover */}
          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1,10 L6,2 L11,10" stroke="#C41E3A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3.5" y1="7.5" x2="8.5" y2="7.5" stroke="#C41E3A" strokeWidth="0.9" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="p-8 flex flex-col min-h-[380px]">
            {/* Category */}
            <p className="label-museum text-graphite-soft mb-4">{argument.category}</p>

            {/* Title */}
            <h3 className="font-serif font-bold text-xl text-ink mb-4 leading-snug tracking-heading">
              {argument.title}
            </h3>

            {/* Rule */}
            <div className="w-6 h-px bg-graphite-border mb-5" />

            {/* Summary */}
            <p className="font-sans text-sm text-graphite-light leading-relaxed flex-1">
              {argument.summary}
            </p>

            {/* Step preview dots */}
            <div className="mt-6 pt-5 border-t border-graphite-border flex items-center justify-between">
              <span className="label-museum text-graphite-soft group-hover:text-graphite transition-colors duration-300">
                EXCAVATE
              </span>
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <div key={i} className="w-3 h-px bg-graphite-border" />
                ))}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="ml-1" aria-hidden="true">
                  <path d="M1 3.5H11M7.5 1L11 3.5L7.5 6" stroke="#C8C8C8" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK FACE ──────────────────────────────── */}
        <div
          className="w-full bg-white border border-graphite-border overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            minHeight: '380px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Step progress bar ── */}
          <div className="flex border-b border-graphite-border">
            {steps.map((s, i) => (
              <button
                key={s.key}
                onClick={() => { setStep(i); setShowSources(false) }}
                className={`flex-1 py-3 px-2 text-center transition-colors duration-300 ${
                  i === step
                    ? 'bg-ink'
                    : 'bg-white hover:bg-linen'
                }`}
                aria-label={`Go to step ${i + 1}: ${s.label}`}
              >
                <span className={`label-museum block ${i === step ? 'text-white' : 'text-graphite-soft'}`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* ── Content area ── */}
          <div className="p-7 flex flex-col" style={{ minHeight: '320px' }}>

            {/* Close button */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif font-bold text-3xl text-graphite-border select-none">
                  0{step + 1}
                </span>
                <div>
                  <p className="font-serif font-bold text-base text-ink leading-tight">
                    {steps[step].label}
                  </p>
                  <p className="label-museum text-graphite-soft">{steps[step].sublabel}</p>
                </div>
              </div>
              <button
                onClick={() => setFlipped(false)}
                className="flex-shrink-0 p-1 opacity-40 hover:opacity-100 transition-opacity duration-200"
                aria-label="Close card"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <line x1="1" y1="1" x2="11" y2="11" stroke="#C41E3A" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="11" y1="1" x2="1" y2="11" stroke="#C41E3A" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <hr className="rule-graphite mb-5" />

            {/* Step content — animated on step change */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {showBack && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <p className="font-sans text-sm text-graphite leading-relaxed">
                      {argument[steps[step].key]}
                    </p>

                    {/* Sources — only on final step */}
                    {isLast && argument.sources.length > 0 && (
                      <div className="mt-5">
                        <button
                          onClick={() => setShowSources(v => !v)}
                          className="flex items-center gap-2 label-museum text-graphite-soft hover:text-graphite transition-colors duration-200"
                        >
                          <span>{showSources ? 'HIDE' : 'SHOW'} SOURCES</span>
                          <motion.svg
                            animate={{ rotate: showSources ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            width="8" height="5" viewBox="0 0 8 5" fill="none"
                            aria-hidden="true"
                          >
                            <path d="M1 1L4 4L7 1" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                          </motion.svg>
                        </button>
                        <AnimatePresence>
                          {showSources && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-3 space-y-1.5 overflow-hidden"
                            >
                              {argument.sources.map((source: ArgumentSource, idx: number) => (
                                <li key={idx} className="font-sans text-[0.6rem] text-graphite-soft leading-relaxed">
                                  <span className="text-graphite-light not-italic">{source.author}</span>
                                  {' — '}
                                  <span className="italic">{source.title}</span>
                                  {source.year && <span className="not-italic ml-1">({source.year})</span>}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Navigation ── */}
            <div className="flex items-center justify-between pt-5 mt-4 border-t border-graphite-border">
              <button
                onClick={() => { setStep(s => s - 1); setShowSources(false) }}
                disabled={isFirst}
                className="flex items-center gap-2 label-museum text-graphite-soft hover:text-graphite disabled:opacity-20 transition-colors duration-200"
                aria-label="Previous layer"
              >
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true">
                  <path d="M11 3.5H1M4.5 1L1 3.5L4.5 6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                PREV
              </button>

              {/* Pip progress */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === step
                        ? 'w-4 h-1.5 bg-ink'
                        : i < step
                          ? 'w-1.5 h-1.5 bg-graphite-soft'
                          : 'w-1.5 h-1.5 bg-graphite-border'
                    }`}
                  />
                ))}
              </div>

              {isLast ? (
                <button
                  onClick={() => setFlipped(false)}
                  className="flex items-center gap-2 label-museum text-crimson hover:opacity-70 transition-opacity duration-200"
                  aria-label="Close card"
                >
                  CLOSE
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true">
                    <path d="M1 3.5H11M7.5 1L11 3.5L7.5 6" stroke="#C41E3A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => { setStep(s => s + 1); setShowSources(false) }}
                  className="flex items-center gap-2 label-museum text-graphite-soft hover:text-graphite transition-colors duration-200"
                  aria-label="Next layer"
                >
                  NEXT
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true">
                    <path d="M1 3.5H11M7.5 1L11 3.5L7.5 6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
