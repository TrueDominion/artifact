/**
 * src/pages/FieldGuide.tsx
 * THE FIELD GUIDE — rapid reference for conversations with Muslims.
 * Search and filter the challenges; each entry opens to numbered points and an anchor verse.
 */

import { useMemo, useState } from 'react'
import { PageHead, PageBody, Entry } from '@/components/ui/Page'
import { ALL_TAGS, TAG_LABELS, fieldGuide, pad } from '@/lib/content'
import type { FieldGuideTag } from '@/types'

export default function FieldGuide() {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState<FieldGuideTag | 'all'>('all')
  const pool = fieldGuide
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
        meta={`${pool.length} challenges Muslims raise`}
        lines={['When someone', 'says it to you', 'face to face.']}
        side="Search, open, answer"
        lede="Challenges from Islamic theology: the Quran, Muhammad's credentials, the Trinity, tahrif, and the nature of God. Each entry gives you a one-line response you can say in the moment, and the evidence behind it."
      >
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
