/**
 * src/pages/Faultlines.tsx
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import debatesData from '@/data/debates.json'
import type { Debate } from '@/types'

const debates = debatesData as unknown as Debate[]

function SeverityBars({ level, inverted = false }: { level: number; inverted?: boolean }) {
  return (
    <div className="flex items-end gap-0.5" aria-label={`Severity ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1 rounded-sm transition-colors duration-300"
          style={{
            height: `${6 + i * 2}px`,
            backgroundColor: i <= level
              ? (inverted ? 'rgba(255,255,255,0.7)' : '#C41E3A')
              : (inverted ? 'rgba(255,255,255,0.15)' : '#E8E8E8'),
          }}
        />
      ))}
    </div>
  )
}

function FaultlinesHero() {
  const [imgFailed, setImgFailed] = useState(false)
  if (imgFailed) return null
  return (
    <div className="w-full overflow-hidden border-b border-graphite-border" style={{ maxHeight: '340px' }}>
      <img
        src="/images/faultlines.webp"
        alt="Tectonic fault line — where the ground breaks"
        className="w-full object-cover"
        style={{ filter: 'grayscale(100%) contrast(1.05)', maxHeight: '340px' }}
        onError={() => setImgFailed(true)}
      />
    </div>
  )
}

const difficultyStyle: Record<Debate['difficulty'], string> = {
  foundational: 'border-graphite-border text-graphite-soft',
  intermediate:  'border-graphite text-graphite',
  advanced:      'border-ink text-ink',
}

function ResponseText({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => {
        if (/^\d+\./.test(para.trim())) {
          return (
            <div key={i} className="flex gap-3">
              <span className="font-serif font-bold text-graphite-border flex-shrink-0 mt-0.5 text-sm">
                {para.match(/^(\d+)\./)?.[1]}
              </span>
              <p className="font-sans text-sm text-graphite leading-relaxed">
                {para.replace(/^\d+\.\s*/, '')}
              </p>
            </div>
          )
        }
        return (
          <p key={i} className="font-sans text-sm text-graphite leading-relaxed">
            {para}
          </p>
        )
      })}
    </div>
  )
}

interface FaultCardProps {
  debate: Debate
  index: number
  isOpen: boolean
  onToggle: () => void
}

