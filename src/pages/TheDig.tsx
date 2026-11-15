/**
 * src/pages/TheDig.tsx
 * THE DIG: arguments uncovered. Filter chips, then one entry per argument; opened, the
 * home page's ruler becomes a four-layer stepper: Claim, Logic, Objection, Response.
 */

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHead, PageBody, Entry, Prose, Sources } from '@/components/ui/Page'
import { LAYERS, Word, args, pad } from '@/lib/content'
import type { Argument } from '@/types'

const FILTERS = [
  { key: 'all', label: 'All evidence', ground: null },
  { key: 'common', label: 'Common ground', ground: 'common' },
  { key: 'contested', label: 'What divides us', ground: 'contested' },
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
  const shown = active.ground ? args.filter(a => a.ground === active.ground) : args

  return (
    <>
      <PageHead
        kicker="Section II · The Dig"
        meta={`${args.length} lines of evidence, four layers each`}
        lines={['The evidence,', 'layer', 'by layer.']}
        side="Claim · Logic · Objection · Response"
        lede={`${Word(args.length)} lines of evidence for the conversation with Muslims. Some are common ground (one Creator, a moral law); the rest concern the history that divides the two faiths. Each is examined through four layers: claim, reasoning, strongest objection, and response.`}
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
              {f.label} <span className="m-chip__n">{f.ground ? args.filter(a => a.ground === f.ground).length : args.length}</span>
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
              <span className="m-text-3 is-accent">Evidence {pad(args.indexOf(a) + 1)}</span>
              <span className="m-text-3">{a.category}</span>
              <span className="m-text-3">{a.ground === 'common' ? 'Common ground' : 'Divides'}</span>
            </>}
            title={a.title}
            sub={a.summary}
          >
            <div className="m-panel m-surface dg-note">
              <p className={`m-label${a.ground === 'common' ? '' : ' is-accent'}`}>{a.ground === 'common' ? 'Common ground with Muslims' : 'Where Christians and Muslims part'}</p>
              <p className="m-text">{a.islam_note}</p>
            </div>
            <Stepper argument={a} />
          </Entry>
        ))}
      </PageBody>
    </>
  )
}
