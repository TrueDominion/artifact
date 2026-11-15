/**
 * Two Portraits: Jesus in the Gospels and in the Quran, one topic per row.
 * The topic and verdict hang left; the two accounts face each other across a hairline.
 */

import type { Portrait } from '@/types'

const VERDICT: Record<Portrait['verdict'], string> = {
  shared: 'Shared',
  partly: 'Partly shared',
  divergent: 'Cannot both be true',
}

export function PortraitHead() {
  return (
    <div className="tp-row tp-head m-text-3" aria-hidden="true">
      <span>Topic</span>
      <span>The Gospels</span>
      <span>The Quran</span>
    </div>
  )
}

export function PortraitRow({ p, withNote = true }: { p: Portrait; withNote?: boolean }) {
  return (
    <article className="tp-row" id={p.id}>
      <span className="tp-line" aria-hidden="true" data-motion="rule" data-enter="92%" />
      <div className="tp-topic">
        <h3 className="m-text-4">{p.topic}</h3>
        <p className={`m-text-3 tp-verdict is-${p.verdict}`}>{VERDICT[p.verdict]}</p>
      </div>
      <div className="tp-side" data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '-36px' } as React.CSSProperties}>
        <p className="m-label tp-who">The Gospels</p>
        <p className="m-text">{p.gospels.text}</p>
        <p className="m-text-3 tp-ref">{p.gospels.refs}</p>
      </div>
      <div className="tp-side tp-quran" data-motion="post" data-enter="90%" style={{ '--post-translate-x-from': '36px', '--post-delay': '0.12s' } as React.CSSProperties}>
        <p className="m-label tp-who">The Quran</p>
        <p className="m-text">{p.quran.text}</p>
        <p className="m-text-3 tp-ref">{p.quran.refs}</p>
      </div>
      {withNote && <p className="m-text tp-note">{p.note}</p>}
    </article>
  )
}
