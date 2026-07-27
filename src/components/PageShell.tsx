import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import WordsPullUp from './WordsPullUp'

interface PageShellProps {
  /** Small uppercase label above the page title. */
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}

/**
 * Shared frame for the inner blog pages. Reuses the landing page's noise
 * texture, cream palette and pull-up heading so navigating away from the hero
 * does not feel like landing on a different site.
 */
export default function PageShell({ eyebrow, title, subtitle, children }: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <div className="bg-noise pointer-events-none fixed inset-0 opacity-[0.12]" />

      <Navbar variant="page" />

      <main className="relative flex-1 px-4 pb-24 pt-14 sm:px-6 sm:pt-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.18em] text-primary sm:text-xs"
          >
            {eyebrow}
          </motion.p>

          <div style={{ color: '#E1E0CC' }}>
            <WordsPullUp
              text={title}
              stagger={0.05}
              className="mt-3 text-4xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-5xl md:text-6xl"
            />
          </div>

          {subtitle && (
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-2xl text-xs leading-[1.8] text-primary/60 sm:text-sm"
            >
              {subtitle}
            </motion.p>
          )}

          <div className="mt-12 sm:mt-16">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
