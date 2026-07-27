import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { posts } from '../content/posts'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Archives() {
  // Group by year, preserving the newest-first order from the data layer.
  const years = posts.reduce<{ year: number; items: typeof posts }[]>((acc, post) => {
    const year = post.date.getFullYear()
    const bucket = acc.find((g) => g.year === year)
    if (bucket) bucket.items.push(post)
    else acc.push({ year, items: [post] })
    return acc
  }, [])

  return (
    <PageShell
      eyebrow="Archives"
      title="归档"
      subtitle={`按时间倒序排列的全部 ${posts.length} 篇文章。`}
    >
      <div className="flex flex-col gap-14">
        {years.map((group, groupIndex) => (
          <section key={group.year}>
            <div className="flex items-baseline gap-4">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">{group.year}</h2>
              <span className="text-[11px] text-gray-600 sm:text-xs">
                {group.items.length} 篇
              </span>
              <span className="ml-2 h-px flex-1 bg-white/5" />
            </div>

            <ul className="mt-6">
              {group.items.map((post, i) => (
                <motion.li
                  key={post.slug}
                  initial={{ x: -12, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i * 0.05, 0.4),
                    ease: EASE,
                  }}
                >
                  <Link
                    to={`/post/${encodeURIComponent(post.slug)}`}
                    className="group flex items-baseline gap-4 border-b border-white/5 py-4 transition-colors duration-300 hover:border-primary/20"
                  >
                    <span className="shrink-0 font-mono text-[11px] text-gray-600 sm:text-xs">
                      {post.dateText.slice(5)}
                    </span>

                    <span
                      className="flex-1 text-sm leading-snug transition-all duration-300 group-hover:translate-x-1 sm:text-base"
                      style={{ color: '#E1E0CC' }}
                    >
                      {post.title}
                    </span>

                    <span className="hidden shrink-0 text-[11px] text-gray-600 sm:inline">
                      {post.readingMinutes} 分钟
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {groupIndex === years.length - 1 && (
              <p className="mt-8 text-center text-[11px] text-gray-700 sm:text-xs">
                — 到这里就是全部了 —
              </p>
            )}
          </section>
        ))}
      </div>
    </PageShell>
  )
}
