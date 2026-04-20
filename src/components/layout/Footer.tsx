import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'BEDROCK', path: '/bedrock' },
  { label: 'THE DIG', path: '/the-dig' },
  { label: 'THE GALLERY', path: '/the-gallery' },
  { label: 'FAULTLINES', path: '/faultlines' },
  { label: 'FIELD GUIDE', path: '/field-guide' },
]

const linkStyle: React.CSSProperties = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontWeight: 400,
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#9A9A9A',
  textDecoration: 'none',
  transition: 'color 250ms ease-out',
}

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#FAF8F5',
        borderTop: '1px solid rgba(45,45,45,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Left: site name + tagline */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Link to="/" className="select-none flex items-baseline" aria-label="artiFACT home">
              <span
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: '#C41E3A',
                  lineHeight: 1,
                }}
              >
                arti
              </span>
              <span
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#1A1A1A',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                FACT
              </span>
            </Link>
            <p
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '0.8rem',
                color: '#9A9A9A',
              }}
            >
              Truth can withstand examination.
            </p>
          </div>

          {/* Right: nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={linkStyle}
                    className="hover:!text-graphite"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
