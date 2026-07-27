import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { allTags, posts } from '../content/posts'

const EASE = [0.16, 1, 0.3, 1] as const

const PARAGRAPHS = [
  '我是 Deepmost。这个站点是我给自己留的一块空地，用来放那些不适合发在别处、但又不想丢掉的东西。',
  '过去这段时间，我在实习里做过后端服务、知识图谱、AI Agent 与 CDN 查询系统。技术之外，我花了不少时间在读书和听播客上，《非暴力沟通》《关键对话》《金字塔原理》这些留下的痕迹都在文章里。',
  '写作对我来说不是输出，而是把想法逼到必须说清楚的地方。很多时候写到一半才发现自己原来没想明白，那一刻反而是最有价值的。',
]

export default function About() {
  return (
    <PageShell eyebrow="About" title="关于我" subtitle="记录 — 永远感恩 — 热爱生活">
      <div className="rounded-2xl border border-white/5 bg-[#101010] p-6 sm:p-10 lg:rounded-[2rem] lg:p-14">
        <p className="font-serif text-2xl italic text-primary sm:text-3xl md:text-4xl">
          a curious builder.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="text-xs leading-[1.9] text-primary/75 sm:text-sm md:text-base"
            >
              {text}
            </motion.p>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
          {[
            { value: String(posts.length), label: '篇文章' },
            { value: String(allTags.length), label: '个标签' },
            { value: '2026', label: '开始记录' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-2 transition-all duration-300 hover:gap-3"
          >
            <span className="text-xs font-medium text-black sm:text-sm">读我的文章</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
              <ArrowRight className="h-3.5 w-3.5" color="#E1E0CC" />
            </span>
          </Link>

          <a
            href="https://github.com/Deepmost"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2 text-xs text-primary transition-colors duration-300 hover:border-primary/70 sm:text-sm"
          >
            GitHub
            <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
          </a>
        </div>
      </div>
    </PageShell>
  )
}
