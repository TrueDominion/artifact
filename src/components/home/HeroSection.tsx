import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HorizontalRule from '@/components/ui/HorizontalRule'

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
          The{' '}
          <span className="relative inline-block">
            foundations
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <HorizontalRule width="100%" />
            </span>
          </span>{' '}
          of Christian belief — examined.
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
          style={{ filter: 'grayscale(100%) contrast(1.1)' }}
        />
      </motion.div>

      {/* Subheadline */}
      <motion.p
        className="font-sans font-light text-sm md:text-base text-graphite-light tracking-wider mt-6 z-10 text-center max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.9 }}
      >
        Truth can withstand examination.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3 mt-8 z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 1.1 }}
      >
        <Link
          to="/field-guide"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#ffffff',
            backgroundColor: '#1A1A1A',
            padding: '13px 28px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background-color 250ms ease-out',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2D2D2D')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1A1A1A')}
        >
          Prepare for a Conversation
        </Link>
        <Link
          to="/the-dig"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#2D2D2D',
            backgroundColor: 'transparent',
            border: '1px solid rgba(45,45,45,0.22)',
            padding: '13px 28px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color 250ms ease-out',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(45,45,45,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(45,45,45,0.22)')}
        >
          Explore the Arguments
        </Link>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="font-serif italic text-sm text-graphite-soft mt-5 z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 1.35 }}
      >
        Arguments. Evidence. Answers. A museum of ancient truth.
      </motion.p>

      {/* Scroll indicator — no bounce */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, delay: 1.7 }}
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-graphite-border" />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

    </section>
  )
}
