/**
 * src/pages/FieldGuide.tsx
 * THE FIELD GUIDE — rapid reference for real conversations.
 * Step 1: pick a tradition (tiles). Step 2: search and filter its challenges; each entry opens to
 * numbered points and an anchor verse. The tradition lives in the URL (?tradition=islam) so it can be shared.
 */

import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHead, PageBody, Entry } from '@/components/ui/Page'
import { ALL_TAGS, RELIGIONS, TAG_LABELS, fieldGuide, pad, religionCount } from '@/lib/content'
import type { FieldGuideReligion, FieldGuideTag } from '@/types'

function Selector({ onSelect }: { onSelect: (id: FieldGuideReligion) => void }) {
  return (
    <>
      <PageHead
        kicker="Reference · Field Guide"
        meta={`${fieldGuide.length} challenges, ${RELIGIONS.length} traditions`}
        lines={['When someone', 'says it to you', 'face to face.']}
        side="Step one of two"
        lede="Select the worldview you are engaging with. You will see clear, concise responses to the challenges you are most likely to encounter."
      />
      <div className="pg-body">
        <ul className="fg-tiles">
          {RELIGIONS.map(r => (
            <li key={r.id}>
              <button type="button" className="fg-tile" onClick={() => onSelect(r.id)}>
                <span className="fg-count m-surface">
                  <span className="m-text-2">{religionCount(r.id)}</span>
                  <span className="m-text-3">challenges answered</span>
                </span>
                <span className="m-text-4">{r.label}</span>
                <span className="m-text-3">{r.sublabel}</span>
                <span className="m-text">{r.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function Guide({ religion, onSelect }: { religion: FieldGuideReligion; onSelect: (id: FieldGuideReligion | null) => void }) {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState<FieldGuideTag | 'all'>('all')
  const config = RELIGIONS.find(r => r.id === religion)!

  const pool = useMemo(() => fieldGuide.filter(e => e.religion === religion), [religion])
  const tags = useMemo(() => ALL_TAGS.filter(t => pool.some(e => e.tag === t)), [pool])

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase()
    return pool
      .filter(e => (tag === 'all' || e.tag === tag) && (!q
        || e.challenge.toLowerCase().includes(q)
        || e.one_liner.toLowerCase().includes(q)
        || e.points.some(p => p.toLowerCase().includes(q))))
      .sort((a, b) => (a.priority ?? 3) - (b.priority ?? 3))
  }, [pool, search, tag])

  const clear = () => { setSearch(''); setTag('all') }

  return (
    <>
      <PageHead
        kicker="Reference · Field Guide"
        meta={config.sublabel}
        lines={[config.label + '.']}
        side={<button type="button" className="m-link" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }} onClick={() => onSelect(null)}>All traditions</button>}
        lede={`${config.description} Each entry gives you a one-line response and the evidence behind it.`}
      >
        <div className="m-chips" role="group" aria-label="Tradition">
          {RELIGIONS.map(r => (
            <button key={r.id} type="button" className="m-chip" aria-pressed={r.id === religion} onClick={() => onSelect(r.id)}>
              {r.label} <span className="m-chip__n">{religionCount(r.id)}</span>
            </button>
          ))}
        </div>
        <label className="m-field pg-search">
          <span className="m-field__label">Search what was said</span>
          <input className="m-field__input" type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="e.g. corrupted, Paraclete, evil" />
          {search && (
            <button type="button" className="pg-clear" aria-label="Clear search" onClick={() => setSearch('')}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          )}
        </label>
        <div className="m-chips" role="group" aria-label="Topic">
          <button type="button" className="m-chip" aria-pressed={tag === 'all'} onClick={() => setTag('all')}>All</button>
          {tags.map(t => (
            <button key={t} type="button" className="m-chip" aria-pressed={tag === t} onClick={() => setTag(t)}>{TAG_LABELS[t]}</button>
          ))}
        </div>
        <p className="m-text-3 pg-count" role="status">
          {shown.length} {shown.length === 1 ? 'challenge' : 'challenges'}
          {tag !== 'all' ? ` in ${TAG_LABELS[tag]}` : ''}
          {search ? ` matching “${search}”` : ''}
        </p>
      </PageHead>

      <PageBody>
        {shown.length ? shown.map((entry, i) => (
          <Entry
            key={entry.id}
            id={entry.id}
            side={<>
              <span className="m-text-3 is-accent">{pad(i + 1)}</span>
              <span className="m-text-3">{TAG_LABELS[entry.tag]}</span>
            </>}
            title={<span className="fg-quote">“{entry.challenge}”</span>}
            sub={entry.one_liner}
          >
            <div className="m-prose m-text">
              {entry.points.map((p, n) => <p key={n} className="is-num" data-n={pad(n + 1)}>{p}</p>)}
            </div>
            {entry.anchor_verse && (
              <blockquote className="m-verse">
                <p className="m-label">Anchor verse</p>
                <p className="m-text-4">“{entry.anchor_verse}”</p>
                <cite className="m-label is-accent" style={{ fontStyle: 'normal' }}>{entry.anchor_verse_ref}</cite>
              </blockquote>
            )}
          </Entry>
        )) : (
          <div className="pg-empty">
            <p className="m-text-4">No challenges found.</p>
            <button type="button" className="m-btn-3" onClick={clear}><span className="m-btn-3__label">Clear filters</span></button>
          </div>
        )}
      </PageBody>
    </>
  )
}

export default function FieldGuide() {
  const [params, setParams] = useSearchParams()
  const requested = params.get('tradition')
  const religion = RELIGIONS.some(r => r.id === requested) ? (requested as FieldGuideReligion) : null

  const select = (id: FieldGuideReligion | null) => {
    setParams(id ? { tradition: id } : {})
    scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

  return religion ? <Guide key={religion} religion={religion} onSelect={select} /> : <Selector onSelect={select} />
}
