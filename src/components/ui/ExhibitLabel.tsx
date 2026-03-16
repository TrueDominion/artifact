/**
 * src/components/ui/ExhibitLabel.tsx
 * Exhibit label typography component and inline SVG icon sets.
 * ArtifactIcon: argument category icons (cosmos, telescope, scales, etc.)
 * WorldviewSymbol: tradition symbols (crescent, atom, dharma-wheel, etc.)
 * ThinkerBust: simplified line portrait silhouettes.
 */

// ── ExhibitLabel ─────────────────────────────────────────

interface ExhibitLabelProps {
  text: string
  className?: string
}

export default function ExhibitLabel({ text, className = '' }: ExhibitLabelProps) {
  return (
    <span
      className={`font-sans text-[0.6rem] uppercase tracking-museum text-graphite-soft ${className}`}
    >
      {text}
    </span>
  )
}

// ── ArtifactIcon ──────────────────────────────────────────

const artifactIcons: Record<string, JSX.Element> = {
  cosmos: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="18" cy="18" r="14" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="18" cy="18" rx="14" ry="5" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="18" cy="18" r="2.5" stroke="#2D2D2D" strokeWidth="0.9" />
      <line x1="18" y1="4" x2="18" y2="8" stroke="#2D2D2D" strokeWidth="0.7" />
      <line x1="18" y1="28" x2="18" y2="32" stroke="#2D2D2D" strokeWidth="0.7" />
    </svg>
  ),
  telescope: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M6,26 L18,10 L30,18" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="26" x2="18" y2="10" stroke="#2D2D2D" strokeWidth="0.7" />
      <circle cx="18" cy="10" r="3" stroke="#2D2D2D" strokeWidth="0.9" />
      <path d="M15,26 L21,26" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  scales: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="18" y1="6" x2="18" y2="30" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="6" y1="12" x2="30" y2="12" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M6,12 C6,12 4,16 6,19 C8,22 10,19 10,16 Z" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M30,12 C30,12 28,16 30,19 C32,22 34,19 34,16 Z" stroke="#2D2D2D" strokeWidth="0.8" />
      <line x1="15" y1="30" x2="21" y2="30" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="18" cy="18" r="13" stroke="#2D2D2D" strokeWidth="1" />
      <path d="M18,8 L20,18 L18,28 L16,18 Z" stroke="#2D2D2D" strokeWidth="0.8" />
      <path d="M8,18 L18,16 L28,18 L18,20 Z" stroke="#2D2D2D" strokeWidth="0.8" />
      <circle cx="18" cy="18" r="1.5" stroke="#2D2D2D" strokeWidth="0.7" />
    </svg>
  ),
  stone: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8,28 C8,28 6,20 10,14 C14,8 22,7 26,12 C30,17 30,26 28,29 Z" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14,28 C14,28 13,22 15,18 C17,14 21,14 22,18" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4,18 C4,18 10,8 18,8 C26,8 32,18 32,18 C32,18 26,28 18,28 C10,28 4,18 4,18 Z" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" />
      <circle cx="18" cy="18" r="5" stroke="#2D2D2D" strokeWidth="0.9" />
      <circle cx="18" cy="18" r="2" stroke="#2D2D2D" strokeWidth="0.7" />
    </svg>
  ),
}

interface ArtifactIconProps {
  svgKey: string
  className?: string
}

export function ArtifactIcon({ svgKey, className = 'w-9 h-9' }: ArtifactIconProps) {
  return (
    <div className={className}>
      {artifactIcons[svgKey] ?? artifactIcons['cosmos']}
    </div>
  )
}

// ── WorldviewSymbol ──────────────────────────────────────

const worldviewSymbols: Record<string, JSX.Element> = {
  crescent: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M38,12 C26,14 18,24 18,36 C18,46 24,54 34,56 C22,54 14,44 14,32 C14,20 22,10 34,8 Z" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="20" r="3" stroke="#2D2D2D" strokeWidth="1" />
    </svg>
  ),
  atom: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="30" cy="30" r="4" stroke="#2D2D2D" strokeWidth="1.1" />
      <ellipse cx="30" cy="30" rx="22" ry="8" stroke="#2D2D2D" strokeWidth="1" />
      <ellipse cx="30" cy="30" rx="22" ry="8" stroke="#2D2D2D" strokeWidth="1" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" stroke="#2D2D2D" strokeWidth="1" transform="rotate(120 30 30)" />
    </svg>
  ),
  'dharma-wheel': (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="30" cy="30" r="22" stroke="#2D2D2D" strokeWidth="1" />
      <circle cx="30" cy="30" r="5" stroke="#2D2D2D" strokeWidth="1.1" />
      {[0,45,90,135,180,225,270,315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 30 + 5 * Math.cos(rad)
        const y1 = 30 + 5 * Math.sin(rad)
        const x2 = 30 + 22 * Math.cos(rad)
        const y2 = 30 + 22 * Math.sin(rad)
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2D2D2D" strokeWidth="0.9" />
      })}
    </svg>
  ),
  'human-figure': (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="30" cy="14" r="6" stroke="#2D2D2D" strokeWidth="1.1" />
      <path d="M30,20 L30,40" stroke="#2D2D2D" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M18,28 L42,28" stroke="#2D2D2D" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M30,40 L20,52" stroke="#2D2D2D" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M30,40 L40,52" stroke="#2D2D2D" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
}

interface WorldviewSymbolProps {
  svgKey: string
  className?: string
}

export function WorldviewSymbol({ svgKey, className = 'w-14 h-14' }: WorldviewSymbolProps) {
  return (
    <div className={className}>
      {worldviewSymbols[svgKey] ?? worldviewSymbols['human-figure']}
    </div>
  )
}

// ── ThinkerBust ──────────────────────────────────────────

const thinkerBusts: Record<string, JSX.Element> = {
  default: (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Head */}
      <ellipse cx="40" cy="28" rx="16" ry="18" stroke="#2D2D2D" strokeWidth="1" />
      {/* Neck */}
      <path d="M33,44 L33,52 M47,44 L47,52" stroke="#2D2D2D" strokeWidth="0.9" strokeLinecap="round" />
      {/* Shoulders / toga */}
      <path d="M10,90 C12,68 24,58 33,54 L40,52 L47,54 C56,58 68,68 70,90" stroke="#2D2D2D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      {/* Drape folds */}
      <path d="M22,90 C24,74 30,64 36,60" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
      <path d="M58,90 C56,74 50,64 44,60" stroke="#2D2D2D" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
      {/* Facial features - minimal */}
      <path d="M33,26 C35,24 38,23 40,23 C42,23 45,24 47,26" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
      <path d="M36,32 C38,34 42,34 44,32" stroke="#2D2D2D" strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
}

interface ThinkerBustProps {
  svgKey: string
  className?: string
}

export function ThinkerBust({ svgKey: _svgKey, className = 'w-16 h-20' }: ThinkerBustProps) {
  return (
    <div className={className}>
      {thinkerBusts['default']}
    </div>
  )
}
