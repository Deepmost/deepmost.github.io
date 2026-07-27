import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Search } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { posts } from '../content/posts'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const activeTag = params.get('tag') ?? ''
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) return false
      if (!q) return true
      return (
        post.title.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [query, activeTag])

  return (
    <PageShell
      eyebrow="Writing"
      title="文章"
      subtitle={`共 ${posts.length} 篇笔记与复盘。搜索标题、正文或标签，也可以按标签筛选。`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="group flex w-full items-center gap-3 rounded-full border border-white/10 bg-[#101010] px-5 py-3 transition-colors duration-300 focus-within:border-primary/40 sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章…"
            aria-label="搜索文章"
            className="w-full bg-transparent text-xs text-primary placeholder:text-gray-600 focus:outline-none sm:text-sm"
          />
        </label>

        {activeTag && (
          <button
            type="button"
            onClick={() => setParams({})}
            className="self-start rounded-full border border-primary/30 px-4 py-1.5 text-[11px] text-primary transition-colors duration-300 hover:border-primary/70 sm:text-xs"
          >
            标签：{activeTag} ✕
          </button>
        )}
      </div>

      <p className="mt-6 text-[11px] text-gray-600 sm:text-xs">
        {filtered.length} 篇结果
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {filtered.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            // Cap the stagger so later items in a long list don't hang.
            transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.5), ease: EASE }}
          >
            <Link
              to={`/post/${encodeURIComponent(post.slug)}`}
              className="group block rounded-2xl border border-white/5 bg-[#101010] p-5 transition-all duration-300 hover:border-primary/20 hover:bg-[#161615] sm:p-7"
            >
              <div className="flex items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
                <span>{post.dateText}</span>
                <span className="h-[3px] w-[3px] rounded-full bg-gray-600" />
                <span>{post.readingMinutes} 分钟阅读</span>
              </div>

              <h2
                className="mt-3 text-lg font-medium leading-snug transition-opacity duration-300 group-hover:opacity-80 sm:text-2xl"
                style={{ color: '#E1E0CC' }}
              >
                {post.title}
              </h2>

              <p className="mt-3 max-w-2xl text-xs leading-[1.8] text-gray-400 sm:text-sm">
                {post.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-primary/70 sm:text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
                <ArrowRight className="ml-auto h-4 w-4 -rotate-45 text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.article>
        ))}

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-white/5 bg-[#101010] p-10 text-center text-sm text-gray-500">
            没有匹配的文章。
          </p>
        )}
      </div>
    </PageShell>
  )
}