function FaultCard({ debate, index, isOpen, onToggle }: FaultCardProps) {
  const [showSources, setShowSources] = useState(false)

  return (
    <motion.article
      className="border-b border-graphite-border overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.04 }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'}: ${debate.title}`}
      >
        <div className={`flex gap-0 transition-colors duration-300 ${isOpen ? 'bg-ink' : 'bg-white hover:bg-linen'}`}>
          <div
            className="w-1 flex-shrink-0 transition-colors duration-300"
            style={{ backgroundColor: isOpen ? '#C41E3A' : 'transparent' }}
          />
          <div className="flex-1 px-7 py-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="label-museum" style={{ color: isOpen ? 'rgba(255,255,255,0.35)' : '#9A9A9A' }}>
                    FAULT {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`label-museum border px-1.5 py-0.5 ${isOpen ? 'text-white border-white border-opacity-20 opacity-50' : difficultyStyle[debate.difficulty]}`}>
                    {debate.difficulty.toUpperCase()}
                  </span>
                  <span
                    className="label-museum px-1.5 py-0.5"
                    style={{
                      backgroundColor: isOpen ? 'rgba(255,255,255,0.08)' : '#FAF8F5',
                      color: isOpen ? 'rgba(255,255,255,0.5)' : '#4A4A4A',
                    }}
                  >
                    {debate.category.toUpperCase()}
                  </span>
                </div>
                <h2 className={`font-serif font-bold text-xl lg:text-2xl tracking-heading mb-3 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-ink'}`}>
                  {debate.title}
                </h2>
                <p className={`font-sans text-sm leading-relaxed max-w-2xl transition-colors duration-300 ${isOpen ? 'text-white opacity-60' : 'text-graphite-light'}`}>
                  {debate.summary}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-1">
                <SeverityBars level={debate.severity} inverted={isOpen} />
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 1L5 5L9 1" stroke={isOpen ? 'rgba(255,255,255,0.35)' : '#9A9A9A'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </div>
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr]">

              <motion.div
                className="p-8 lg:p-10 border-t border-graphite-border"
                style={{ backgroundColor: '#F5F3F0' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.18, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-graphite-soft" />
                  <p className="label-museum text-graphite-soft">THE ISLAMIC CLAIM</p>
                </div>
                <ResponseText text={debate.challenge} />
              </motion.div>

              <div className="hidden lg:block bg-crimson opacity-40 border-t border-graphite-border" />

              <motion.div
                className="p-8 lg:p-10 bg-white border-t border-graphite-border"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.22, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1,8 L5,2 L9,8" stroke="#C41E3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="2.5" y1="6" x2="7.5" y2="6" stroke="#C41E3A" strokeWidth="0.8" strokeLinecap="round"/>
                  </svg>
                  <p className="label-museum text-graphite-soft">THE CHRISTIAN RESPONSE</p>
                </div>
                <ResponseText text={debate.response} />

                {debate.key_thinkers.length > 0 && (
                  <div className="mt-7 pt-5 border-t border-graphite-border">
                    <p className="label-museum text-graphite-soft mb-2">KEY THINKERS</p>
                    <p className="font-sans text-xs text-graphite-soft leading-relaxed">
                      {debate.key_thinkers.join(' · ')}
                    </p>
                  </div>
                )}

                {debate.sources.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowSources(v => !v) }}
                      className="flex items-center gap-2 label-museum text-graphite-soft hover:text-graphite transition-colors duration-200"
                    >
                      <span>{showSources ? 'HIDE' : 'SHOW'} SOURCES</span>
                      <motion.svg
                        animate={{ rotate: showSources ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true"
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
                          {debate.sources.map((src: string, i: number) => (
                            <li key={i} className="font-sans text-xs italic text-graphite-soft">{src}</li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function Faultlines() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  return (
    <div className="min-h-screen">
      <SectionHeader title="FAULTLINES" subtitle="Where the Ground Breaks." label="Section V" />

      <FaultlinesHero />

      {/* ── Intro + severity legend ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          // FIXED — outer tag is div, inner spans only
<div className="font-sans text-sm text-graphite-light leading-body max-w-lg">
  Eight of the hardest challenges Islamic theology raises against Christianity —
  each one taken seriously and answered honestly. The ones marked{' '}
  <span className="inline-flex items-end gap-0.5 mx-1">
    {[1, 2, 3, 4, 5].map(i => (
      <span
        key={i}
        className="w-1 rounded-sm bg-crimson"
        style={{ height: `${6 + i * 2}px`, display: 'inline-block' }}
      />
    ))}
  </span>
  {' '}are the ones you are most likely to encounter first.
</div>

          <div className="flex items-center gap-5 flex-shrink-0 sm:ml-auto border border-graphite-border px-5 py-3">
            <span className="label-museum text-graphite-soft">SEVERITY</span>
            <div className="flex items-center gap-4">
              {[
                { level: 3, label: 'SERIOUS' },
                { level: 4, label: 'CRITICAL' },
                { level: 5, label: 'FATAL' },
              ].map(({ level, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <SeverityBars level={level} />
                  <span className="label-museum text-graphite-soft" style={{ fontSize: '0.5rem' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>{/* ← FIX: this closing tag was missing, leaving the flex wrapper unclosed */}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="border-t border-graphite-border">
          {debates.map((debate, index) => (
            <FaultCard
              key={debate.id}
              debate={debate}
              index={index}
              isOpen={openId === debate.id}
              onToggle={() => toggle(debate.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
