/**
 * src/pages/TheStrata.tsx
 * THE STRATA — the world Scripture was written into. Five modules behind one chip bar
 * (?module=timeline|empires|gods|tribes|judaea):
 *   Timeline  ten eras on the ruler; prev/next or click a tick
 *   Empires   a hairline ledger
 *   Gods      expandable entries
 *   Tribes    three columns: north, south, priestly
 *   Judaea    the power pyramid, then three surprises
 */

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHead, PageBody, Entry, Prose } from '@/components/ui/Page'
import { Plus } from '@/components/ui/Glyphs'
import { Word, pad, strata, word } from '@/lib/content'

type Module = 'timeline' | 'empires' | 'gods' | 'tribes' | 'judaea'

const MODULES: { key: Module; label: string }[] = [
  { key: 'timeline', label: 'Timeline' },
  { key: 'empires', label: 'Empires' },
  { key: 'gods', label: 'The gods' },
  { key: 'tribes', label: 'The tribes' },
  { key: 'judaea', label: "Jesus's world" },
]

function Block({ side, children }: { side?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="pg-block">
      <div className="m-text-3 pg-side">{side}</div>
      <div className="pg-block__main">{children}</div>
    </div>
  )
}

// ── Timeline ──────────────────────────────────────────────

function Timeline() {
  const { eras } = strata
  const [index, setIndex] = useState(0)
  const era = eras[index]

  return (
    <>
      <Block side="Ten eras, one ruler">
        <div className="st" style={{ '--steps': eras.length, '--st-p': (index + 1) / eras.length } as React.CSSProperties}>
          <div className="st-scale" aria-hidden="true"><span className="st-fill" /></div>
          <div className="st-tabs" role="tablist" aria-label="Eras">
            {eras.map((e, i) => (
              <button key={e.id} className="st-tab" role="tab" type="button" aria-selected={i === index} aria-label={`Era ${i + 1}: ${e.name}`} onClick={() => setIndex(i)}>
                <span className="m-text-3">{pad(i + 1)}</span>
              </button>
            ))}
          </div>
        </div>
      </Block>

      <div key={era.id} className="st-panel" role="tabpanel">
        <Block side={<span style={{ display: 'grid', gap: 10, justifyItems: 'inherit' }}>
          <span className="m-text-2 sx-era-no" style={{ color: 'var(--color-2)' }}>{pad(era.number)}</span>
          <span>{era.dates}</span>
        </span>}>
          <h2 className="m-text-2" style={{ fontSize: 'clamp(34px, 4.4vw, 76px)' }}>{era.name}</h2>
          <Prose text={era.summary} />
        </Block>

        <Block side="Who and what">
          <div className="sx-cols">
            <div>
              <p className="m-label" style={{ marginBottom: 10 }}>Key figures</p>
              <ul className="sx-list">
                {era.key_figures.map(f => <li key={f.name}><span className="m-text-4" style={{ fontSize: 17 }}>{f.name}</span><span className="m-text">{f.role}</span></li>)}
              </ul>
            </div>
            <div>
              <p className="m-label" style={{ marginBottom: 10 }}>Dominant powers</p>
              <ul className="sx-list">
                {era.dominant_powers.map(p => <li key={p.name}><span className="m-text-4" style={{ fontSize: 17 }}>{p.name}</span><span className="m-text">{p.description}</span></li>)}
              </ul>
            </div>
          </div>
        </Block>

        <Block side={<span className="m-label is-accent">Religious flashpoint</span>}>
          <div className="m-panel m-surface" style={{ display: 'grid', gap: 10 }}>
            <p className="m-text-4">{era.religious_flashpoint.title}</p>
            <Prose text={era.religious_flashpoint.description} />
          </div>
        </Block>

        <Block side="Defining moment">
          <p className="m-text-4" style={{ maxWidth: '40ch' }}>{era.defining_moment}</p>
        </Block>
      </div>

      <Block>
        <div className="st-nav">
          <button className="m-btn-3" type="button" disabled={index === 0} onClick={() => setIndex(i => i - 1)}>
            <span className="m-btn-3__label">Earlier</span>
          </button>
          <span className="m-text-3" style={{ color: 'var(--color-4)' }}>Era {index + 1} of {eras.length}</span>
          <button className="m-btn-3" type="button" disabled={index === eras.length - 1} onClick={() => setIndex(i => i + 1)}>
            <span className="m-btn-3__label">Later</span>
          </button>
        </div>
      </Block>
    </>
  )
}

