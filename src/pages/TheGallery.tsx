/**
 * src/pages/TheGallery.tsx
 * THE GALLERY — Beliefs in Context.
 * Grid of exhibit cards. Click expands in-place with 3-tab panel.
 * OVERVIEW tab features animated adherent counter triggered on panel open.
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { WorldviewSymbol } from '@/components/ui/ExhibitLabel'
import worldviewsData from '@/data/worldviews.json'
import type { Worldview } from '@/types'

const worldviews = worldviewsData as unknown as Worldview[]

type Tab = 'overview' | 'claims' | 'critique'

const tabs: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'OVERVIEW'    },
  { key: 'claims',   label: 'CORE CLAIMS' },
  { key: 'critique', label: 'CRITIQUE'    },
]

interface CounterProps {
  target: number
  unit: string
  duration?: number
  trigger: boolean
}

function AnimatedCounter({ target, unit, duration = 1800, trigger }: CounterProps) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!trigger) return
    const delay = setTimeout(() => {
      startRef.current = null
      const animate = (ts: number) => {
        if (!startRef.current) startRef.current = ts
        const elapsed = ts - startRef.current
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(parseFloat((eased * target).toFixed(1)))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          setDisplay(target)
        }
      }
      rafRef.current = requestAnimationFrame(animate)
    }, 200)
    return () => {
      clearTimeout(delay)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [trigger, target, duration])

  const formatted = display % 1 === 0 ? display.toFixed(0) : display.toFixed(1)

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif font-bold text-ink" style={{ fontSize: '2.8rem', lineHeight: 1 }}>
          {formatted}
        </span>
        <span className="font-sans text-sm text-graphite-light font-light">{unit}</span>
      </div>
      <span className="label-museum text-graphite-soft mt-1">ESTIMATED ADHERENTS</span>
    </div>
  )
}

interface ExhibitPanelProps {
  wv: Worldview
  onClose: () => void
}

function ExhibitPanel({ wv, onClose }: ExhibitPanelProps) {
  const [tab, setTab] = useState<Tab>('critique')
  const [counterTriggered, setCounterTriggered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCounterTriggered(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden col-span-full"
    >
      <div className="border border-graphite-border bg-white mt-px">
        <div className="flex items-center justify-between px-8 py-5 border-b border-graphite-border bg-linen">
          <div className="flex items-center gap-5">
            <div className="opacity-60 flex-shrink-0">
              <WorldviewSymbol svgKey={wv.symbol_svg_key} className="w-10 h-10" />
            </div>
            <div>
              <p className="label-museum text-graphite-soft mb-0.5">{wv.tradition} · {wv.founded}</p>
              <h2 className="font-serif font-bold text-2xl text-ink tracking-heading">{wv.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-2 label-museum text-graphite-soft hover:text-graphite transition-colors duration-200 flex-shrink-0"
            aria-label="Close exhibit"
          >
            CLOSE
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="flex border-b border-graphite-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-3 px-4 label-museum transition-colors duration-200 ${
                tab === t.key ? 'bg-ink text-white' : 'bg-white text-graphite-soft hover:bg-linen'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-8 lg:p-10 min-h-[280px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {tab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10">
                  <div>
                    <p className="font-sans text-sm text-graphite leading-relaxed mb-6">{wv.overview}</p>
                    <div>
                      <p className="label-museum text-graphite-soft mb-2">KEY TEXTS</p>
                      <ul className="space-y-1">
                        {wv.key_texts.map((t: string, i: number) => (
                          <li key={i} className="font-sans text-xs italic text-graphite-soft">{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 lg:border-l lg:border-graphite-border lg:pl-10">
                    {wv.adherents_count !== null ? (
                      <>
                        <AnimatedCounter
                          target={wv.adherents_count}
                          unit={wv.adherents_unit}
                          trigger={counterTriggered}
                        />
                        <div>
                          <div className="w-full h-px bg-graphite-border mb-2" />
                          <div className="relative h-1.5 bg-graphite-border rounded-full overflow-hidden">
                            <motion.div
                              className="absolute left-0 top-0 h-full bg-ink rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: counterTriggered
                                  ? `${Math.min((wv.adherents_unit === 'billion' ? wv.adherents_count * 1000 : wv.adherents_count) / 2400 * 100, 100)}%`
                                  : '0%'
                              }}
                              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                            />
                          </div>
                          <p className="label-museum text-graphite-soft mt-1.5">RELATIVE GLOBAL SHARE</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <p className="font-serif font-bold text-ink" style={{ fontSize: '1.4rem' }}>Diffuse</p>
                        <p className="label-museum text-graphite-soft">ESTIMATED ADHERENTS</p>
                        <p className="font-sans text-xs text-graphite-soft mt-2 leading-relaxed">
                          Secular humanism functions as a cultural default rather than a counted membership — its influence exceeds any fixed figure.
                        </p>
                      </div>
                    )}
                    <div className="border-t border-graphite-border pt-4">
                      <p className="label-museum text-graphite-soft mb-1">FOUNDED</p>
                      <p className="font-sans text-sm text-graphite">{wv.founded}</p>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'claims' && (
                <ul className="space-y-4 max-w-3xl">
                  {wv.core_claims.map((claim: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3, ease: 'easeOut' }}
                      className="flex gap-4 items-start"
                    >
                      <span className="font-serif font-bold text-graphite-border flex-shrink-0 mt-0.5 text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="font-sans text-sm text-graphite leading-relaxed">{claim}</p>
                    </motion.li>
                  ))}
                </ul>
              )}

              {tab === 'critique' && (
                <div className="max-w-3xl">
                  <div className="w-full h-px bg-crimson opacity-60 mb-6" />
                  <div className="flex items-center gap-2 mb-5">
                    <p className="label-museum text-graphite-soft">REFORMED CHRISTIAN CRITIQUE</p>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1,8 L5,2 L9,8" stroke="#C41E3A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="2.5" y1="6" x2="7.5" y2="6" stroke="#C41E3A" strokeWidth="0.7" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="font-sans text-sm text-graphite leading-relaxed">{wv.christian_critique}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

interface ExhibitCardProps {
  wv: Worldview
  index: number
  isOpen: boolean
  onToggle: () => void
}

function ExhibitCard({ wv, index, isOpen, onToggle }: ExhibitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className={`w-full text-left border transition-all duration-300 group ${
          isOpen ? 'border-ink bg-ink' : 'border-graphite-border bg-white hover:bg-linen'
        }`}
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Close' : 'Open'} ${wv.name} exhibit`}
      >
        <div className="p-6">
          <div className={`mb-4 transition-opacity duration-300 ${isOpen ? 'opacity-40' : 'opacity-50'}`}>
            <WorldviewSymbol svgKey={wv.symbol_svg_key} className="w-8 h-8" />
          </div>
          <p className={`label-museum mb-2 transition-colors duration-300 ${isOpen ? 'text-white opacity-50' : 'text-graphite-soft'}`}>
            {wv.tradition}
          </p>
          <h3 className={`font-serif font-bold text-lg tracking-heading mb-2 leading-snug transition-colors duration-300 ${isOpen ? 'text-white' : 'text-ink'}`}>
            {wv.name}
          </h3>
          <p className={`font-sans text-xs leading-relaxed transition-colors duration-300 ${isOpen ? 'text-white opacity-60' : 'text-graphite-soft'}`}>
            {wv.tagline}
          </p>
          <div className={`mt-5 pt-4 border-t flex items-center gap-2 transition-colors duration-300 ${isOpen ? 'border-white border-opacity-20' : 'border-graphite-border'}`}>
            <span className={`label-museum transition-colors duration-300 ${isOpen ? 'text-white opacity-60' : 'text-graphite-soft group-hover:text-graphite'}`}>
              {isOpen ? 'CLOSE' : 'ENTER EXHIBIT'}
            </span>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
            >
              <path d="M1 1L5 5L9 1" stroke={isOpen ? 'rgba(255,255,255,0.5)' : '#9A9A9A'} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export default function TheGallery() {
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenId(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  return (
    <div className="min-h-screen">
      <SectionHeader title="THE GALLERY" subtitle="Beliefs in Context." label="Section III" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
     <p className="font-sans text-sm text-graphite-light leading-body mb-12 max-w-xl">
  Eight major belief systems, each explained fairly on its own terms — then examined honestly
  from a Christian perspective. Click any panel to open it and explore what that worldview
  actually teaches, what it gets right, and where it falls short.
</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-graphite-border">
          {worldviews.map((wv, index) => (
            <>
              <div key={wv.id} className="bg-white">
                <ExhibitCard wv={wv} index={index} isOpen={openId === wv.id} onToggle={() => toggle(wv.id)} />
              </div>
              <AnimatePresence>
                {openId === wv.id && (
                  <ExhibitPanel key={`panel-${wv.id}`} wv={wv} onClose={() => setOpenId(null)} />
                )}
              </AnimatePresence>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
