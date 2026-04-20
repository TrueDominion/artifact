import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle: string
  label?: string
}

export default function SectionHeader({ title, subtitle, label }: SectionHeaderProps) {
  return (
    <header className="pt-20 pb-16 px-6 lg:px-12 text-center max-w-4xl mx-auto">
      {label && (
        <div className="mb-8">
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C41E3A',
              lineHeight: 1,
            }}
          >
            {label}
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(45, 45, 45, 0.10)',
              marginTop: '10px',
            }}
          />
        </div>
      )}

      <div style={{ overflow: 'hidden' }}>
        <motion.h1
          className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-ink"
          style={{ letterSpacing: '0.02em' }}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
      </div>

      <motion.p
        className="font-serif italic text-xl md:text-2xl text-graphite-light font-normal mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
      >
        {subtitle}
      </motion.p>
    </header>
  )
}
