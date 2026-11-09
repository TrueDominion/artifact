/**
 * Line-drawn artifact glyphs (from the original artiFACT exhibit icons), drawn in currentColor
 * so they sit on any surface. Used as photo tiles on the black opening screen.
 */

const paths: Record<string, JSX.Element> = {
  cosmos: (
    <>
      <circle cx="18" cy="18" r="14" />
      <ellipse cx="18" cy="18" rx="14" ry="5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M18 4v4M18 28v4" />
    </>
  ),
  scales: (
    <>
      <path d="M18 6v24M6 12h24M15 30h6" />
      <path d="M6 12s-2 4 0 7 4 0 4-3zM30 12s-2 4 0 7 4 0 4-3z" />
    </>
  ),
  eye: (
    <>
      <path d="M4 18s6-10 14-10 14 10 14 10-6 10-14 10S4 18 4 18z" />
      <circle cx="18" cy="18" r="5" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  strata: (
    <>
      <path d="M3 10h30M5 17h26M8 24h20M12 30h12" />
      <circle cx="18" cy="13.5" r="1.6" />
    </>
  ),
}

export function Glyph({ name, className }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.cosmos}
    </svg>
  )
}

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
