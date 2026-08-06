import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Archives from './pages/Archives'
import Tags from './pages/Tags'
import About from './pages/About'
import NotFound from './pages/NotFound'

/** Browsers restore scroll on client-side navigation; reset it per route. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function RagentDocRedirect() {
  useEffect(() => {
    window.location.replace('/ragent-doc/index.html')
  }, [])

  return null
}

function CodetopTop200Redirect() {
  useEffect(() => {
    window.location.replace('/codetop-top200/codetop_top200.html')
  }, [])

  return null
}

export default function App() {
  const location = useLocation()

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <ScrollToTop />

      {/*
       * Keyed fade on the route wrapper: enough to soften navigation without
       * fighting the per-element pull-up animations inside each page.
       */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/about" element={<About />} />
          <Route path="/ragent-doc" element={<RagentDocRedirect />} />
          <Route path="/codetop-top200" element={<CodetopTop200Redirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </div>
  )
}
