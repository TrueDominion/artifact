/**
 * src/components/home/SectionPreview.tsx
 * Six section preview cards displayed below the hero on the homepage.
 * Each card: section name (serif), one-line description, thin rule, SVG icon.
 * Scroll-reveal: fade + translateY, staggered 100ms per card.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface PreviewCardData {
  label: string
  path: string
  description: string
  sublabel: string
}

const previews: PreviewCardData[] = [
  {
    label: 'BEDROCK',
    path: '/bedrock',
    description: 'The immovable doctrines at the foundation of Christian belief.',
    sublabel: 'Foundation',
  },
  {
    label: 'THE DIG',
    path: '/the-dig',
    description: 'Philosophical arguments excavated, structured, and examined.',
    sublabel: 'Arguments',
  },
  {
    label: 'THE GALLERY',
    path: '/the-gallery',
    description: 'Competing worldviews displayed in context — and in critique.',
    sublabel: 'Worldviews',
  },
  {
    label: 'THE STUDIO',
    path: '/the-studio',
    description: 'The atelier of reasoning: build your own argument step by step.',
    sublabel: 'Workshop',
  },
  {
    label: 'FAULTLINES',
    path: '/faultlines',
    description: 'Where the ground breaks — honest engagement with hard challenges.',
    sublabel: 'Debates',
  },
  {
    label: 'THE COLLECTION',
    path: '/the-collection',
    description: 'Thinkers and intellectual history across twenty centuries.',
    sublabel: 'Thinkers',
  },
]

// Small artifact icon for each preview card
function PreviewIcon({ index }: { index: number }) {
  const icons = [
    // Foundation slab
    <svg key={0} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><rect x="4" y="16" width="20" height="8" stroke="#2D2D2D" strokeWidth="0.9" rx="1"/><path d="M8,16 L8,10 L20,10 L20,16" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/></svg>,
    // Trowel
    <svg key={1} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><path d="M14,22 L20,8 L8,8 Z" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="8" x2="14" y2="4" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/></svg>,
    // Arch
    <svg key={2} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><path d="M6,22 L6,12 Q14,4 22,12 L22,22" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/><line x1="4" y1="22" x2="24" y2="22" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/></svg>,
    // Compass
    <svg key={3} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><circle cx="14" cy="14" r="10" stroke="#2D2D2D" strokeWidth="0.9"/><path d="M14,6 L15.5,14 L14,22 L12.5,14 Z" stroke="#2D2D2D" strokeWidth="0.8"/></svg>,
    // Fault line
    <svg key={4} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><path d="M4,14 L10,10 L18,18 L24,14" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/><line x1="4" y1="20" x2="24" y2="20" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/></svg>,
    // Pedestal
    <svg key={5} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><ellipse cx="14" cy="8" rx="5" ry="6" stroke="#2D2D2D" strokeWidth="0.9"/><path d="M10,14 L8,22 L20,22 L18,14" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ]
  return icons[index] ?? icons[0]
}

export default function SectionPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Separator */}
      <div className="flex items-center gap-6 mb-16">
        <hr className="rule-graphite flex-1" />
        <span className="label-museum">THE EXHIBITION FLOOR</span>
        <hr className="rule-graphite flex-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-graphite-border">
        {previews.map((preview, i) => (
          <motion.div
            key={preview.path}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            className="bg-white"
          >
            <Link
              to={preview.path}
              className="block p-8 lg:p-10 h-full group hover:bg-linen transition-colors duration-400"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="label-museum text-graphite-soft">{preview.sublabel}</span>
                <div className="opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                  <PreviewIcon index={i} />
                </div>
              </div>

              <hr className="rule-graphite mb-6" />

              <h2 className="font-serif font-bold text-2xl text-ink mb-3 tracking-heading group-hover:text-graphite transition-colors duration-300">
                {preview.label}
              </h2>
              <p className="font-sans text-sm text-graphite-light leading-relaxed">
                {preview.description}
              </p>

              <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="label-museum text-graphite-soft">ENTER</span>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                  <path d="M1 4H13M9 1L13 4L9 7" stroke="#9A9A9A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