// ── Empires ───────────────────────────────────────────────

function Empires() {
  return (
    <>
      <Block side="Superpowers">
        <p className="m-text" style={{ maxWidth: '52ch' }}>{Word(strata.empires.length)} superpowers that ruled, invaded, or dominated Israel: what each one did and why Israel was always in their crosshairs.</p>
      </Block>
      <div className="lg" style={{ marginTop: 'clamp(40px, 7vh, 72px)' }}>
        <div className="l-ledger lg-head m-text-3" aria-hidden="true"><span>Empire</span><span>Dates</span><span>Impact and religion</span><span>Peak</span></div>
        <ul>
          {strata.empires.map(e => (
            <li key={e.id} className="l-ledger lg-row">
              <h3 className="m-text-4 lg-name">{e.name}</h3>
              <p className="m-text lg-left">{e.dates}</p>
              <div className="lg-main">
                <p className="m-text">{e.impact}</p>
                <p className="m-text-3" style={{ color: 'var(--color-4)' }}>Religion: {e.gods}</p>
              </div>
              <p className="m-text-3 lg-end">{e.era_peak}</p>
              <span className="lg-line" aria-hidden="true" data-motion="rule" data-enter="92%" />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

// ── Gods ──────────────────────────────────────────────────

function Gods() {
  return (
    <>
      <Block side="The rivals">
        <p className="m-text" style={{ maxWidth: '52ch' }}>The foreign gods that Israel kept chasing: what each represented and the key biblical moment where the contest became visible.</p>
      </Block>
      <div style={{ marginTop: 'clamp(40px, 7vh, 72px)' }}>
        {strata.gods.map((g, i) => (
          <Entry
            key={g.id}
            id={g.id}
            group="gods"
            side={<>
              <span className="m-text-3 is-accent">{pad(i + 1)}</span>
              <span className="m-text-3">{g.origin}</span>
            </>}
            title={g.name}
            sub={`${g.represents.split('. ')[0].replace(/\.$/, '')}.`}
          >
            <Prose text={g.represents} />
            <div className="m-panel m-surface" style={{ display: 'grid', gap: 12 }}>
              <p className="m-label is-accent">The biblical confrontation</p>
              <Prose text={g.confrontation} />
            </div>
          </Entry>
        ))}
      </div>
    </>
  )
}

// ── Tribes ────────────────────────────────────────────────

function Tribes() {
  const { north, south, priestly } = strata.tribes
  const cols = [
    { kicker: 'Northern Kingdom', name: 'Israel', fate: 'Fell to Assyria, 722 BCE', list: north },
    { kicker: 'Southern Kingdom', name: 'Judah', fate: 'Fell to Babylon, 586 BCE', list: south },
    { kicker: 'Priestly tribe', name: 'Levi', fate: 'No territorial inheritance', list: priestly },
  ]
  return (
    <>
      <Block side="Twelve tribes">
        <p className="m-text" style={{ maxWidth: '52ch' }}>Jacob's twelve sons became twelve tribes, each with their own territory, story, and fate. When the kingdom split after Solomon, the tribes divided along these lines.</p>
      </Block>
      <Block side="North, south, priestly">
        <div className="sx-tribes">
          {cols.map(c => (
            <div key={c.name}>
              <div>
                <p className="m-label">{c.kicker}</p>
                <p className="m-text-2" style={{ fontSize: 'clamp(34px, 3.4vw, 56px)' }}>{c.name}</p>
                <p className="m-text-3" style={{ color: 'var(--color-4)', marginTop: 6 }}>{c.fate}</p>
              </div>
              <ul className="sx-list">
                {c.list.map(t => <li key={t.name}><span className="m-text-4" style={{ fontSize: 17 }}>{t.name}</span><span className="m-text">{t.note}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="m-text-3" style={{ color: 'var(--color-4)', maxWidth: '64ch' }}>
          Jacob had 12 sons, but Joseph's two sons, Ephraim and Manasseh, each received their own territory. With Levi serving across all tribes, the count stays at 12 tribal lands.
        </p>
      </Block>
    </>
  )
}

// ── Judaea ────────────────────────────────────────────────

const TIER_SURFACE = ['m-surface-3', 'm-surface-3', 'm-surface', 'm-surface', 'm-surface-2']
const TIER_INSET = ['14%', '10%', '6%', '3%', '0%']

function Judaea() {
  const { tiers, surprises } = strata.judaea
  return (
    <>
      <Block side="Five layers of authority">
        <p className="m-text" style={{ maxWidth: '52ch' }}>Five layers of authority in the world Jesus moved through, from Rome at the top to ordinary people at the base. Open any layer to learn who held power and why.</p>
      </Block>
      <Block side="The power pyramid">
        <div className="sx-pyramid">
          {tiers.map((t, i) => (
            <details key={t.id} className={`sx-tier ${TIER_SURFACE[i]}`} style={{ '--tier-inset': TIER_INSET[i] } as React.CSSProperties} name="judaea">
              <summary>
                <span style={{ display: 'grid', gap: 4 }}>
                  <span className="m-text-3 sx-tier__sub">Tier {t.level} · {t.subtitle}</span>
                  <span className="m-text-4">{t.name}</span>
                </span>
                <Plus />
              </summary>
              <div className="sx-tier__body">
                <Prose text={t.description} />
                <p className="m-label">Key figures</p>
                <ul className="sx-figs">{t.figures.map(f => <li key={f}>{f}</li>)}</ul>
              </div>
            </details>
          ))}
        </div>
      </Block>
      <Block side={`${Word(surprises.length)} things that will surprise you`}>
        <div className="m-prose m-text">
          {surprises.map((s, i) => (
            <p key={s.title} className="is-num" data-n={pad(i + 1)}>
              <strong className="m-text-4" style={{ display: 'block', marginBottom: 6 }}>{s.title}</strong>
              {s.description}
            </p>
          ))}
        </div>
      </Block>
    </>
  )
}

export default function TheStrata() {
  const [params, setParams] = useSearchParams()
  const active = (MODULES.find(m => m.key === params.get('module'))?.key ?? 'timeline') as Module

  return (
    <>
      <PageHead
        kicker="Section IV · The Strata"
        meta="Historical record"
        lines={['The world', 'Scripture was', 'written into.']}
        side="The ground beneath the text"
        lede={`${Word(strata.eras.length)} eras, ${word(strata.empires.length)} empires, twelve tribes, and the gods Israel kept chasing. This is the ground beneath the text.`}
      />
      <div className="sx-bar">
        <div className="m-chips" role="tablist" aria-label="Strata modules">
          {MODULES.map(m => (
            <button
              key={m.key}
              type="button"
              role="tab"
              className="m-chip"
              aria-selected={active === m.key}
              onClick={() => setParams(m.key === 'timeline' ? {} : { module: m.key }, { replace: true })}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <PageBody>
        <div key={active} role="tabpanel">
          {active === 'timeline' && <Timeline />}
          {active === 'empires' && <Empires />}
          {active === 'gods' && <Gods />}
          {active === 'tribes' && <Tribes />}
          {active === 'judaea' && <Judaea />}
        </div>
      </PageBody>
    </>
  )
}
