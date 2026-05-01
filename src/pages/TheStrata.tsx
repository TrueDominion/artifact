/**
 * src/pages/TheStrata.tsx
 * THE STRATA — The world Scripture was written into.
 * Five modules: Timeline | Empires | The Gods | The Tribes | Jesus's World
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import strataRaw from '@/data/strata.json'
import type {
  StrataData,
  StrataGod,
  JudaeaTier,
  JudaeaSurprise,
} from '@/types'

const strata = strataRaw as unknown as StrataData

type StrataModule = 'timeline' | 'empires' | 'gods' | 'tribes' | 'judaea'

const MODULES: { key: StrataModule; label: string }[] = [
  { key: 'timeline', label: 'TIMELINE'      },
  { key: 'empires',  label: 'EMPIRES'       },
  { key: 'gods',     label: 'THE GODS'      },
  { key: 'tribes',   label: 'THE TRIBES'    },
  { key: 'judaea',   label: "JESUS'S WORLD" },
]

const label: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: 400,
  fontSize: '0.6rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#9A9A9A',
}

const bodyLight: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: 300,
  fontSize: '0.82rem',
  color: '#4A4A4A',
  lineHeight: 1.75,
}

// ── Module navigation ────────────────────────────────────

function ModuleNav({
  active,
  onSelect,
}: {
  active: StrataModule
  onSelect: (m: StrataModule) => void
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
      <div
        className="flex border-b border-graphite-border overflow-x-auto"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {MODULES.map((m) => (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '14px 18px',
              color: active === m.key ? '#1A1A1A' : '#9A9A9A',
              borderBottom: active === m.key ? '2px solid #1A1A1A' : '2px solid transparent',
              background: 'none',
              border: 'none',
              borderBottom: active === m.key ? '2px solid #1A1A1A' : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap' as const,
              marginBottom: '-1px',
              transition: 'color 250ms ease-out, border-color 250ms ease-out',
            } as React.CSSProperties}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── TIMELINE MODULE ──────────────────────────────────────

function TimelineModule() {
  const { eras } = strata
  const [eraIndex, setEraIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const navigate = (next: number) => {
    if (next < 0 || next >= eras.length) return
    setDirection(next > eraIndex ? 1 : -1)
    setEraIndex(next)
  }

  const era = eras[eraIndex]

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir * 30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir * -20, opacity: 0 }),
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-32">

      {/* Progress + navigation */}
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div className="flex items-center gap-1.5">
          {eras.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Era ${i + 1}`}
              style={{
                height: '4px',
                width: i === eraIndex ? '24px' : '8px',
                borderRadius: '2px',
                backgroundColor:
                  i === eraIndex ? '#1A1A1A'
                  : i < eraIndex  ? '#9A9A9A'
                  : '#E8E8E8',
                transition: 'all 350ms ease-out',
                cursor: 'pointer',
                border: 'none',
                padding: 0,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => navigate(eraIndex - 1)}
            disabled={eraIndex === 0}
            style={{
              ...label,
              color: eraIndex === 0 ? '#E8E8E8' : '#9A9A9A',
              background: 'none',
              border: 'none',
              cursor: eraIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 200ms ease-out',
            }}
          >
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
              <path d="M13 4H1M5 1L1 4L5 7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            PREV
          </button>

          <span style={label}>ERA {eraIndex + 1} OF {eras.length}</span>

          <button
            onClick={() => navigate(eraIndex + 1)}
            disabled={eraIndex === eras.length - 1}
            style={{
              ...label,
              color: eraIndex === eras.length - 1 ? '#E8E8E8' : '#9A9A9A',
              background: 'none',
              border: 'none',
              cursor: eraIndex === eras.length - 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 200ms ease-out',
            }}
          >
            NEXT
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
              <path d="M1 4H13M9 1L13 4L9 7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Era content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={era.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.38, ease: 'easeOut' }}
        >
          {/* Era header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1.25rem',
              borderBottom: '1px solid #E8E8E8',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: '4rem',
                color: '#EEEEEE',
                lineHeight: 1,
                userSelect: 'none',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {String(era.number).padStart(2, '0')}
            </span>
            <div>
              <p style={{ ...label, marginBottom: '4px' }}>{era.dates}</p>
              <h2
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  color: '#1A1A1A',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                }}
              >
                {era.name}
              </h2>
            </div>
          </div>

          {/* Summary */}
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: '#4A4A4A',
              lineHeight: 1.85,
              marginBottom: '2.5rem',
            }}
          >
            {era.summary}
          </p>

          {/* Two columns: figures + powers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

            {/* Key figures */}
            <div>
              <p style={{ ...label, marginBottom: '1rem' }}>KEY FIGURES</p>
              <ul className="space-y-3">
                {era.key_figures.map((f) => (
                  <li
                    key={f.name}
                    style={{ borderBottom: '1px solid #F2F2F2', paddingBottom: '10px' }}
                  >
                    <span
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: '#1A1A1A',
                        display: 'block',
                      }}
                    >
                      {f.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 300,
                        fontSize: '0.78rem',
                        color: '#9A9A9A',
                        lineHeight: 1.55,
                      }}
                    >
                      {f.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dominant powers */}
            <div>
              <p style={{ ...label, marginBottom: '1rem' }}>DOMINANT POWERS</p>
              <div className="space-y-5">
                {era.dominant_powers.map((p) => (
                  <div key={p.name}>
                    <p
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        color: '#2D2D2D',
                        marginBottom: '4px',
                      }}
                    >
                      {p.name}
                    </p>
                    <p style={{ ...bodyLight, fontSize: '0.78rem', color: '#9A9A9A' }}>
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Religious flashpoint */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: '#FAF8F5',
              marginBottom: '2.5rem',
            }}
          >
            <div
              style={{
                width: '2px',
                flexShrink: 0,
                backgroundColor: '#C41E3A',
                borderRadius: '2px',
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C41E3A',
                  marginBottom: '6px',
                }}
              >
                RELIGIOUS FLASHPOINT
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  color: '#2D2D2D',
                  marginBottom: '6px',
                }}
              >
                {era.religious_flashpoint.title}
              </p>
              <p style={bodyLight}>{era.religious_flashpoint.description}</p>
            </div>
          </div>

          {/* Defining moment */}
          <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: '2rem' }}>
            <p style={{ ...label, marginBottom: '1rem' }}>DEFINING MOMENT</p>
            <p
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#4A4A4A',
                lineHeight: 1.85,
              }}
            >
              {era.defining_moment}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── EMPIRES MODULE ───────────────────────────────────────

function EmpiresModule() {
  const { empires } = strata

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
      <p
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: '#9A9A9A',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          maxWidth: '60ch',
        }}
      >
        Seven superpowers that ruled, invaded, or dominated Israel — what each one did and why Israel was always in their crosshairs.
      </p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ backgroundColor: '#E8E8E8' }}
      >
        {empires.map((empire, i) => (
          <motion.div
            key={empire.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.06 }}
            style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#FAF8F5' }}
          >
            <div style={{ padding: '1.75rem' }}>
              <p style={{ ...label, marginBottom: '4px' }}>{empire.dates}</p>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  color: '#1A1A1A',
                  marginBottom: '1rem',
                  lineHeight: 1.1,
                }}
              >
                {empire.name}
              </h3>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#E8E8E8', marginBottom: '1rem' }} />
              <p style={{ ...bodyLight, marginBottom: '1.25rem' }}>{empire.impact}</p>
              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #F0F0F0' }}>
                <p
                  style={{
                    ...label,
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    marginBottom: '4px',
                  }}
                >
                  RELIGION
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 300,
                    fontSize: '0.75rem',
                    color: '#9A9A9A',
                    fontStyle: 'italic',
                    lineHeight: 1.55,
                  }}
                >
                  {empire.gods}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── GODS MODULE ──────────────────────────────────────────

function GodEntry({
  god,
  index,
  isOpen,
  onToggle,
}: {
  god: StrataGod
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.article
      style={{ borderBottom: '1px solid #E8E8E8' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'}: ${god.name}`}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '1.25rem 0',
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '4px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#1A1A1A',
                }}
              >
                {god.name}
              </span>
              <span
                style={{
                  ...label,
                  fontSize: '0.55rem',
                  border: '1px solid #E8E8E8',
                  padding: '2px 8px',
                }}
              >
                {god.origin}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                fontSize: '0.8rem',
                color: '#9A9A9A',
                lineHeight: 1.6,
                paddingRight: '2rem',
              }}
            >
              {god.represents.split('.')[0]}.
            </p>
          </div>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            style={{ flexShrink: 0, marginTop: '6px' }}
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
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0.75rem 1rem 1.5rem',
                backgroundColor: '#FAF8F5',
                marginBottom: '2px',
              }}
            >
              <p style={{ ...bodyLight, marginBottom: '1.25rem' }}>{god.represents}</p>
              <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: '1.25rem' }}>
                <p
                  style={{
                    ...label,
                    fontSize: '0.55rem',
                    color: '#C41E3A',
                    marginBottom: '0.75rem',
                  }}
                >
                  THE BIBLICAL CONFRONTATION
                </p>
                <p style={bodyLight}>{god.confrontation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function GodsModule() {
  const { gods } = strata
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-32">
      <p
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: '#9A9A9A',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}
      >
        The foreign gods that Israel kept chasing — what each represented and the key biblical moment where the contest became visible.
      </p>

      <div style={{ borderTop: '1px solid #E8E8E8' }}>
        {gods.map((god, i) => (
          <GodEntry
            key={god.id}
            god={god}
            index={i}
            isOpen={openId === god.id}
            onToggle={() => setOpenId((prev) => (prev === god.id ? null : god.id))}
          />
        ))}
      </div>
    </div>
  )
}

