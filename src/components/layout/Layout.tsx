/**
 * src/components/layout/Layout.tsx
 * Root layout wrapper for artiFACT.
 * Composes Navbar + main content + Footer.
 * Applies Framer Motion page transition on route change.
 */

import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut',
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink">
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="flex-1 pt-16"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
