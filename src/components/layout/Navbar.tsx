import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'BEDROCK',     path: '/bedrock' },
  { label: 'DIG',         path: '/the-dig' },
  { label: 'GALLERY',     path: '/the-gallery' },
  { label: 'FAULTLINES',  path: '/faultlines' },
  { label: 'FIELD GUIDE', path: '/field-guide' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? 'bg-white border-b border-[#E8E4DF]'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ height: '68px' }}
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
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10 nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`type-label transition-opacity duration-300 hover:opacity-60 ${
                    isActive(item.path)
                      ? 'border-b-2 border-[#C41E3A] pb-0.5 !text-[#1A1A1A]'
                      : ''
                  }`}
                  style={{ textDecoration: 'none' }}
                >
                  {item.label}
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
            <span className="block w-6 h-px bg-[#2D2D2D]" />
            <span className="block w-4 h-px bg-[#2D2D2D]" />
            <span className="block w-6 h-px bg-[#2D2D2D]" />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 type-label text-[#2D2D2D] hover:opacity-60 transition-opacity duration-200"
              style={{ fontSize: '1.5rem', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              aria-label="Close navigation menu"
            >
              ×
            </button>

            <ul className="nav-list flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 700,
                      fontSize: '1.875rem',
                      color: '#1A1A1A',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
