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
    label: 'Islam',
    sublabel: '1.9 billion adherents',
    description: 'Challenges from Islamic theology — the Quran, Muhammad\'s credentials, the Trinity, tahrif, and the nature of God. Written for real conversations with Muslims.',
  },
  {
    id: 'atheism',
    label: 'Atheism & Naturalism',
    sublabel: '~1.2 billion',
    description: 'Objections from scientific naturalism and secular skepticism — evolution, the problem of evil, evidence for God, and moral grounding. Written for conversations with atheists and skeptics.',
  },
  {
    id: 'mormonism',
    label: 'Mormonism',
    sublabel: '~17 million',
    description: 'Challenges from Latter-day Saint theology — the nature of God, eternal progression, the restoration narrative, and the Book of Mormon. Written for conversations with LDS members.',
  },
  {
    id: 'jehovahs-witnesses',
    label: "Jehovah's Witnesses",
    sublabel: '~8.7 million',
    description: "Challenges from Watch Tower theology — the deity of Christ, the Trinity as alleged pagan invention, and the New World Translation. Written for conversations with Jehovah's Witnesses.",
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

function ReligionCard({
  religion,
  index,
  onSelect,
}: {
  religion: ReligionConfig
  index: number
  onSelect: (id: FieldGuideReligion) => void
}) {
  const [hovered, setHovered] = useState(false)

  const isIslam = religion.id === 'islam'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      style={{
        border: '1px solid rgba(45,45,45,0.12)',
        borderLeft: isIslam ? '2px solid #C41E3A' : '1px solid rgba(45,45,45,0.12)',
        borderTop: hovered && !religion.comingSoon
          ? '2px solid #C41E3A'
          : '1px solid rgba(45,45,45,0.12)',
        boxShadow: hovered && !religion.comingSoon
          ? '0 4px 24px rgba(0,0,0,0.07)'
          : 'none',
        transition: 'border-top 250ms ease-out, box-shadow 250ms ease-out',
        backgroundColor: '#ffffff',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <button
        onClick={() => !religion.comingSoon && onSelect(religion.id)}
        disabled={religion.comingSoon}
        className={`w-full text-left p-8 h-full ${
          religion.comingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            {isIslam && (
              <p className="type-label text-[#C41E3A] mb-1" style={{ fontSize: '0.65rem' }}>PRIMARY TRADITION</p>
            )}
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9A9A9A',
              }}
            >
              {religion.sublabel}
            </span>
          </div>
          {religion.comingSoon && (
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                border: '1px solid rgba(45,45,45,0.12)',
                color: '#9A9A9A',
              }}
            >
              Coming Soon
            </span>
          )}
        </div>

        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(45,45,45,0.08)',
            marginBottom: '1rem',
          }}
        />

        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 400,
            fontSize: '1.25rem',
            letterSpacing: '0.02em',
            color: religion.comingSoon ? '#9A9A9A' : '#1A1A1A',
            marginBottom: '0.75rem',
            lineHeight: 1.3,
          }}
        >
          {religion.label}
        </h2>

        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '0.85rem',
            color: '#9A9A9A',
            lineHeight: 1.7,
          }}
        >
          {religion.description}
        </p>

        {!religion.comingSoon && (
          <div
            className="mt-6 flex items-center gap-2"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 250ms ease-out',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9A9A9A',
              }}
            >
              OPEN
            </span>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
              <path d="M1 4H13M9 1L13 4L9 7" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </button>
    </motion.div>
  )
}

function ReligionSelector({ onSelect }: { onSelect: (r: FieldGuideReligion) => void }) {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="Field Guide"
        subtitle="When someone says it to you face to face."
        label="Reference"
      />

      <div className="max-w-2xl mx-auto px-5 pb-10 text-center">
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '0.875rem',
            color: '#9A9A9A',
            lineHeight: 1.7,
          }}
        >
          Select the worldview you are engaging with. You will see clear, concise responses
          to the challenges you are most likely to encounter.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-5 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RELIGIONS.map((religion, i) => (
            <ReligionCard
              key={religion.id}
              religion={religion}
              index={i}
              onSelect={onSelect}
            />
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
      style={{
        padding: '6px 12px',
        border: `1px solid ${active ? '#1A1A1A' : 'rgba(45,45,45,0.12)'}`,
        backgroundColor: active ? '#1A1A1A' : '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 400,
        fontSize: '0.6rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: active ? '#ffffff' : '#9A9A9A',
        cursor: 'pointer',
        transition: 'all 200ms ease-out',
      }}
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
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      style={{ borderBottom: '1px solid rgba(45,45,45,0.08)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(index * 0.04, 0.3) }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ x: hovered && !open ? 4 : 0 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        style={{
          borderLeft: `2px solid ${hovered || open ? '#C41E3A' : 'rgba(45,45,45,0.12)'}`,
          transition: 'border-left-color 320ms ease-out',
        }}
      >
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full text-left"
          aria-expanded={open}
        >
          <div className="px-5 py-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              {/* Challenge title */}
              <p
                className="prose-constrained"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: '#1A1A1A',
                  lineHeight: 1.4,
                  marginBottom: '0.3rem',
                }}
              >
                "{entry.challenge}"
              </p>
              {/* Response preview */}
              <p
                className="prose-constrained"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.85rem',
                  color: 'rgba(45,45,45,0.6)',
                  lineHeight: 1.6,
                }}
              >
                {entry.one_liner}
              </p>
            </div>

            {/* Tag + chevron */}
            <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
              <span
                className="type-caption"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  border: '1px solid rgba(45,45,45,0.12)',
                  color: 'rgba(45,45,45,0.5)',
                }}
              >
                {TAG_LABELS[entry.tag]}
              </span>
              <motion.svg
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="#9A9A9A"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </div>
        </button>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              style={{
                padding: '1.25rem 1.25rem 1.25rem 1.5rem',
                backgroundColor: '#FAF8F5',
                borderTop: '1px solid rgba(45,45,45,0.08)',
              }}
            >
              <div className="space-y-3">
                {entry.points.map((point, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        color: 'rgba(45,45,45,0.25)',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p
                      className="prose-constrained"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.875rem',
                        color: 'rgba(45,45,45,0.75)',
                        lineHeight: 1.7,
                      }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {entry.anchor_verse && (
                <div
                  style={{
                    paddingTop: '1rem',
                    marginTop: '1rem',
                    borderTop: '1px solid rgba(45,45,45,0.08)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(45,45,45,0.4)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    ANCHOR VERSE
                  </p>
                  <p
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: '0.875rem',
                      color: 'rgba(45,45,45,0.7)',
                      lineHeight: 1.6,
                    }}
                  >
                    "{entry.anchor_verse}"
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.75rem',
                      color: '#C41E3A',
                      marginTop: '0.25rem',
                    }}
                  >
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
        title="Field Guide"
        subtitle={config.label}
        label="Reference"
      />

      {/* Back button */}
      <div className="max-w-3xl mx-auto px-5 pb-8">
        <button
          onClick={onBack}
          className="type-label text-[#6B6B6B] hover:opacity-70 transition-opacity duration-300 mb-8 block"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          ← CHANGE TRADITION
        </button>

        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '0.875rem',
            color: '#9A9A9A',
            lineHeight: 1.7,
            maxWidth: '56ch',
          }}
        >
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
            style={{
              width: '100%',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              border: '1px solid rgba(45,45,45,0.12)',
              backgroundColor: '#ffffff',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '0.875rem',
              color: '#2D2D2D',
              outline: 'none',
              transition: 'border-color 200ms ease-out',
            }}
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

        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.75rem',
            color: '#9A9A9A',
          }}
        >
          {filtered.length} {filtered.length === 1 ? 'challenge' : 'challenges'}
          {activeTag !== 'all' ? ` in ${TAG_LABELS[activeTag]}` : ''}
          {search ? ` matching "${search}"` : ''}
        </p>
      </div>

      {/* Entry list */}
      <div className="max-w-3xl mx-auto px-5 pb-32">
        <div style={{ borderTop: '1px solid rgba(45,45,45,0.08)' }}>
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
