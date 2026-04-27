/**
 * src/components/home/SectionPreview.tsx
 * Two-tier homepage layout.
 * EQUIP: Field Guide + Faultlines — action sections, persistent crimson border,
 *        always-visible affordance for mobile users.
 * EXPLORE: Bedrock, The Dig, The Gallery — learning sections, hover treatment.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface PreviewCardData {
  label: string
  path: string
  description: string
  sublabel: string
  iconIndex: number
}

const equipPreviews: PreviewCardData[] = [
  {
    label: 'FIELD GUIDE',
    path: '/field-guide',
    description: 'Real objections from Islam, atheism, and other worldviews — select a tradition and get direct answers to the challenges you are most likely to hear in conversation.',
    sublabel: 'Quick Reference',
    iconIndex: 4,
  },
  {
    label: 'FAULTLINES',
    path: '/faultlines',
    description: 'Eight Islamic challenges to Christian faith — each stated in its strongest form and answered with historical evidence, textual analysis, and logical argument.',
    sublabel: 'Challenges',
    iconIndex: 3,
  },
]

const explorePreviews: PreviewCardData[] = [
  {
    label: 'BEDROCK',
    path: '/bedrock',
    description: 'Seven non-negotiable foundations of Christian faith — what each means, why it cannot be abandoned, and where it stands in direct contrast to Islamic theology.',
    sublabel: 'Foundation',
    iconIndex: 0,
  },
  {
    label: 'THE DIG',
    path: '/the-dig',
    description: 'Eight arguments for God\'s existence and the truth of Christianity — examined through claim, logic, strongest objection, and response.',
    sublabel: 'Arguments',
    iconIndex: 1,
  },
  {
    label: 'THE GALLERY',
    path: '/the-gallery',
    description: 'Eight worldviews examined fairly on their own terms — what each teaches, where it has genuine insight, and where the Christian account is more coherent.',
    sublabel: 'Worldviews',
    iconIndex: 2,
  },
]

function PreviewIcon({ index }: { index: number }) {
  const icons = [
    <svg key={0} viewBox="0 0 28 28" fill="none" className="w-6 h-6">
      <rect x="4" y="16" width="20" height="8" stroke="#2D2D2D" strokeWidth="0.9" rx="1"/>
      <path d="M8,16 L8,10 L20,10 L20,16" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>,
    <svg key={1} viewBox="0 0 28 28" fill="none" className="w-6 h-6">
      <path d="M14,22 L20,8 L8,8 Z" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="14" y1="8" x2="14" y2="4" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>,
    <svg key={2} viewBox="0 0 28 28" fill="none" className="w-6 h-6">
      <path d="M6,22 L6,12 Q14,4 22,12 L22,22" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="4" y1="22" x2="24" y2="22" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>,
    <svg key={3} viewBox="0 0 28 28" fill="none" className="w-6 h-6">
      <path d="M4,14 L10,10 L18,18 L24,14" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="4" y1="20" x2="24" y2="20" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
    </svg>,
    <svg key={4} viewBox="0 0 28 28" fill="none" className="w-6 h-6">
      <ellipse cx="14" cy="8" rx="5" ry="6" stroke="#2D2D2D" strokeWidth="0.9"/>
      <path d="M10,14 L8,22 L20,22 L18,14" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  ]
  return icons[index] ?? icons[0]
}

function GroupLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <span className="label-museum text-graphite-soft flex-shrink-0">{text}</span>
      <div className="flex-1 h-px bg-graphite-border" />
    </div>
  )
}

function EquipCard({ preview, delay }: { preview: PreviewCardData; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className="relative bg-linen group"
    >
      {/* Persistent crimson top accent — always visible, not hover-gated */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-crimson pointer-events-none z-10"
        aria-hidden="true"
      />

      <Link
        to={preview.path}
        className="block p-8 lg:p-10 h-full"
        style={{ transition: 'background-color 400ms ease-out' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F3F0')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
      >
        <div className="flex items-start justify-between mb-6">
          <span className="label-museum text-graphite-soft">{preview.sublabel}</span>
          <div className="opacity-50 group-hover:opacity-80 transition-opacity duration-300">
            <PreviewIcon index={preview.iconIndex} />
          </div>
        </div>

        <hr className="rule-graphite mb-6" />

        <h2 className="font-serif font-bold text-2xl text-ink mb-3 tracking-heading group-hover:text-graphite transition-colors duration-300">
          {preview.label}
        </h2>
        <p className="font-sans text-sm text-graphite-light leading-relaxed">
          {preview.description}
        </p>

        {/* Always-visible affordance — essential on mobile where hover doesn't exist */}
        <div className="mt-6 flex items-center gap-2">
          <span className="label-museum text-graphite-soft group-hover:text-graphite transition-colors duration-300">
            ENTER
          </span>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M1 4H13M9 1L13 4L9 7" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

function ExploreCard({ preview, delay }: { preview: PreviewCardData; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className="relative bg-white group"
    >
      {/* Hover-only crimson top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none z-10"
        aria-hidden="true"
      />

      <Link
        to={preview.path}
        className="block p-8 lg:p-10 h-full hover:bg-linen transition-colors duration-400"
      >
        <div className="flex items-start justify-between mb-6">
          <span className="label-museum text-graphite-soft">{preview.sublabel}</span>
          <div className="opacity-40 group-hover:opacity-70 transition-opacity duration-300">
            <PreviewIcon index={preview.iconIndex} />
          </div>
        </div>

        <hr className="rule-graphite mb-6" />

        <h2 className="font-serif font-bold text-2xl text-ink mb-3 tracking-heading group-hover:text-graphite transition-colors duration-300">
          {preview.label}
        </h2>
        <p className="font-sans text-sm text-graphite-light leading-relaxed">
          {preview.description}
        </p>

        {/* Reduced-opacity default so mobile users still see an affordance */}
        <div className="mt-6 flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
          <span className="label-museum text-graphite-soft">ENTER</span>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M1 4H13M9 1L13 4L9 7" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

export default function SectionPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">

      <div className="flex items-center gap-6 mb-4">
        <hr className="rule-graphite flex-1" />
        <span className="label-museum">THE EXHIBITION FLOOR</span>
        <hr className="rule-graphite flex-1" />
      </div>

      {/* EQUIP — action sections */}
      <div className="mb-px">
        <GroupLabel text="EQUIP" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-graphite-border">
          {equipPreviews.map((preview, i) => (
            <EquipCard key={preview.path} preview={preview} delay={i * 0.08} />
          ))}
        </div>
      </div>

      {/* EXPLORE — learning sections */}
      <div>
        <GroupLabel text="EXPLORE" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite-border">
          {explorePreviews.map((preview, i) => (
            <ExploreCard key={preview.path} preview={preview} delay={i * 0.08} />
          ))}
        </div>
      </div>

    </section>
  )
}
