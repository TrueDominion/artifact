/**
 * src/pages/TheGallery.tsx
 * THE GALLERY — Islam on its own terms. One exhibit, read top to bottom along the rule:
 * overview and scale, core claims, the texts it rests on, then the Reformed critique.
 */

import { PageHead, PageBody, Prose } from '@/components/ui/Page'
import { pad, worldviews } from '@/lib/content'

function Block({ side, children }: { side: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="pg-block">
      <div className="m-text-3 pg-side">{side}</div>
      <div className="pg-block__main">{children}</div>
    </div>
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
        lede="Islam presented first as Muslims would recognise it, then examined from a Reformed Christian perspective. The goal is honest engagement, not caricature."
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

        <Block side="Key texts">
          <ul className="sx-list">
            {wv.key_texts.map(t => <li key={t}><span className="m-text">{t}</span></li>)}
          </ul>
        </Block>

        <Block side={<span className="m-label is-accent">Reformed Christian critique</span>}>
          <Prose text={wv.christian_critique} />
        </Block>
      </PageBody>
    </>
  )
}
