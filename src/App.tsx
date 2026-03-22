/**
 * src/App.tsx
 * Root application component for artiFACT.
 * Defines all routes via React Router v6.
 * Wraps all pages in the shared Layout component.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Bedrock from '@/pages/Bedrock'
import TheDig from '@/pages/TheDig'
import TheGallery from '@/pages/TheGallery'
import Faultlines from '@/pages/Faultlines'
import TheCollection from '@/pages/TheCollection'
import FieldGuide from '@/pages/FieldGuide'

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
          <Route path="the-collection" element={<TheCollection />} />
          <Route path="field-guide" element={<FieldGuide />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
