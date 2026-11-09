/**
 * Tagline, room links, an email icon, the full-width "arti FACT" wordmark in two halves,
 * and the grey half-names that wait in the screen corners until the wordmark grows out of them.
 */

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { box, setVars, useMeasure } from '@/lib/motion'
import { EMAIL, ROOMS } from '@/lib/content'

export default function Footer() {
  const footer = useRef<HTMLElement>(null)
  const wordmark = useRef<HTMLParagraphElement>(null)
  const ghost = useRef<HTMLDivElement>(null)

  useMeasure(() => {
    const f = footer.current, w = wordmark.current, g = ghost.current
    if (!f || !w || !g) return
    setVars(f, {
      '--footer-run': `${document.documentElement.offsetHeight - box(w).y}px`,
      '--footer-from': parseFloat(getComputedStyle(g).fontSize) / parseFloat(getComputedStyle(w).fontSize),
    })
  })

  return (
    <footer ref={footer} className="ft" id="footer">
      <div className="ft-inner">
        <div className="ft-top">
          <p className="m-text-3 ft-tag">artiFACT<br />A modern museum of ancient arguments. The excavation continues.</p>
          <nav aria-label="Footer">
            <ul className="ft-links m-text">
              {ROOMS.map(r => (
                <li key={r.path}><Link className="m-link" to={r.path}>{r.name}</Link></li>
              ))}
            </ul>
          </nav>
          <ul className="ft-icons">
            <li>
              <a className="m-icon" href={`mailto:${EMAIL}`} aria-label={`Write to us at ${EMAIL}`}>
                <svg className="m-icon__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5h17v11h-17z M3.5 7l8.5 6.5L20.5 7" /></svg>
              </a>
            </li>
          </ul>
        </div>
        <p ref={wordmark} className="m-text-2 ft-word" style={{ '--len': 8 } as React.CSSProperties} aria-hidden="true">
          <span className="ft-a">arti</span><span className="ft-b">FACT</span>
        </p>
        <div className="ft-bottom m-text-3">
          <span>© {new Date().getFullYear()} artiFACT</span>
          <a className="m-link" href="#top" onClick={e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }) }}>Back to the top</a>
        </div>
      </div>
      <div ref={ghost} className="ghost m-text-2" aria-hidden="true">
        <span className="ghost__a">arti</span><span className="ghost__b">FACT</span>
      </div>
    </footer>
  )
}
