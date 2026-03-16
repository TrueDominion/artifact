/**
 * src/components/ui/SectionHeader.tsx
 * Full-width section header used at the top of each page.
 * Large tracked serif title, subtitle, optional crimson brushstroke.
 */

import { motion } from 'framer-motion'
import CrimsonBrushstroke from './CrimsonBrushstroke'

interface SectionHeaderProps {
  title: string
  subtitle: string
  showBrushstroke?: boolean
  label?: string
}

export default function SectionHeader({
  title,
  subtitle,
  showBrushstroke = true,
  label,
}: SectionHeaderProps) {
  return (
    <motion.header
      className="pt-20 pb-16 px-6 lg:px-12 text-center max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {label && (
        <p className="label-museum mb-6 text-graphite-soft">{label}</p>
      )}
      <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl tracking-museum text-ink mb-6">
        {title}
      </h1>
      <div className="flex flex-col items-center gap-2">
        <p className="font-serif italic text-xl md:text-2xl text-graphite-light font-normal">
          {subtitle}
        </p>
        {showBrushstroke && (
          <div className="mt-1">
            <CrimsonBrushstroke width={180} animate={true} />
          </div>
        )}
      </div>
    </motion.header>
  )
}
