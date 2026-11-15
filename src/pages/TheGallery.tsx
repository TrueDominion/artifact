/**
 * src/pages/TheGallery.tsx
 * THE GALLERY: Islam on its own terms. One exhibit, read top to bottom along the rule:
 * overview and scale, core claims, the texts it rests on, then the Christian critique.
 */

import { PageHead, PageBody, Prose } from '@/components/ui/Page'
import { Word, pad, worldviews } from '@/lib/content'
import type { NamedText } from '@/types'

function Block({ side, children }: { side: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="pg-block">
      <div className="m-text-3 pg-side">{side}</div>
      <div className="pg-block__main">{children}</div>
    </div>
  )
}

function Named({ items, numbered }: { items: NamedText[]; numbered?: boolean }) {
  return (
    <ul className="sx-list gl-named">
      {items.map((it, i) => (
        <li key={it.name}>
          <span className="m-text-4" style={{ fontSize: 17 }}>{numbered && <span className="gl-n m-text-3">{pad(i + 1)}</span>}{it.name}</span>
          <span className="m-text">{it.text}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TheGallery() {
  const wv = worldviews.find(w => w.id === 'islam')
  if (!wv) return null

  return (
    <>
      <PageHead
        kicker="Section III · The Gallery"
        meta={`${wv.tradition} · founded ${wv.founded}`}
        lines={['Islam,', 'on its own', 'terms.']}
        side="Understand before you answer"
        lede="Islam presented first as Muslims would recognise it, then examined from a Christian perspective. The goal is honest engagement, not caricature."
      />
      <PageBody>
        <Block side={<span className="m-label is-accent">The exhibit</span>}>
          <p className="m-text-4" style={{ maxWidth: '36ch' }}>{wv.tagline}</p>
          <div className="ex-split">
            <Prose text={wv.overview} />
            <div className="m-panel m-surface" style={{ display: 'grid', gap: 22 }}>
              <div className="gl-figure">
                <p className="m-label">Estimated adherents</p>
                <p className="m-text-2">{wv.adherents_count}<span className="m-text-4"> {wv.adherents_unit}</span></p>
              </div>
              <div className="gl-figure">
                <p className="m-label">Founded</p>
                <p className="m-text">{wv.founded}</p>
              </div>
            </div>
          </div>
        </Block>

        <Block side={`${wv.core_claims.length} core claims`}>
          <div className="m-prose m-text">
            {wv.core_claims.map((c, i) => <p key={i} className="is-num" data-n={pad(i + 1)}>{c}</p>)}
          </div>
        </Block>

        {wv.articles && (
          <Block side={`${Word(wv.articles.length)} articles of faith`}>
            <Named items={wv.articles} numbered />
          </Block>
        )}

        {wv.pillars && (
          <Block side={`${Word(wv.pillars.length)} pillars of practice`}>
            <Named items={wv.pillars} numbered />
          </Block>
        )}

        {wv.sources && (
          <Block side="How the sources relate">
            <Named items={wv.sources} />
          </Block>
        )}

        {wv.branches && (
          <Block side="Branches">
            <Named items={wv.branches} />
          </Block>
        )}

        {wv.schools && (
          <Block side="Schools of thought and law">
            <Named items={wv.schools} />
          </Block>
        )}

        {wv.why_it_matters && (
          <Block side={<span className="m-label is-accent">Why it matters</span>}>
            <p className="m-text-4" style={{ maxWidth: '44ch' }}>{wv.why_it_matters}</p>
          </Block>
        )}

        <Block side="Key texts">
          <ul className="sx-list">
            {wv.key_texts.map(t => <li key={t}><span className="m-text">{t}</span></li>)}
          </ul>
        </Block>

        <Block side={<span className="m-label is-accent">A Christian critique</span>}>
          <Prose text={wv.christian_critique} />
        </Block>
      </PageBody>
    </>
  )
}
