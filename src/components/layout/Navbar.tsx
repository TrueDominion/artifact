/**
 * src/components/layout/Navbar.tsx
 * Museum floor-plan navigation for artiFACT.
 * Desktop: wordmark left, nav items centered, crimson active brushstroke.
 * Mobile: hamburger icon opens full-screen white overlay.
 * Scroll: gains subtle box-shadow.
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import CrimsonBrushstroke from '@/components/ui/CrimsonBrushstroke'

interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'BEDROCK', path: '/bedrock' },
  { label: 'THE DIG', path: '/the-dig' },
  { label: 'THE GALLERY', path: '/the-gallery' },
  { label: 'FAULTLINES', path: '/faultlines' },
  { label: 'THE COLLECTION', path: '/the-collection' },
  { label: 'FIELD GUIDE', path: '/field-guide' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
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
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-graphite-border transition-shadow duration-400 ${
          scrolled ? 'shadow-navbar' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

          <Link
            to="/"
            className="flex-shrink-0 select-none"
            aria-label="artiFACT — home"
          >
            <span className="font-serif text-xl tracking-heading text-ink leading-none">
              <span style={{ fontWeight: 400 }}>arti</span>
              <span style={{ fontWeight: 700 }}>FACT</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <li key={item.path} className="relative flex flex-col items-center">
                <Link
                  to={item.path}
                  className={`font-sans text-xs tracking-museum transition-colors duration-300 pb-1 ${
                    isActive(item.path)
                      ? 'text-ink'
                      : 'text-graphite-light hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CrimsonBrushstroke width={item.label.length * 7 + 10} animate={false} />
                  </motion.div>
                )}
              </li>
            ))}
          </ul>

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <button
              className="absolute top-5 right-6 text-graphite-light hover:text-ink transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>

            <Link to="/" className="mb-12 select-none" onClick={() => setMenuOpen(false)}>
              <span className="font-serif text-2xl tracking-heading text-ink">
                <span style={{ fontWeight: 400 }}>arti</span>
                <span style={{ fontWeight: 700 }}>FACT</span>
              </span>
            </Link>

            <ul className="flex flex-col items-center gap-7">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35, ease: 'easeOut' }}
                >
                  <Link
                    to={item.path}
                    className={`font-serif text-2xl tracking-heading transition-colors duration-300 ${
                      isActive(item.path) ? 'text-ink' : 'text-graphite-light hover:text-ink'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
