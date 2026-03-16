/**
 * src/pages/Home.tsx
 * Homepage for artiFACT.
 * Composes HeroSection + SectionPreview.
 */

import HeroSection from '@/components/home/HeroSection'
import SectionPreview from '@/components/home/SectionPreview'

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionPreview />
    </>
  )
}
