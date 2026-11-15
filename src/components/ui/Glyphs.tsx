import { STRENGTH } from '@/lib/content'
import type { Strength as StrengthKey } from '@/types'

/** Small inline marks shared across pages: the evidence-strength meter, the plus/minus toggle, an arrow. */

/** Three rising bars filled to the strength of the evidence (settled 3, strong 2, debated 1), with its label. */
export function Strength({ value, label = true }: { value: StrengthKey; label?: boolean }) {
  const s = STRENGTH[value]
  return (
    <span className="m-strength" title={s.text}>
      <span className="m-strength__bars" role="img" aria-label={`Evidence: ${s.label}`}>
        {[1, 2, 3].map(i => <span key={i} className={i <= s.level ? 'is-on' : undefined} style={{ height: `${7 + i * 4}px` }} />)}
      </span>
      {label && <span className="m-text-3">{s.label}</span>}
    </span>
  )
}

export function Plus() {
  return <span className="fq-icon" aria-hidden="true" />
}

export function Arrow() {
  return (
    <svg className="m-arrow" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M1 5h13M10 1l4 4-4 4" />
    </svg>
  )
}
