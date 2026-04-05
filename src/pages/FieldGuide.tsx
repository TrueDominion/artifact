/**
 * src/pages/FieldGuide.tsx
 * THE FIELD GUIDE — Rapid-reference apologetics for real conversations.
 * Step 1: Select a religion. Step 2: Browse challenges and responses.
 * Mobile-first. Search by challenge text. Filter by tag.
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import fieldGuideData from '@/data/fieldguide.json'
import type { FieldGuideEntry, FieldGuideTag, FieldGuideReligion } from '@/types'

const entries = fieldGuideData as FieldGuideEntry[]

// ── Religion config ────────────────────────────────────────

interface ReligionConfig {
  id: FieldGuideReligion
  label: string
  sublabel: string
  description: string
  comingSoon?: boolean
}

const RELIGIONS: ReligionConfig[] = [
  {
    id: 'islam',
    label: 'ISLAM',
    sublabel: '1.9 billion adherents',
    description: 'Challenges from Islamic theology — the Quran, Muhammad\'s credentials, the Trinity, tahrif, and the nature of God. Written for real conversations with Muslims.',
  },
  {
    id: 'atheism',
    label: 'ATHEISM & NATURALISM',
    sublabel: '~1.2 billion',
    description: 'Objections from scientific naturalism and secular skepticism — evolution, the problem of evil, evidence for God, and moral grounding. Written for conversations with atheists and skeptics.',
  },
  {
    id: 'mormonism',
    label: 'MORMONISM',
    sublabel: '~17 million',
    description: 'Challenges from Latter-day Saint theology — the nature of God, eternal progression, the restoration narrative, and the Book of Mormon. Written for conversations with LDS members.',
    comingSoon: true,
  },
  {
    id: 'jehovahs-witnesses',
    label: "JEHOVAH'S WITNESSES",
    sublabel: '~8.7 million',
    description: "Challenges from Watch Tower theology — the deity of Christ, the Trinity as alleged pagan invention, and the New World Translation. Written for conversations with Jehovah's Witnesses.",
    comingSoon: true,
  },
]

// ── Tag config ─────────────────────────────────────────────

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

// ── Religion selector ──────────────────────────────────────

function ReligionSelector({ onSelect }: { onSelect: (r: FieldGuideReligion) => void }) {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="FIELD GUIDE"
        subtitle="When someone says it to you face to face."
        label="Reference"
      />

      <div className="max-w-2xl mx-auto px-5 pb-10 text-center">
        <p className="font-sans text-sm text-graphite-light leading-relaxed">
          Select the worldview you are engaging with. You will see clear, concise responses
          to the challenges you are most likely to encounter.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-5 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-graphite-border">
          {RELIGIONS.map((religion, i) => (
            <motion.div
              key={religion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
              className="bg-white"
            >
              <button
                onClick={() => !religion.comingSoon && onSelect(religion.id)}
                disabled={religion.comingSoon}
                className={`w-full text-left p-8 h-full group transition-colors duration-300 ${
                  religion.comingSoon
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-linen cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-sans text-[0.6rem] uppercase tracking-widest text-graphite-soft">
                    {religion.sublabel}
                  </span>
                  {religion.comingSoon && (
                    <span className="font-sans text-[0.55rem] uppercase tracking-widest px-2 py-0.5 border border-graphite-border text-graphite-soft">
                      Coming Soon
                    </span>
                  )}
                </div>

                <hr className="border-graphite-border mb-4" />

                <h2 className={`font-serif font-bold text-xl tracking-heading mb-3 transition-colors duration-300 ${
                  religion.comingSoon ? 'text-graphite-light' : 'text-ink group-hover:text-graphite'
                }`}>
                  {religion.label}
                </h2>
                <p className="font-sans text-sm text-graphite-light leading-relaxed">
                  {religion.description}
                </p>

                {!religion.comingSoon && (
                  <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-sans text-[0.6rem] uppercase tracking-widest text-graphite-soft">OPEN</span>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                      <path d="M1 4H13M9 1L13 4L9 7" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tag pill ───────────────────────────────────────────────

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

// ── Entry card ─────────────────────────────────────────────

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
          <span
            className={`flex-shrink-0 mt-0.5 font-sans text-[0.55rem] uppercase tracking-widest px-1.5 py-0.5 border ${
              open
                ? 'border-white border-opacity-20 text-white text-opacity-50'
                : 'border-graphite-border text-graphite-soft'
            }`}
          >
            {TAG_LABELS[entry.tag]}
          </span>

          <p
            className={`flex-1 font-serif font-bold text-base leading-snug tracking-heading transition-colors duration-200 ${
              open ? 'text-white' : 'text-ink'
            }`}
          >
            "{entry.challenge}"
          </p>

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
              <div className="flex gap-3">
                <div className="w-0.5 flex-shrink-0 bg-crimson rounded-full" />
                <p className="font-sans text-sm font-medium text-graphite leading-relaxed">
                  {entry.one_liner}
                </p>
              </div>

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

// ── Guide view (post-selection) ────────────────────────────

function GuideView({
  religion,
  onBack,
}: {
  religion: FieldGuideReligion
  onBack: () => void
}) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<FieldGuideTag | 'all'>('all')

  const config = RELIGIONS.find(r => r.id === religion)!

  const religionEntries = useMemo(
    () => entries.filter(e => e.religion === religion),
    [religion]
  )

  const availableTags = useMemo(
    () => ALL_TAGS.filter(tag => religionEntries.some(e => e.tag === tag)),
    [religionEntries]
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return religionEntries
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
  }, [search, activeTag, religionEntries])

  return (
    <div className="min-h-screen">
      <SectionHeader
        title="FIELD GUIDE"
        subtitle={config.label}
        label="Reference"
      />

      {/* Back button + intent */}
      <div className="max-w-3xl mx-auto px-5 pb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-xs text-graphite-soft hover:text-graphite transition-colors duration-200 mb-6"
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M13 4H1M5 1L1 4L5 7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="uppercase tracking-widest">Choose a different religion</span>
        </button>

        <p className="font-sans text-sm text-graphite-light leading-relaxed max-w-2xl">
          {config.description} Each entry gives you a one-line response and the evidence behind it.
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="max-w-3xl mx-auto px-5 pb-8 space-y-4">
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

        <div className="flex flex-wrap gap-2">
          <TagPill
            tag="all"
            active={activeTag === 'all'}
            onClick={() => setActiveTag('all')}
          />
          {availableTags.map(tag => (
            <TagPill
              key={tag}
              tag={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>

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

// ── Root component ─────────────────────────────────────────

export default function FieldGuide() {
  const [selectedReligion, setSelectedReligion] = useState<FieldGuideReligion | null>(null)

  return (
    <AnimatePresence mode="wait">
      {selectedReligion === null ? (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ReligionSelector onSelect={setSelectedReligion} />
        </motion.div>
      ) : (
        <motion.div
          key={selectedReligion}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GuideView
            religion={selectedReligion}
            onBack={() => setSelectedReligion(null)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
