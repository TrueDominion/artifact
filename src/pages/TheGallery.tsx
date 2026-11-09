/**
 * src/pages/TheGallery.tsx
 * THE GALLERY — worldviews in context. One exhibit per worldview; opened, three tabs:
 * Overview (with adherents and relative share), Core claims, and the Reformed critique.
 */

import { useState } from 'react'
import { PageHead, PageBody, Entry, Prose } from '@/components/ui/Page'
import { Word, pad, worldviews } from '@/lib/content'
import type { Worldview } from '@/types'

type Tab = 'overview' | 'claims' | 'critique'

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'claims', label: 'Core claims' },
  { key: 'critique', label: 'Critique' },
]

/** Share of the largest tradition shown, in millions; the bar is relative, not absolute. */
const millions = (w: Worldview) => (w.adherents_count ?? 0) * (w.adherents_unit === 'billion' ? 1000 : 1)
const MAX = Math.max(...worldviews.map(millions))

function Exhibit({ wv }: { wv: Worldview }) {
  const [tab, setTab] = useState<Tab>('critique')

  return (
    <>
      <div className="m-chips gl-tabs" role="tablist" aria-label={`${wv.name} exhibit`}>
        {TABS.map(t => (
          <button
            key={t.key}
            type="button"
            role="tab"
            className="m-chip"
            id={`${wv.id}-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`${wv.id}-panel`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={tab} className="st-panel" role="tabpanel" id={`${wv.id}-panel`} aria-labelledby={`${wv.id}-${tab}`}>
        {tab === 'overview' && (
          <div className="ex-split">
            <div>
              <Prose text={wv.overview} />
              <div className="ex-meta">
                <p className="m-label">Key texts</p>
                <ul className="m-text-3" style={{ display: 'grid', gap: 4 }}>
                  {wv.key_texts.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
            <div className="m-panel m-surface" style={{ display: 'grid', gap: 22 }}>
              <div className="gl-figure">
                <p className="m-label">Estimated adherents</p>
                {wv.adherents_count !== null ? (
                  <>
                    <p className="m-text-2">{wv.adherents_count}<span className="m-text-4"> {wv.adherents_unit}</span></p>
                    <div className="gl-bar" aria-hidden="true"><span style={{ '--share': millions(wv) / MAX } as React.CSSProperties} /></div>
                    <p className="m-text-3" style={{ color: 'var(--color-4)' }}>Relative to the largest tradition shown</p>
                  </>
                ) : (
                  <>
                    <p className="m-text-2">Diffuse</p>
                    <p className="m-text">Secular humanism functions as a cultural default rather than a counted membership; its influence exceeds any fixed figure.</p>
                  </>
                )}
              </div>
              <div className="gl-figure">
                <p className="m-label">Founded</p>
                <p className="m-text">{wv.founded}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'claims' && (
          <div className="m-prose m-text">
            {wv.core_claims.map((c, i) => <p key={i} className="is-num" data-n={pad(i + 1)}>{c}</p>)}
          </div>
        )}

        {tab === 'critique' && (
          <>
            <p className="m-label is-accent">Reformed Christian critique</p>
            <Prose text={wv.christian_critique} />
          </>
        )}
      </div>
    </>
  )
}

export default function TheGallery() {
  return (
    <>
      <PageHead
        kicker="Section III · The Gallery"
        meta={`${worldviews.length} worldviews`}
        lines={[`${Word(worldviews.length)} worldviews,`, 'examined', 'honestly.']}
        side="Overview · Core claims · Critique"
        lede="Each tradition presented on its own terms, then examined from a Reformed Christian perspective. The goal is honest engagement, not caricature."
      />
      <PageBody>
        {worldviews.map((wv, i) => (
          <Entry
            key={wv.id}
            id={wv.id}
            group="gallery"
            side={<>
              <span className="m-text-3 is-accent">Exhibit {pad(i + 1)}</span>
              <span className="m-text-3">{wv.tradition}</span>
              <span className="m-text-3">{wv.adherents}</span>
            </>}
            title={wv.name}
            sub={wv.tagline}
          >
            <Exhibit wv={wv} />
          </Entry>
        ))}
      </PageBody>
    </>
  )
}
