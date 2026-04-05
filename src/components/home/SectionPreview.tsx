/**
 * src/components/home/SectionPreview.tsx
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
    description: 'The core beliefs of the Christian faith — what we believe, why it matters, and how it stands up when challenged.',
    sublabel: 'Foundation',
  },
  {
    label: 'THE DIG',
    path: '/the-dig',
    description: 'Six powerful arguments for God\'s existence — broken down step by step so anyone can understand and use them.',
    sublabel: 'Arguments',
  },
  {
    label: 'THE GALLERY',
    path: '/the-gallery',
    description: 'Eight major belief systems examined honestly — what they teach, what they get right, and where they fall short.',
    sublabel: 'Worldviews',
  },
  {
    label: 'FAULTLINES',
    path: '/faultlines',
    description: 'The hardest questions Islam raises about Christianity — and clear, honest answers backed by history and evidence.',
    sublabel: 'Challenges',
  },
  {
    label: 'FIELD GUIDE',
    path: '/field-guide',
    description: 'Twenty real challenges you\'ll hear face to face — each with a clear one-line answer and the evidence to back it up.',
    sublabel: 'Quick Reference',
  },
]

function PreviewIcon({ index }: { index: number }) {
  const icons = [
    <svg key={0} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><rect x="4" y="16" width="20" height="8" stroke="#2D2D2D" strokeWidth="0.9" rx="1"/><path d="M8,16 L8,10 L20,10 L20,16" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/></svg>,
    <svg key={1} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><path d="M14,22 L20,8 L8,8 Z" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/><line x1="14" y1="8" x2="14" y2="4" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/></svg>,
    <svg key={2} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><path d="M6,22 L6,12 Q14,4 22,12 L22,22" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/><line x1="4" y1="22" x2="24" y2="22" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/></svg>,
    <svg key={3} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><path d="M4,14 L10,10 L18,18 L24,14" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/><line x1="4" y1="20" x2="24" y2="20" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/></svg>,
    <svg key={4} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><ellipse cx="14" cy="8" rx="5" ry="6" stroke="#2D2D2D" strokeWidth="0.9"/><path d="M10,14 L8,22 L20,22 L18,14" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key={5} viewBox="0 0 28 28" fill="none" className="w-6 h-6"><circle cx="14" cy="10" r="4" stroke="#2D2D2D" strokeWidth="0.9"/><path d="M7,22 C7,18 10,15 14,15 C18,15 21,18 21,22" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round"/></svg>,
  ]
  return icons[index] ?? icons[0]
}

export default function SectionPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
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
