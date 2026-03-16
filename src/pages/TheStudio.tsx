/**
 * src/pages/TheStudio.tsx
 * THE STUDIO — The Atelier of Reasoning.
 * Step-by-step workshop modules teaching argument structure.
 * Interactive argument builder: client-side form scaffolding.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'

interface WorkshopModule {
  number: string
  title: string
  description: string
  example: string
  label: string
}

const modules: WorkshopModule[] = [
  {
    number: '01',
    title: 'The Claim',
    description: 'Every argument begins with a clear, falsifiable proposition. The claim is the conclusion you intend to defend — stated precisely, without hedging. Vague claims produce vague arguments.',
    example: '"God exists as the transcendent first cause of the universe."',
    label: 'FOUNDATION',
  },
  {
    number: '02',
    title: 'The Warrant',
    description: 'The warrant is the principle or rule that connects your evidence to your claim. It answers the question: "Why does this evidence support this conclusion?" Without a warrant, evidence floats unanchored.',
    example: '"Whatever begins to exist must have a cause — this is a metaphysical principle accepted across worldviews."',
    label: 'STRUCTURE',
  },
  {
    number: '03',
    title: 'The Evidence',
    description: 'Evidence is the empirical or logical ground for your claim. In apologetics, evidence may be scientific (cosmological data), historical (the Resurrection), philosophical (the nature of consciousness), or experiential (the universality of moral intuition).',
    example: '"The universe began to exist approximately 13.8 billion years ago — confirmed by the Big Bang model, the Second Law of Thermodynamics, and the BGV theorem."',
    label: 'MATERIAL',
  },
  {
    number: '04',
    title: 'The Objection',
    description: 'Steel-man the strongest version of the opposing view. A well-constructed objection is not a distortion of your opponent\'s position — it is the most charitable and rigorous formulation available. This is intellectual honesty in practice.',
    example: '"Perhaps the universe has always existed, making a first cause unnecessary. Or perhaps quantum mechanics allows for uncaused events at the subatomic level."',
    label: 'PRESSURE TEST',
  },
  {
    number: '05',
    title: 'The Rebuttal',
    description: 'The rebuttal addresses the objection directly, either by showing it is factually incorrect, logically invalid, or insufficient to undermine the original claim. A good rebuttal does not merely assert — it demonstrates.',
    example: '"An eternal universe is ruled out by the BGV theorem even in multiverse models. Quantum events are not truly uncaused but governed by prior quantum states and physical laws."',
    label: 'RESPONSE',
  },
]

interface BuilderState {
  claim: string
  warrant: string
  evidence: string
  objection: string
  rebuttal: string
}

const emptyBuilder: BuilderState = {
  claim: '',
  warrant: '',
  evidence: '',
  objection: '',
  rebuttal: '',
}

export default function TheStudio() {
  const [builder, setBuilder] = useState<BuilderState>(emptyBuilder)
  const [activeField, setActiveField] = useState<keyof BuilderState | null>(null)

  const fields: { key: keyof BuilderState; label: string; placeholder: string }[] = [
    { key: 'claim', label: 'CLAIM', placeholder: 'State your proposition clearly...' },
    { key: 'warrant', label: 'WARRANT', placeholder: 'What principle connects evidence to claim?' },
    { key: 'evidence', label: 'EVIDENCE', placeholder: 'What grounds support your claim?' },
    { key: 'objection', label: 'OBJECTION', placeholder: 'What is the strongest counterargument?' },
    { key: 'rebuttal', label: 'REBUTTAL', placeholder: 'How does the objection fail or fall short?' },
  ]

  const filledCount = Object.values(builder).filter(v => v.trim().length > 0).length

  return (
    <div className="min-h-screen">
      <SectionHeader
        title="THE STUDIO"
        subtitle="The Atelier of Reasoning."
        label="Section IV"
      />

      {/* Workshop modules */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pb-20">
        <p className="font-sans text-sm text-graphite-light leading-body mb-16 max-w-lg">
          Good arguments are not found — they are built. This workshop teaches the five-layer
          structure used by the most rigorous thinkers in the apologetics tradition.
          Study each layer. Then construct your own.
        </p>

        <div className="space-y-0 border border-graphite-border">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.number}
              className="flex border-b last:border-b-0 border-graphite-border"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
            >
              {/* Large numeral */}
              <div className="flex-shrink-0 w-20 lg:w-28 flex items-start justify-center pt-8 border-r border-graphite-border bg-linen">
                <span className="font-serif font-bold text-4xl lg:text-5xl text-graphite-border select-none">
                  {mod.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 lg:p-10">
                <p className="label-museum mb-2 text-graphite-soft">{mod.label}</p>
                <h3 className="font-serif font-bold text-xl lg:text-2xl text-ink mb-4 tracking-heading">
                  {mod.title}
                </h3>
                <p className="font-sans text-sm text-graphite leading-body mb-5">
                  {mod.description}
                </p>
                <div className="border-l-2 border-graphite-border pl-4">
                  <p className="font-serif italic text-sm text-graphite-light">
                    {mod.example}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive argument builder */}
      <div className="border-t border-graphite-border bg-linen">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center gap-4 mb-2">
            <p className="label-museum text-graphite-soft">ARGUMENT BUILDER</p>
            <div className="flex gap-1" aria-label={`${filledCount} of 5 layers complete`}>
              {fields.map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-px transition-colors duration-300 ${
                    i < filledCount ? 'bg-crimson' : 'bg-graphite-border'
                  }`}
                />
              ))}
            </div>
          </div>
          <h2 className="font-serif font-bold text-2xl lg:text-3xl text-ink mb-2 tracking-heading">
            Build Your Argument
          </h2>
          <p className="font-sans text-sm text-graphite-light mb-10">
            Work through each layer. The structure will reveal itself.
          </p>

          <div className="space-y-0 border border-graphite-border bg-white">
            {fields.map((field, i) => (
              <div
                key={field.key}
                className={`border-b last:border-b-0 border-graphite-border transition-colors duration-300 ${
                  activeField === field.key ? 'bg-white' : 'bg-white'
                }`}
              >
                <div className="flex">
                  {/* Layer label */}
                  <div
                    className={`flex-shrink-0 w-20 lg:w-28 flex items-start justify-center pt-5 border-r border-graphite-border transition-colors duration-300 ${
                      activeField === field.key ? 'bg-linen' : 'bg-linen'
                    }`}
                  >
                    <span className="font-serif font-bold text-3xl text-graphite-border select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Input area */}
                  <div className="flex-1 p-6">
                    <p className="label-museum mb-3 text-graphite-soft">{field.label}</p>
                    <textarea
                      value={builder[field.key]}
                      onChange={(e) =>
                        setBuilder((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      onFocus={() => setActiveField(field.key)}
                      onBlur={() => setActiveField(null)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full font-sans text-sm text-graphite leading-body bg-transparent border-none outline-none resize-none placeholder:text-graphite-border"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Assembled argument preview */}
          {filledCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 border border-graphite-border p-8 bg-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <p className="label-museum text-graphite-soft">ASSEMBLED ARGUMENT</p>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1,10 L6,2 L11,10" stroke="#C41E3A" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="3" y1="7.5" x2="9" y2="7.5" stroke="#C41E3A" strokeWidth="0.7" strokeLinecap="round" />
                </svg>
              </div>
              <div className="space-y-5">
                {fields.map((field) =>
                  builder[field.key].trim() ? (
                    <div key={field.key}>
                      <p className="label-museum mb-1 text-graphite-soft">{field.label}</p>
                      <p className="font-sans text-sm text-graphite leading-body">
                        {builder[field.key]}
                      </p>
                      <hr className="rule-graphite mt-5" />
                    </div>
                  ) : null
                )}
              </div>
              <button
                onClick={() => setBuilder(emptyBuilder)}
                className="mt-6 label-museum text-graphite-soft hover:text-graphite transition-colors duration-300"
              >
                CLEAR ALL
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
