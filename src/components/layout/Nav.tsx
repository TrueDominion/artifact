/**
 * Round logo mark top-left, a Menu button top-right, and a full-screen menu whose links
 * hang on the vertical rule. Hides on scroll down, returns on scroll up or focus.
 */

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { wheel } from '@/lib/motion'
import { EMAIL, ROOMS } from '@/lib/content'

const LINKS = [
  { to: '/', label: 'Home' },
  ...ROOMS.map(r => ({ to: r.path, label: r.name })),
  { to: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let last = scrollY
    const onScroll = () => {
      const y = scrollY
      if (Math.abs(y - last) < 4) return
      setHidden(y > last && y > 140)
      last = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (open) {
      wheel.stop()
      menu.current?.querySelector('a')?.focus()
    } else {
      wheel.start()
    }
  }, [open])

  const shut = (focus = true) => {
    setOpen(false)
    if (focus) button.current?.focus()
  }

  return (
    <header className={`nav${hidden && !open ? ' is-hidden' : ''}`} onFocus={() => setHidden(false)}>
      <Link className="nav__logo" to="/">
        <span className="nav__mark" aria-hidden="true" />
        <span className="sr-only">artiFACT, home</span>
      </Link>
      <button
        ref={button}
        className="m-btn-3 nav__menu"
        type="button"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen(true)}
      >
        <span className="m-btn-3__label">Menu</span>
      </button>

      <div
        ref={menu}
        className="menu"
        id="menu"
        hidden={!open}
        onKeyDown={e => { if (e.key === 'Escape') shut() }}
      >
        <span className="menu__rule" aria-hidden="true" />
        <div className="menu__top">
          <button className="m-icon menu__close" type="button" aria-label="Close menu" onClick={() => shut()}>
            <svg className="m-icon__glyph" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>
        <nav aria-label="Main">
          <ul className="menu__list">
            {LINKS.map(link => (
              <li key={link.to}>
                <NavLink
                  className="m-link-3"
                  to={link.to}
                  end
                  onClick={() => shut(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <p className="m-text-3">A modern museum of ancient arguments</p>
          <p className="m-text-3"><a className="m-link" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        </div>
      </div>
    </header>
  )
}
