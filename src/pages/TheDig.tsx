/**
 * src/pages/TheDig.tsx
 * THE DIG — arguments uncovered. Filter chips, then one entry per argument; opened, the
 * home page's ruler becomes a four-layer stepper: Claim, Logic, Objection, Response.
 */

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHead, PageBody, Entry, Prose, Sources } from '@/components/ui/Page'
import { LAYERS, Word, args, pad } from '@/lib/content'
import type { Argument } from '@/types'

const FILTERS = [
  { key: 'all', label: 'All arguments', ids: null },
  { key: 'islam', label: 'Most relevant for Islam', ids: ['kalam', 'resurrection', 'moral', 'prophecy'] },
  { key: 'historical', label: 'Historical', ids: ['resurrection', 'prophecy'] },
  { key: 'philosophical', label: 'Philosophical', ids: ['kalam', 'teleological', 'moral', 'reason', 'ontological', 'consciousness'] },
] as const

function Stepper({ argument }: { argument: Argument }) {
  const [step, setStep] = useState(0)
  const layer = LAYERS[step]
  const last = step === LAYERS.length - 1

  return (
    <div className="st" style={{ '--steps': LAYERS.length, '--st-p': (step + 1) / LAYERS.length } as React.CSSProperties}>
      <div className="st-scale" aria-hidden="true"><span className="st-fill" /></div>
      <div className="st-tabs" role="tablist" aria-label={`Layers of ${argument.title}`}>
        {LAYERS.map((l, i) => (
          <button
            key={l.key}
            className="st-tab"
            role="tab"
            type="button"
            id={`${argument.id}-tab-${i}`}
            aria-selected={i === step}
            aria-controls={`${argument.id}-panel`}
            onClick={() => setStep(i)}
          >
            <span className="m-text-3">Layer {pad(i + 1)}</span>
            <span className="m-text-4">{l.label}</span>
          </button>
        ))}
      </div>
      <div key={step} className="st-panel" role="tabpanel" id={`${argument.id}-panel`} aria-labelledby={`${argument.id}-tab-${step}`}>
        <p className="m-label">{layer.sublabel}</p>
        <Prose text={argument[layer.key]} />
        {last && (
          <Sources items={argument.sources.map(s => <>{s.author}, <em>{s.title}</em>{s.year ? ` (${s.year})` : ''}</>)} />
        )}
      </div>
      <div className="st-nav">
        <button className="m-btn-3" type="button" disabled={step === 0} onClick={() => setStep(s => s - 1)}>
          <span className="m-btn-3__label">Previous layer</span>
        </button>
        <button className="m-btn-3" type="button" disabled={last} onClick={() => setStep(s => s + 1)}>
          <span className="m-btn-3__label">{last ? 'Fully excavated' : `Dig to ${LAYERS[step + 1].label.toLowerCase()}`}</span>
        </button>
      </div>
    </div>
  )
}

export default function TheDig() {
  const [params, setParams] = useSearchParams()
  const active = FILTERS.find(f => f.key === params.get('filter')) ?? FILTERS[0]
  const shown = active.ids ? args.filter(a => (active.ids as readonly string[]).includes(a.id)) : args

  return (
    <>
      <PageHead
        kicker="Section II · The Dig"
        meta={`${args.length} arguments, four layers each`}
        lines={['The case for', 'Christianity,', 'layer by layer.']}
        side="Claim · Logic · Objection · Response"
        lede={`${Word(args.length)} arguments for God's existence and the truth of Christianity, each examined through four layers: claim, reasoning, strongest objection, and response. Open any argument to dig through it.`}
      >
        <div className="m-chips" role="group" aria-label="Filter arguments">
          {FILTERS.map(f => (
            <button
              key={f.key}
              type="button"
              className="m-chip"
              aria-pressed={active.key === f.key}
              onClick={() => setParams(f.key === 'all' ? {} : { filter: f.key }, { replace: true })}
            >
              {f.label} <span className="m-chip__n">{f.ids ? f.ids.length : args.length}</span>
            </button>
          ))}
        </div>
      </PageHead>
      <PageBody>
        {shown.map(a => (
          <Entry
            key={a.id}
            id={a.id}
            side={<>
              <span className="m-text-3 is-accent">Argument {pad(args.indexOf(a) + 1)}</span>
              <span className="m-text-3">{a.category}</span>
            </>}
            title={a.title}
            sub={a.summary}
          >
            <Stepper argument={a} />
          </Entry>
        ))}
      </PageBody>
    </>
  )
}
