import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden px-8 md:px-16 lg:px-24 pt-20">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-center gap-12 md:gap-20">

        {/* Left: text content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Eyebrow */}
          <p className="type-label mb-6">
            Built for conversations with Muslims · Reformed apologetics
          </p>

          {/* Headline */}
          <h1 className="type-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight max-w-3xl">
            The{' '}
            <span className="relative inline-block">
              foundations
            </span>{' '}
            of Christian belief — examined.
          </h1>

          {/* Subheadline */}
          <p className="prose-constrained text-[#2D2D2D] font-light text-lg leading-relaxed mt-4 max-w-2xl">
            Truth can withstand examination. Equip yourself with clear, historically
            grounded answers to the hardest questions Christians face.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            {/* PRIMARY */}
            <a
              href="/field-guide"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C41E3A] text-white type-label hover:bg-[#a01830] transition-colors duration-300 rounded-none"
            >
              ENTER THE FIELD GUIDE
            </a>
            {/* SECONDARY */}
            <a
              href="/bedrock"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#2D2D2D] text-[#2D2D2D] type-label hover:bg-[#FAF8F5] transition-colors duration-300 rounded-none"
            >
              EXPLORE BEDROCK
            </a>
          </div>
        </motion.div>

        {/* Right: illustration */}
        <motion.div
          className="flex-shrink-0 flex justify-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          <img
            src="/images/statue.png"
            alt="Excavation illustration"
            className="w-full max-w-sm"
            style={{ filter: 'grayscale(100%) contrast(1.1)' }}
          />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, delay: 1.5 }}
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-[#E8E8E8]" />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
