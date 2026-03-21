/**
 * src/components/layout/Footer.tsx
 * Minimal footer for artiFACT.
 * Left: wordmark. Center: navigation links. Right: closing italic.
 * No social icons. No newsletter. Clean and quiet.
 */

import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'BEDROCK', path: '/bedrock' },
  { label: 'THE DIG', path: '/the-dig' },
  { label: 'THE GALLERY', path: '/the-gallery' },
  { label: 'THE STUDIO', path: '/the-studio' },
  { label: 'FAULTLINES', path: '/faultlines' },
  { label: 'THE COLLECTION', path: '/the-collection' },
  { label: 'FIELD GUIDE', path: '/field-guide' },
]

export default function Footer() {
  return (
    <footer className="border-t border-graphite-border bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Wordmark */}
          <Link to="/" className="select-none flex-shrink-0" aria-label="artiFACT home">
            <span className="font-serif text-sm tracking-heading text-ink">
              <span style={{ fontWeight: 400 }}>arti</span>
              <span style={{ fontWeight: 700 }}>FACT</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-sans text-[0.625rem] tracking-museum text-graphite-soft hover:text-graphite-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Closing phrase */}
          <p className="font-serif italic text-sm text-graphite-soft flex-shrink-0">
            The excavation continues.
          </p>
        </div>
      </div>
    </footer>
  )
}
