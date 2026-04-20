import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Thinker } from '@/types'

interface ThinkerCardProps {
  thinker: Thinker
  index: number
}

function Portrait({ name, svgKey }: { name: string; svgKey: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)
    return (
      <div className="w-full h-full flex items-center justify-center bg-linen">
        <span className="font-serif font-bold text-3xl text-graphite-border select-none">
          {initials}
        </span>
      </div>
    )
  }

  return (
    <img
      src={`/images/${svgKey}.webp`}
      alt={`Portrait of ${name}`}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  )
}

export default function ThinkerCard({ thinker, index }: ThinkerCardProps) {
  return (
    <motion.article
      className="group relative bg-white flex flex-col"
      style={{ border: '1px solid rgba(45,45,45,0.12)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
    >
      {/* Crimson 2px top accent — visible on hover only */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] bg-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none"
        aria-hidden="true"
      />

      {/* Portrait image */}
      <div
        className="w-full overflow-hidden"
        style={{
          aspectRatio: '2 / 3',
          maxHeight: '280px',
          borderBottom: '1px solid rgba(45,45,45,0.08)',
        }}
      >
        <Portrait name={thinker.name} svgKey={thinker.portrait_svg_key} />
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <p className="label-museum mb-2 text-graphite-soft">{thinker.tradition}</p>
          <h3 className="font-serif font-bold text-xl text-ink mb-1 tracking-heading">
            {thinker.name}
          </h3>
          <p className="font-sans text-xs text-graphite-soft mb-3">{thinker.dates}</p>
          <p className="font-sans text-sm text-graphite-light leading-relaxed">
            {thinker.summary}
          </p>
        </div>

        {thinker.key_works.length > 0 && (
          <div
            className="mt-auto"
            style={{ paddingTop: '1rem', borderTop: '1px solid rgba(45,45,45,0.08)' }}
          >
            <p className="label-museum mb-2 text-graphite-soft">KEY WORKS</p>
            <ul className="space-y-1">
              {thinker.key_works.slice(0, 3).map((work: string, i: number) => (
                <li key={i} className="font-sans text-xs italic text-graphite-soft">
                  {work}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.article>
  )
}
