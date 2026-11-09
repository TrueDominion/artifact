/** Small inline marks shared across pages: severity bars, the plus/minus toggle, an arrow. */

/** Five rising bars; filled to the given level in the accent colour. */
export function Severity({ level }: { level: number }) {
  return (
    <span className="m-severity" role="img" aria-label={`Severity ${level} of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= level ? 'is-on' : undefined} style={{ height: `${6 + i * 3}px` }} />
      ))}
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