// ── TRIBES MODULE ────────────────────────────────────────

function TribesModule() {
  const { north, south, priestly } = strata.tribes

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 pb-32">
      <p
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: '#9A9A9A',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          maxWidth: '60ch',
        }}
      >
        Jacob's twelve sons became twelve tribes — each with their own territory, story, and fate. When the kingdom split after Solomon, the tribes divided along these lines.
      </p>

      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-px"
        style={{ backgroundColor: '#E8E8E8' }}
      >
        {/* Northern Kingdom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ backgroundColor: '#ffffff' }}
        >
          <div style={{ padding: '1.75rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ ...label, marginBottom: '4px' }}>Northern Kingdom</p>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  color: '#1A1A1A',
                  lineHeight: 1.1,
                }}
              >
                Israel
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.75rem',
                  color: '#9A9A9A',
                  marginTop: '2px',
                }}
              >
                Fell to Assyria, 722 BCE
              </p>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#E8E8E8', marginBottom: '1.25rem' }} />
            <ul className="space-y-3">
              {north.map((t) => (
                <li key={t.name}>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.82rem',
                      color: '#2D2D2D',
                      display: 'block',
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.72rem',
                      color: '#9A9A9A',
                      lineHeight: 1.55,
                    }}
                  >
                    {t.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Southern Kingdom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}
          style={{ backgroundColor: '#FAF8F5' }}
        >
          <div style={{ padding: '1.75rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ ...label, marginBottom: '4px' }}>Southern Kingdom</p>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  color: '#1A1A1A',
                  lineHeight: 1.1,
                }}
              >
                Judah
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.75rem',
                  color: '#9A9A9A',
                  marginTop: '2px',
                }}
              >
                Fell to Babylon, 586 BCE
              </p>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#E8E8E8', marginBottom: '1.25rem' }} />
            <ul className="space-y-3">
              {south.map((t) => (
                <li key={t.name}>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.82rem',
                      color: '#2D2D2D',
                      display: 'block',
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.72rem',
                      color: '#9A9A9A',
                      lineHeight: 1.55,
                    }}
                  >
                    {t.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Priestly tribe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.16 }}
          style={{ backgroundColor: '#ffffff' }}
        >
          <div style={{ padding: '1.75rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ ...label, marginBottom: '4px' }}>Priestly Tribe</p>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  color: '#1A1A1A',
                  lineHeight: 1.1,
                }}
              >
                Levi
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.75rem',
                  color: '#9A9A9A',
                  marginTop: '2px',
                }}
              >
                No territorial inheritance
              </p>
            </div>
            <div style={{ width: '100%', height: '1px', backgroundColor: '#E8E8E8', marginBottom: '1.25rem' }} />
            <ul className="space-y-3">
              {priestly.map((t) => (
                <li key={t.name}>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.82rem',
                      color: '#2D2D2D',
                      display: 'block',
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.72rem',
                      color: '#9A9A9A',
                      lineHeight: 1.55,
                    }}
                  >
                    {t.note}
                  </span>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E8E8E8',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 300,
                  fontSize: '0.72rem',
                  color: '#9A9A9A',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                }}
              >
                Jacob had 12 sons, but Joseph's two sons — Ephraim and Manasseh — each received their own territory. With Levi serving across all tribes, the count stays at 12 tribal lands.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ── JUDAEA MODULE ────────────────────────────────────────

const TIER_BG   = ['#1A1A1A', '#2D2D2D', '#FAF8F5', '#F5F3F0', '#ffffff']
const TIER_TEXT = ['#ffffff', '#ffffff', '#1A1A1A', '#1A1A1A', '#1A1A1A']
const TIER_SUB  = [
  'rgba(255,255,255,0.45)',
  'rgba(255,255,255,0.45)',
  '#9A9A9A',
  '#9A9A9A',
  '#9A9A9A',
]
const TIER_PAD  = ['0 14%', '0 9%', '0 4%', '0 1%', '0']

function JudaeaTierCard({
  tier,
  index,
  isOpen,
  onToggle,
}: {
  tier: JudaeaTier
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.07 }}
      style={{ padding: TIER_PAD[index], marginBottom: '2px' }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={isOpen}
        style={{
          backgroundColor: TIER_BG[index],
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: TIER_SUB[index],
              marginBottom: '3px',
            }}
          >
            TIER {tier.level} · {tier.subtitle}
          </p>
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: '1rem',
              color: TIER_TEXT[index],
            }}
          >
            {tier.name}
          </p>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke={TIER_TEXT[index]}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.45}
          />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem 1.5rem',
                backgroundColor: '#FAF8F5',
                borderBottom: '1px solid #E8E8E8',
              }}
            >
              <p style={{ ...bodyLight, marginBottom: '1rem' }}>{tier.description}</p>
              <div>
                <p style={{ ...label, fontSize: '0.55rem', marginBottom: '6px' }}>
                  KEY FIGURES
                </p>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {tier.figures.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontSize: '0.72rem',
                        fontWeight: 300,
                        color: '#9A9A9A',
                        border: '1px solid #E8E8E8',
                        padding: '3px 8px',
                        fontStyle: 'italic',
                        listStyle: 'none',
                      }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function JudaeaModule() {
  const { tiers, surprises } = strata.judaea
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-32">
      <p
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: '#9A9A9A',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}
      >
        Five layers of authority in the world Jesus moved through — from Rome at the top to ordinary people at the base. Tap any layer to learn who held power and why.
      </p>

      {/* Power pyramid */}
      <div style={{ marginBottom: '3.5rem' }}>
        {tiers.map((tier, i) => (
          <JudaeaTierCard
            key={tier.id}
            tier={tier}
            index={i}
            isOpen={openId === tier.id}
            onToggle={() =>
              setOpenId((prev) => (prev === tier.id ? null : tier.id))
            }
          />
        ))}
      </div>

      {/* Surprises */}
      <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: '2.5rem' }}>
        <p style={{ ...label, marginBottom: '1.5rem' }}>
          THREE THINGS THAT WILL SURPRISE YOU
        </p>
        <div className="space-y-6">
          {surprises.map((s: JudaeaSurprise, i: number) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: '0.6rem',
                  color: '#E8E8E8',
                  flexShrink: 0,
                  paddingTop: '3px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.88rem',
                    color: '#1A1A1A',
                    marginBottom: '5px',
                  }}
                >
                  {s.title}
                </p>
                <p style={bodyLight}>{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Root ─────────────────────────────────────────────────

export default function TheStrata() {
  const [activeModule, setActiveModule] = useState<StrataModule>('timeline')

  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE STRATA"
        subtitle="The world Scripture was written into."
        label="Historical Record"
        intro="Ten eras, seven empires, twelve tribes, and the gods Israel kept chasing. This is the ground beneath the text."
      />

      <ModuleNav active={activeModule} onSelect={setActiveModule} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {activeModule === 'timeline' && <TimelineModule />}
          {activeModule === 'empires'  && <EmpiresModule />}
          {activeModule === 'gods'     && <GodsModule />}
          {activeModule === 'tribes'   && <TribesModule />}
          {activeModule === 'judaea'   && <JudaeaModule />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
