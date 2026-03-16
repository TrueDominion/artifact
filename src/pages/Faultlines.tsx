/**
 * src/pages/Faultlines.tsx
 * FAULTLINES — Where the Ground Breaks.
 * Each debate as a split-screen panel: warm grey challenge / white response.
 * Crimson vertical rule divider. Difficulty badges.
 * Geological cross-section SVG at section top.
 */

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import debatesData from '@/data/debates.json'
import type { Debate } from '@/types'

const debates = debatesData as Debate[]

// Geological cross-section illustration
function GeoSection() {
  return (
    <svg
      viewBox="0 0 800 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-16 md:h-20"
      aria-hidden="true"
    >
      {/* Layer lines */}
      <path d="M0,20 C80,16 160,24 240,18 C320,12 400,22 480,16 C560,10 640,20 720,15 L800,18" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.3" />
      <path d="M0,35 C100,30 200,40 300,34 C400,28 500,38 600,32 C680,27 740,34 800,31" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.25" />
      <path d="M0,50 C120,44 240,54 360,48 C480,42 580,52 680,46 L800,48" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.2" />
      <path d="M0,65 C140,58 280,68 400,62 C520,56 640,66 800,60" stroke="#2D2D2D" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" />

      {/* Fault line — vertical crack */}
      <path d="M398,0 L401,20 L396,40 L402,60 L399,80" stroke="#2D2D2D" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="3 2" opacity="0.4" />

      {/* Crimson fault accent */}
      <path d="M400,0 L402,25 L397,50 L401,80" stroke="#C41E3A" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

const difficultyLabel: Record<Debate['difficulty'], string> = {
  foundational: 'FOUNDATIONAL',
  intermediate: 'INTERMEDIATE',
  advanced: 'ADVANCED',
}

export default function Faultlines() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="FAULTLINES"
        subtitle="Where the Ground Breaks."
        label="Section V"
      />

      {/* Geo illustration */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <GeoSection />
        <p className="font-sans text-sm text-graphite-light leading-body mt-8 max-w-lg">
          These are the pressure points — the places where honest inquiry encounters genuine
          intellectual tension. Mapped, not avoided. Each fault examined from both sides.
        </p>
      </div>

      {/* Debate panels */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32 space-y-0">
        {debates.map((debate, index) => (
          <motion.article
            key={debate.id}
            className="border border-b-0 last:border-b border-graphite-border overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-graphite-border bg-linen">
              <div className="flex items-center gap-4">
                <p className="label-museum text-graphite-soft">
                  FAULT {String(index + 1).padStart(2, '0')}
                </p>
                <span className="badge-difficulty">{difficultyLabel[debate.difficulty]}</span>
              </div>
              <h2 className="font-serif font-bold text-lg lg:text-xl text-ink tracking-heading text-right">
                {debate.title}
              </h2>
            </div>

            {/* Split-screen content */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr]">
              {/* Left — The Challenge */}
              <div className="p-8 lg:p-10" style={{ backgroundColor: '#F5F3F0' }}>
                <p className="label-museum mb-5 text-graphite-soft">THE CHALLENGE</p>
                <p className="font-sans text-sm text-graphite leading-body">
                  {debate.challenge}
                </p>
              </div>

              {/* Crimson divider */}
              <div className="hidden lg:block bg-crimson opacity-60" />

              {/* Right — The Response */}
              <div className="p-8 lg:p-10 bg-white border-t lg:border-t-0 border-graphite-border">
                <p className="label-museum mb-5 text-graphite-soft">THE RESPONSE</p>
                <p className="font-sans text-sm text-graphite leading-body mb-6">
                  {debate.response}
                </p>

                {debate.key_thinkers.length > 0 && (
                  <div className="pt-5 border-t border-graphite-border">
                    <p className="label-museum mb-2 text-graphite-soft">KEY THINKERS</p>
                    <p className="font-sans text-xs text-graphite-soft">
                      {debate.key_thinkers.join(' · ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
