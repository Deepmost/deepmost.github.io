import { useMemo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WordsPullUp from '../components/WordsPullUp'
import { getPost, posts } from '../content/posts'
import { renderMarkdown } from '../lib/markdown'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Post() {
  const { slug = '' } = useParams()
  const decoded = decodeURIComponent(slug)
  const post = getPost(decoded)

  const html = useMemo(() => (post ? renderMarkdown(post.body) : ''), [post])

  const { scrollYProgress } = useScroll()
  // Spring keeps the reading bar from twitching on fast wheel scrolls.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (!post) {
    return (
      <div className="relative flex min-h-screen flex-col bg-black">
        <div className="bg-noise pointer-events-none fixed inset-0 opacity-[0.12]" />
        <Navbar variant="page" />
        <main className="relative flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
          <p className="text-5xl font-medium text-primary">404</p>
          <p className="text-sm text-gray-500">没有找到这篇文章。</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-4 text-sm font-medium text-black transition-all duration-300 hover:gap-3"
          >
            回到文章列表
            <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const index = posts.findIndex((p) => p.slug === post.slug)
  const newer = index > 0 ? posts[index - 1] : undefined
  const older = index < posts.length - 1 ? posts[index + 1] : undefined

  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <div className="bg-noise pointer-events-none fixed inset-0 opacity-[0.12]" />

      {/* Reading progress rail */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-primary"
        aria-hidden="true"
      />

      <Navbar variant="page" />

      <main className="relative flex-1 px-4 pb-24 pt-14 sm:px-6 sm:pt-20 md:px-8">
        <article className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-1.5 text-[11px] text-gray-500 transition-colors duration-300 hover:text-primary sm:text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              全部文章
            </Link>
          </motion.div>

          <header className="mt-8 border-b border-white/5 pb-10">
            <div style={{ color: '#E1E0CC' }}>
              <WordsPullUp
                text={post.title}
                stagger={0.04}
                className="text-3xl font-medium leading-[1.2] tracking-[-0.02em] sm:text-4xl md:text-5xl"
              />
            </div>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] text-gray-500 sm:text-xs"
            >
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.dateText}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingMinutes} 分钟阅读
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 text-primary/70 transition-colors duration-300 hover:border-primary/50 hover:text-primary"
                >
                  {tag}
                </Link>
              ))}
            </motion.div>
          </header>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="prose-prisma mt-10"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Prev / next, ordered newest-first to match the list page */}
          <nav className="mt-16 grid grid-cols-1 gap-3 border-t border-white/5 pt-10 sm:grid-cols-2">
            {[
              { post: newer, label: '更新的一篇', align: 'left' as const },
              { post: older, label: '更早的一篇', align: 'right' as const },
            ].map(({ post: sibling, label, align }) =>
              sibling ? (
                <Link
                  key={label}
                  to={`/post/${encodeURIComponent(sibling.slug)}`}
                  className={`group rounded-2xl border border-white/5 bg-[#101010] p-5 transition-all duration-300 hover:border-primary/20 hover:bg-[#161615] ${
                    align === 'right' ? 'sm:text-right' : ''
                  }`}
                >
                  <p className="text-[10px] text-gray-600 sm:text-xs">{label}</p>
                  <p
                    className="mt-2 text-sm leading-snug transition-opacity duration-300 group-hover:opacity-80"
                    style={{ color: '#E1E0CC' }}
                  >
                    {sibling.title}
                  </p>
                </Link>
              ) : (
                <span key={label} className="hidden sm:block" />
              )
            )}
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  )
}
