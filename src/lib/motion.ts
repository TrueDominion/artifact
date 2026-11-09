/**
 * src/lib/motion.ts
 * React port of the Evenkeel motion kit (8B, MIT).
 *
 * The scroll motion itself is CSS (scroll-driven animations under [data-live]).
 * This module only does what CSS cannot:
 *   - measures layout into custom properties that the scenes read (useMeasure)
 *   - reports scroll progress through an element (useTrack)
 *   - marks [data-motion] elements .is-in as they reach their reading line (useReveal)
 *   - smooths the mouse wheel (initWheel)
 *
 * index.html sets data-live on <html> only when scroll-driven animations are supported and
 * reduced motion is off. Without it every hook is a no-op and each section renders finished.
 */

import { useEffect, useLayoutEffect, type RefObject } from 'react'

export const live =
  typeof document !== 'undefined' && document.documentElement.hasAttribute('data-live')

type Measure = () => void

const measures = new Set<Measure>()
let queued = false
let observing = false

const safe = (fn: Measure) => {
  try { fn() } catch (error) { console.error('[motion] measure failed', error) }
}

/** Restart running scroll-timeline animations so they pick up freshly measured custom properties. */
const realign = () => {
  document.getAnimations().forEach(animation => {
    if (animation.timeline && animation.timeline !== document.timeline && animation.playState === 'running') {
      animation.pause()
      animation.play()
    }
  })
}

export const remeasure = () => {
  if (!live || queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    measures.forEach(safe)
    realign()
  })
}

const observe = () => {
  if (observing) return
  observing = true
  new ResizeObserver(remeasure).observe(document.body)
  document.fonts?.ready.then(remeasure)
  addEventListener('load', remeasure)
}

/** Page offset of an element, unaffected by transforms (the scenes transform what they measure). */
export function box(element: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = element
  while (node) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y, w: element.offsetWidth, h: element.offsetHeight }
}

export function setVars(element: HTMLElement, vars: Record<string, string | number>) {
  for (const [name, value] of Object.entries(vars)) element.style.setProperty(name, String(value))
}

/** Run fn now, on every resize of the page and once fonts settle. */
export function useMeasure(fn: Measure, deps: unknown[] = []) {
  useLayoutEffect(() => {
    if (!live) return
    observe()
    measures.add(fn)
    safe(fn)
    requestAnimationFrame(realign)
    return () => { measures.delete(fn) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/**
 * Scroll progress through an element, 0 when its top meets the viewport top,
 * 1 when its bottom meets the viewport bottom (the "0% 0%" to "100% 100%" range of the template).
 */
export function useTrack(ref: RefObject<HTMLElement>, onProgress: (p: number) => void) {
  useEffect(() => {
    const element = ref.current
    if (!live || !element) return
    let pending = false
    const run = () => {
      pending = false
      const r = element.getBoundingClientRect()
      const d0 = r.top
      const d1 = r.bottom - innerHeight
      onProgress(d1 === d0 ? (d0 <= 0 ? 1 : 0) : Math.min(1, Math.max(0, -d0 / (d1 - d0))))
    }
    const onScroll = () => { if (!pending) { pending = true; requestAnimationFrame(run) } }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    run()
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}

/**
 * Marks [data-motion] elements .is-in once their top passes their reading line
 * (data-enter, a percentage of the viewport height; 88% by default). Elements that
 * React adds later (filters, opened panels) are picked up by a MutationObserver.
 */
export function useReveal(key: unknown) {
  useEffect(() => {
    if (!live) return
    let pending: HTMLElement[] = []
    let frame = 0
    const at = (el: HTMLElement) => {
      const own = /^(\d{1,3}(?:\.\d+)?)%$/.exec((el.dataset.enter || '').trim())
      return own && +own[1] <= 100 ? +own[1] / 100 : 0.88
    }
    const check = () => {
      frame = 0
      pending = pending.filter(el => {
        if (!el.isConnected) return false
        if (el.getBoundingClientRect().top > innerHeight * at(el)) return true
        el.classList.add('is-in')
        return false
      })
    }
    const queue = () => { if (!frame) frame = requestAnimationFrame(check) }
    const scan = () => {
      pending = [...document.querySelectorAll<HTMLElement>('[data-motion]:not(.is-in)')]
      queue()
    }
    scan()
    const mutations = new MutationObserver(scan)
    mutations.observe(document.body, { childList: true, subtree: true })
    addEventListener('scroll', queue, { passive: true })
    addEventListener('resize', queue)
    return () => {
      mutations.disconnect()
      removeEventListener('scroll', queue)
      removeEventListener('resize', queue)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [key])
}

/** Smooth mouse-wheel scrolling, as in the template. Touch and keyboard scrolling are untouched. */
export const wheel = {
  paused: false,
  stop() { this.paused = true },
  start() { this.paused = false },
  /** Forget any glide in progress (call after programmatic jumps such as route changes). */
  reset: () => {},
}

let wheelReady = false

export function initWheel() {
  if (!live || wheelReady || !matchMedia('(pointer: fine)').matches) return
  wheelReady = true
  let target = scrollY
  let current = scrollY
  let last = 0
  let running = false

  const inner = (start: EventTarget | null, dy: number) => {
    for (let node = start as HTMLElement | null; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
      if (!/(auto|scroll)/.test(getComputedStyle(node).overflowY) || node.scrollHeight <= node.clientHeight) continue
      if (dy > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 0) return true
    }
    return false
  }

  const step = (now: number) => {
    if (!running) return
    current += (target - current) * (1 - Math.exp(-5.3 * Math.min(0.05, (now - last) / 1000)))
    last = now
    if (Math.abs(target - current) < 0.5) current = target
    scrollTo({ top: current, behavior: 'instant' as ScrollBehavior })
    if (current !== target) requestAnimationFrame(step)
    else running = false
  }

  addEventListener('wheel', event => {
    if (wheel.paused || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || inner(event.target, event.deltaY)) return
    event.preventDefault()
    if (!running) target = current = scrollY
    const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? innerHeight : 1
    target = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, target + event.deltaY * unit * 0.95))
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(step) }
  }, { passive: false })

  wheel.reset = () => { running = false; target = current = scrollY }
}
