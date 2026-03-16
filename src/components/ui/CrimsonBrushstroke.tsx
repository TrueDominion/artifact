/**
 * CrimsonBrushstroke.tsx
 * Animated hand-drawn SVG brushstroke in crimson (#C41E3A).
 * Used as a curator's mark beneath headings and section labels.
 * Accepts width and animate props; draws itself left-to-right via stroke-dashoffset.
 */

import { motion } from 'framer-motion'

interface CrimsonBrushstrokeProps {
  width?: number
  animate?: boolean
  className?: string
}

export default function CrimsonBrushstroke({
  width = 200,
  animate = true,
  className = '',
}: CrimsonBrushstrokeProps) {
  const height = 16
  // Slightly irregular hand-drawn path
  const path = `M4,8 C${width * 0.15},4 ${width * 0.3},10 ${width * 0.5},7 C${width * 0.68},4 ${width * 0.82},9 ${width - 4},6`
  const pathLength = width * 1.05 // approximate

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={path}
        stroke="#C41E3A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 0.9, ease: 'easeOut', delay: 0.5 },
          opacity: { duration: 0.3, delay: 0.5 },
        }}
      />
    </svg>
  )
}
