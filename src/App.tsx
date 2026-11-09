/**
 * src/App.tsx
 * Routes. Every page renders inside the shared Layout (nav, footer, scroll and motion wiring).
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Bedrock from '@/pages/Bedrock'
import TheDig from '@/pages/TheDig'
import TheGallery from '@/pages/TheGallery'
import Faultlines from '@/pages/Faultlines'
import FieldGuide from '@/pages/FieldGuide'
import TheStrata from '@/pages/TheStrata'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bedrock" element={<Bedrock />} />
          <Route path="the-dig" element={<TheDig />} />
          <Route path="the-gallery" element={<TheGallery />} />
          <Route path="faultlines" element={<Faultlines />} />
          <Route path="field-guide" element={<FieldGuide />} />
          <Route path="the-strata" element={<TheStrata />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
