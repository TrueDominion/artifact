/**
 * src/components/home/HeroSection.tsx
 * Full-viewport hero section for the artiFACT homepage.
 * Statue rises from below on load; headline appears after 400ms delay.
 * Crimson brushstroke draws beneath "foundations".
 * Scroll indicator: thin vertical line + animated downward chevron.
 */

import { motion } from 'framer-motion'
import StatueSVG from './StatueSVG'
import CrimsonBrushstroke from '@/components/ui/CrimsonBrushstroke'

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6">

      {/* Headline */}
      <motion.div
        className="text-center z-10 mb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
      >
        <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-ink tracking-heading leading-tight max-w-2xl mx-auto">
          Excavating the{' '}
          <span className="relative inline-block">
            foundations
            <span className="absolute -bottom-3 left-0 w-full flex justify-center">
              <CrimsonBrushstroke width={200} animate={true} />
            </span>
          </span>{' '}
          of belief.
        </h1>
      </motion.div>

      {/* Statue */}
      <motion.div
        className="z-10 w-full max-w-[260px] md:max-w-[300px] mx-auto"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      >
        <img
  src="/images/statue.png"
  alt="Broken classical marble torso emerging from sand"
  className="w-full max-w-xs mx-auto opacity-90"
/>
      </motion.div>

      {/* Subheadline */}
      <motion.p
        className="font-sans font-light text-sm md:text-base text-graphite-light tracking-wider mt-6 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
      >
        A modern museum of ancient arguments.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-graphite-border" />
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
