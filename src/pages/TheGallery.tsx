/**
 * src/pages/TheGallery.tsx
 * THE GALLERY — Beliefs in Context.
 * Each worldview as an exhibit panel: neutral overview (Col A)
 * alongside Christian critique (Col B), divided by a graphite rule.
 */

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { WorldviewSymbol } from '@/components/ui/ExhibitLabel'
import worldviewsData from '@/data/worldviews.json'
import type { Worldview } from '@/types'

const worldviews = worldviewsData as Worldview[]

export default function TheGallery() {
  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE GALLERY"
        subtitle="Beliefs in Context."
        label="Section III"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32 space-y-0">
        {worldviews.map((wv, index) => (
          <motion.article
            key={wv.id}
            className="border border-b-0 last:border-b border-graphite-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
          >
            {/* Exhibit header */}
            <div className="flex items-center gap-5 px-8 py-6 border-b border-graphite-border bg-linen">
              <div className="flex-shrink-0 opacity-70">
                <WorldviewSymbol svgKey={wv.symbol_svg_key} />
              </div>
              <div>
                <p className="label-museum mb-1 text-graphite-soft">
                  EXHIBIT {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="font-serif font-bold text-2xl lg:text-3xl text-ink tracking-heading">
                  {wv.name}
                </h2>
              </div>
            </div>

            {/* Two-column exhibit body */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Col A — The Exhibit */}
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-graphite-border">
                <p className="label-museum mb-5 text-graphite-soft">THE EXHIBIT</p>
                <p className="font-sans text-sm text-graphite leading-body mb-6">
                  {wv.overview}
                </p>

                <div className="mb-5">
                  <p className="label-museum mb-3 text-graphite-soft">CORE CLAIMS</p>
                  <ul className="space-y-2">
                    {wv.core_claims.map((claim: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-serif text-graphite-soft text-sm flex-shrink-0 mt-0.5">—</span>
                        <span className="font-sans text-sm text-graphite-light leading-relaxed">{claim}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="label-museum mb-2 text-graphite-soft">KEY TEXTS</p>
                  <ul className="space-y-1">
                    {wv.key_texts.map((text: string, i: number) => (
                      <li key={i} className="font-sans text-xs italic text-graphite-soft">{text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Col B — The Critique */}
              <div className="p-8 lg:p-10 bg-white">
                <div className="flex items-center gap-3 mb-5">
                  <p className="label-museum text-graphite-soft">THE CRITIQUE</p>
                  {/* Crimson annotation mark */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2,12 L7,2 L12,12" stroke="#C41E3A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="4" y1="9" x2="10" y2="9" stroke="#C41E3A" strokeWidth="0.8" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-graphite leading-body">
                  {wv.christian_critique}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
