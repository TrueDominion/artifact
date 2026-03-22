/**
 * src/pages/FieldGuide.tsx
 * THE FIELD GUIDE — Rapid-reference apologetics for real conversations.
 * Mobile-first. Search by challenge text. Filter by tag.
 * Each card: the challenge heard → one-liner response → supporting points.
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import fieldGuideData from '@/data/fieldguide.json'
import type { FieldGuideEntry, FieldGuideTag } from '@/types'

const entries = fieldGuideData as FieldGuideEntry[]

const TAG_LABELS: Record<FieldGuideTag, string> = {
  scripture:  'Scripture',
  jesus:      'Jesus',
  trinity:    'Trinity',
  salvation:  'Salvation',
  muhammad:   'Muhammad',
  quran:      'Quran',
  history:    'History',
  logic:      'Logic',
}

const ALL_TAGS = Object.keys(TAG_LABELS) as FieldGuideTag[]

function TagPill({
  tag,
  active,
  onClick,
}: {
  tag: FieldGuideTag | 'all'
  active: boolean
  onClick: () => void
}) {
  const label = tag === 'all' ? 'ALL' : TAG_LABELS[tag].toUpperCase()
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 border font-sans text-[0.6rem] tracking-widest uppercase transition-colors duration-200 ${
        active
          ? 'bg-ink text-white border-ink'
          : 'bg-white text-graphite-soft border-graphite-border hover:border-graphite hover:text-graphite'
      }`}
    >
      {label}
    </button>
  )
}

function EntryCard({
  entry,
  index,
}: {
  entry: FieldGuideEntry
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.article
      className="border-b border-graphite-border"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: Math.min(index * 0.04, 0.3) }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div
          className={`px-5 py-5 flex gap-4 items-start transition-colors duration-200 ${
            open ? 'bg-ink' : 'bg-white hover:bg-linen'
          }`}
        >
          {/* Tag pill */}
          <span
            className={`flex-shrink-0 mt-0.5 font-sans text-[0.55rem] uppercase tracking-widest px-1.5 py-0.5 border ${
              open
                ? 'border-white border-opacity-20 text-white text-opacity-50'
                : 'border-graphite-border text-graphite-soft'
            }`}
          >
            {TAG_LABELS[entry.tag]}
          </span>

          {/* Challenge text */}
          <p
            className={`flex-1 font-serif font-bold text-base leading-snug tracking-heading transition-colors duration-200 ${
              open ? 'text-white' : 'text-ink'
            }`}
          >
            "{entry.challenge}"
          </p>

          {/* Chevron */}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 mt-1"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke={open ? 'rgba(255,255,255,0.4)' : '#9A9A9A'}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 py-6 bg-white border-t border-graphite-border space-y-5">

              {/* One-liner */}
              <div className="flex gap-3">
                <div className="w-0.5 flex-shrink-0 bg-crimson rounded-full" />
                <p className="font-sans text-sm font-medium text-graphite leading-relaxed">
                  {entry.one_liner}
                </p>
              </div>

              {/* Supporting points */}
              <div className="space-y-3 pl-3">
                {entry.points.map((point, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="font-serif font-bold text-graphite-border flex-shrink-0 text-xs mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="font-sans text-sm text-graphite-light leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* Anchor verse */}
              {entry.anchor_verse && (
                <div className="pt-4 border-t border-graphite-border">
                  <p className="font-sans text-[0.6rem] uppercase tracking-widest text-graphite-soft mb-2">
                    ANCHOR VERSE
                  </p>
                  <p className="font-serif italic text-sm text-graphite leading-relaxed">
                    "{entry.anchor_verse}"
                  </p>
                  <p className="font-sans text-xs text-crimson mt-1">
                    — {entry.anchor_verse_ref}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function FieldGuide() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<FieldGuideTag | 'all'>('all')

  const filtered = useMemo(() => {
  const q = search.trim().toLowerCase()
  return entries
    .filter(e => {
      const matchesTag = activeTag === 'all' || e.tag === activeTag
      const matchesSearch =
        !q ||
        e.challenge.toLowerCase().includes(q) ||
        e.one_liner.toLowerCase().includes(q) ||
        e.points.some(p => p.toLowerCase().includes(q))
      return matchesTag && matchesSearch
    })
    .sort((a, b) => (a.priority ?? 3) - (b.priority ?? 3))
}, [search, activeTag])

  return (
    <div className="min-h-screen">
      <SectionHeader
        title="FIELD GUIDE"
        subtitle="When someone says it to you face to face."
        label="Reference"
      />

      {/* Intent statement */}
      <div className="max-w-2xl mx-auto px-5 pb-10 text-center">
        <p className="font-sans text-sm text-graphite-light leading-relaxed">
          Twenty challenges you will actually hear — each with a one-line response and the
          supporting evidence behind it. Built for real conversations, not lecture halls.
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="max-w-3xl mx-auto px-5 pb-8 space-y-4">
        {/* Search input */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="5" stroke="#2D2D2D" strokeWidth="1" />
            <path d="M10 10L13 13" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search challenges..."
            className="w-full pl-10 pr-4 py-3 border border-graphite-border bg-white font-sans text-sm text-graphite placeholder:text-graphite-border outline-none focus:border-graphite transition-colors duration-200"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
              aria-label="Clear search"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="1" y1="1" x2="9" y2="9" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
                <line x1="9" y1="1" x2="1" y2="9" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          <TagPill
            tag="all"
            active={activeTag === 'all'}
            onClick={() => setActiveTag('all')}
          />
          {ALL_TAGS.map(tag => (
            <TagPill
              key={tag}
              tag={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>

        {/* Result count */}
        <p className="font-sans text-xs text-graphite-soft">
          {filtered.length} {filtered.length === 1 ? 'challenge' : 'challenges'}
          {activeTag !== 'all' ? ` in ${TAG_LABELS[activeTag]}` : ''}
          {search ? ` matching "${search}"` : ''}
        </p>
      </div>

      {/* Entry list */}
      <div className="max-w-3xl mx-auto px-5 pb-32">
        <div className="border-t border-graphite-border">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((entry, i) => (
                <EntryCard key={entry.id} entry={entry} index={i} />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="font-serif italic text-graphite-soft">No challenges found.</p>
                <button
                  onClick={() => { setSearch(''); setActiveTag('all') }}
                  className="mt-4 font-sans text-xs text-graphite-soft underline hover:text-graphite transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
