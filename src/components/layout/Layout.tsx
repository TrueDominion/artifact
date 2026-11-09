/**
 * Root layout: nav, the routed page, footer.
 * Owns route-level scroll (top on navigation, or the #hash target), the smooth wheel and
 * the reveal watcher for [data-motion] elements.
 */

import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import { initWheel, remeasure, useReveal, wheel } from '@/lib/motion'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => { initWheel() }, [])

  useLayoutEffect(() => {
    if (!hash) scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    wheel.reset()
    remeasure()
  }, [pathname, hash])

  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      wheel.reset()
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  useReveal(pathname)

  return (
    <>
      <Nav />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
