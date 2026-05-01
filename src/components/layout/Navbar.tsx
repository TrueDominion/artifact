import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'FIELD GUIDE', path: '/field-guide' },
  { label: 'BEDROCK', path: '/bedrock' },
  { label: 'THE DIG', path: '/the-dig' },
  { label: 'THE GALLERY', path: '/the-gallery' },
  { label: 'FAULTLINES', path: '/faultlines' },
  { label: 'THE STRATA', path: '/the-strata' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '68px',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(45,45,45,0.1)' : '1px solid transparent',
          transition: 'background-color 300ms ease-out, border-color 300ms ease-out, backdrop-filter 300ms ease-out',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">

          <Link
            to="/"
            className="flex-shrink-0 select-none flex items-baseline"
            aria-label="artiFACT — home"
          >
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: '#1A1A1A',
                lineHeight: 1,
              }}
            >
              arti
            </span>
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: '#1A1A1A',
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              FACT
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <li key={item.path} className="relative flex flex-col items-center">
                <Link
                  to={item.path}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 400,
                    fontSize: '11px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: isActive(item.path) ? '#1A1A1A' : '#9A9A9A',
                    textDecoration: 'none',
                    transition: 'color 300ms ease-out',
                    paddingBottom: '2px',
                    position: 'relative',
                  }}
                  className="hover:!text-ink"
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.span
                      layoutId="nav-active"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        backgroundColor: '#C41E3A',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger — visible below 1024px */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="block w-6 h-px bg-graphite" />
            <span className="block w-4 h-px bg-graphite" />
            <span className="block w-6 h-px bg-graphite" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[99]"
              style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[100] bg-white flex flex-col"
              style={{ width: '280px' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div
                className="flex items-center justify-between px-6"
                style={{ height: '68px', borderBottom: '1px solid rgba(45,45,45,0.08)' }}
              >
                <Link
                  to="/"
                  className="flex items-baseline select-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <span
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      color: '#1A1A1A',
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
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    FACT
                  </span>
                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="opacity-40 hover:opacity-100 transition-opacity duration-200"
                  aria-label="Close navigation menu"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <line x1="2" y1="2" x2="14" y2="14" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="14" y1="2" x2="2" y2="14" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col px-6 pt-8 gap-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.07 * i, duration: 0.3, ease: 'easeOut' }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: 400,
                        fontSize: '11px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: isActive(item.path) ? '#C41E3A' : '#9A9A9A',
                        textDecoration: 'none',
                        transition: 'color 200ms ease-out',
                        display: 'block',
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
