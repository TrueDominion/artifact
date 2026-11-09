/**
 * Shared building blocks for the inner pages.
 *   PageHead  kicker, staggered headline and lede hung on the vertical rule
 *   PageBody  the content column with the rule running through it
 *   Entry     an expandable row: meta left of the rule, title and content right of it
 */

import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus } from './Glyphs'

interface PageHeadProps {
  kicker: string
  meta?: string
  /** Headline lines. The first hangs from the left margin, the rest from the rule; the last is indented. */
  lines: string[]
  side?: ReactNode
  lede?: ReactNode
  children?: ReactNode
}

export function PageHead({ kicker, meta, lines, side, lede, children }: PageHeadProps) {
  return (
    <section className="pg-head">
      <span className="l-rule pg-rule" aria-hidden="true" />
      <p className="m-text-3 pg-kicker l-b">
        <span>{kicker}</span>
        {meta && <span>{meta}</span>}
      </p>
      <h1 className="m-text-2 pg-h">
        {lines.map((line, i) => (
          <span key={i} className={`ln ${i === 0 ? 'l-a' : 'l-b'}${i > 0 && i === lines.length - 1 && lines.length > 2 ? ' pg-in' : ''}`}>
            <span className="ln__i">{line}</span>{' '}
          </span>
        ))}
      </h1>
      {(side || lede) && (
        <div className="pg-intro">
          <p className="m-text-3 pg-side">{side}</p>
          <div className="m-text pg-lede">{lede}</div>
        </div>
      )}
      {children && <div className="pg-tools">{children}</div>}
    </section>
  )
}

export function PageBody({ children }: { children: ReactNode }) {
  return (
    <div className="pg-body">
      <span className="l-rule" aria-hidden="true" data-motion="rule" data-enter="95%" style={{ '--rule-from': '1 0', '--rule-origin': '50% 0%' } as React.CSSProperties} />
      {children}
    </div>
  )
}

interface EntryProps {
  id: string
  /** Shared name: opening one entry closes the others in the same group. */
  group?: string
  side: ReactNode
  title: ReactNode
  sub?: ReactNode
  children: ReactNode
}

/** Opens itself when the URL hash names it, so links such as /bedrock#trinity land on an open entry. */
export function Entry({ id, group, side, title, sub, children }: EntryProps) {
  const details = useRef<HTMLDetailsElement>(null)
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === `#${id}` && details.current) details.current.open = true
  }, [hash, id])

  return (
    <article className="ex" id={id}>
      <span className="ex-line" aria-hidden="true" data-motion="rule" data-enter="92%" />
      <details ref={details} className="ex-d" name={group}>
        <summary className="ex-sum">
          <div className="ex-side">{side}</div>
          <div className="ex-head">
            <h2 className="m-text-4 ex-title">{title}</h2>
            {sub && <div className="m-text">{sub}</div>}
          </div>
          <Plus />
        </summary>
        <div className="ex-body">
          <div className="ex-main">{children}</div>
        </div>
      </details>
    </article>
  )
}

export function Prose({ text }: { text: string }) {
  const parts = text.split('\n\n').map(p => p.trim()).filter(Boolean)
  return (
    <div className="m-prose m-text">
      {parts.map((p, i) => {
        const n = /^(\d+)\.\s*/.exec(p)
        return n
          ? <p key={i} className="is-num" data-n={n[1].padStart(2, '0')}>{p.slice(n[0].length)}</p>
          : <p key={i}>{p}</p>
      })}
    </div>
  )
}

export function Sources({ items }: { items: ReactNode[] }) {
  if (!items.length) return null
  return (
    <details className="ex-src">
      <summary className="m-chip">Sources <span className="m-chip__n">{items.length}</span></summary>
      <ul className="m-text-3">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
    </details>
  )
}
