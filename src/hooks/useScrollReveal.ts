/**
 * src/hooks/useScrollReveal.ts
 * Custom hook wrapping Framer Motion's useInView for scroll-triggered reveals.
 * Returns a ref to attach to the target element and a boolean indicating visibility.
 * Used throughout the site for staggered card entrances.
 */

import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseScrollRevealOptions {
  once?: boolean
  amount?: number | 'some' | 'all'
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    once = true,
    amount = 0.1,
  } = options

  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once, amount })

  return { ref, isInView }
}

// Variant presets for Framer Motion
export const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export const revealTransition = {
  duration: 0.5,
  ease: 'easeOut' as const,
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
