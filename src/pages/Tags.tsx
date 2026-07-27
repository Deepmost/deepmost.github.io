import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { allTags, posts } from '../content/posts'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Tags() {
  const untagged = posts.filter((p) => p.tags.length === 0).length

  return (
    <PageShell
      eyebrow="Tags"
      title="标签"
      subtitle={`${allTags.length} 个标签。点击任意标签查看相关文章。`}
    >
      <div className="flex flex-wrap gap-3">
        {allTags.map((tag, i) => (
          <motion.div
            key={tag.name}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.5), ease: EASE }}
          >
            <Link
              to={`/blog?tag=${encodeURIComponent(tag.name)}`}
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#101010] px-5 py-2.5 transition-all duration-300 hover:border-primary/40 hover:bg-[#161615]"
            >
              <span className="text-xs text-primary sm:text-sm">{tag.name}</span>
              <span className="rounded-full bg-[#212121] px-2 py-0.5 text-[10px] text-gray-400 transition-colors duration-300 group-hover:text-primary">
                {tag.count}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {untagged > 0 && (
        <p className="mt-10 text-[11px] text-gray-600 sm:text-xs">
          另有 {untagged} 篇文章未添加标签，可在
          <Link to="/archives" className="mx-1 text-primary/80 underline-offset-4 hover:underline">
            归档
          </Link>
          中查看。
        </p>
      )}
    </PageShell>
  )
}
