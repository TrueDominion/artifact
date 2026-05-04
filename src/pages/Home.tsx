import { motion } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection'

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* ── DIVIDER ── */}
      <div className="w-full border-t border-[#E8E4DF] my-0" />

      {/* ── FEATURED SECTION — Islam & the Christian Faith ── */}
      <motion.section
        className="bg-[#FAF8F5] py-20 px-8 md:px-16 lg:px-24"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-12">
          <div className="flex-1">
            <p className="type-label mb-4">THE PRIMARY EXCAVATION</p>
            <h2 className="type-display text-3xl md:text-4xl text-[#1A1A1A] leading-tight mb-6">
              Islam &amp; the Christian Faith
            </h2>
            <p className="prose-constrained text-[#2D2D2D] font-light text-base leading-relaxed mb-8">
              The most pressing theological conversation of our time. Equip yourself
              with clear, historically grounded responses to the hardest questions
              Muslims ask Christians.
            </p>
            <a
              href="/faultlines"
              className="text-[#C41E3A] type-label hover:opacity-70 transition-opacity duration-300"
            >
              ENTER FAULTLINES →
            </a>
          </div>
          {/* Decorative strata SVG */}
          <div className="flex-shrink-0 hidden md:block">
            <svg viewBox="0 0 200 160" width="200" height="160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="0"   y1="30"  x2="200" y2="30"  stroke="#2D2D2D" strokeWidth="1" />
              <line x1="20"  y1="70"  x2="180" y2="70"  stroke="#C41E3A" strokeWidth="1.5" />
              <line x1="40"  y1="110" x2="160" y2="110" stroke="#2D2D2D" strokeWidth="0.75" />
              <line x1="60"  y1="145" x2="140" y2="145" stroke="#2D2D2D" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </motion.section>

      {/* ── SECONDARY SECTIONS — two column ── */}
      <section className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#E8E4DF]">

          {/* Field Guide */}
          <div className="py-8 md:py-0 md:pr-12">
            <p className="type-label mb-3">FIELD GUIDE</p>
            <p className="prose-constrained text-[#2D2D2D] font-light text-sm leading-relaxed mb-4">
              A two-step challenge reference organized by tradition. Select a worldview,
              surface the hardest objections, and find Reformed responses grounded in
              historical theology.
            </p>
            <a href="/field-guide" className="type-label text-[#1A1A1A] hover:opacity-60 transition-opacity duration-300">
              OPEN FIELD GUIDE →
            </a>
          </div>

          {/* The Dig */}
          <div className="py-8 md:py-0 md:pl-12">
            <p className="type-label mb-3">THE DIG</p>
            <p className="prose-constrained text-[#2D2D2D] font-light text-sm leading-relaxed mb-4">
              Six philosophical arguments for the existence of God — each excavated,
              examined, and presented as a museum object worth holding.
            </p>
            <a href="/the-dig" className="type-label text-[#1A1A1A] hover:opacity-60 transition-opacity duration-300">
              ENTER THE DIG →
            </a>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="border-t border-[#E8E4DF] max-w-6xl mx-auto px-8 md:px-16 lg:px-24" />

      {/* ── TERTIARY SECTIONS — three column ── */}
      <section className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-12 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <div>
            <p className="type-label mb-2">BEDROCK</p>
            <p className="type-caption mb-3">Core Christian doctrines presented as museum plaques — the immovable foundation.</p>
            <a href="/bedrock" className="type-label text-[#1A1A1A] hover:opacity-60 transition-opacity duration-300 text-xs">VIEW BEDROCK →</a>
          </div>

          <div>
            <p className="type-label mb-2">THE GALLERY</p>
            <p className="type-caption mb-3">Four worldviews in exhibit and critique — Islam, Atheism, Mormonism, and Secular Humanism.</p>
            <a href="/the-gallery" className="type-label text-[#1A1A1A] hover:opacity-60 transition-opacity duration-300 text-xs">ENTER GALLERY →</a>
          </div>

          <div>
            <p className="type-label mb-2">THE EXCAVATION</p>
            <p className="type-caption mb-3">More chambers are being opened. The dig continues.</p>
          </div>

        </div>
      </section>
    </>
  )
}
