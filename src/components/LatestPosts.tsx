import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import AmbientVideo from './AmbientVideo'
import { posts } from '../content/posts'

const CARD_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4'

const CARD_EASE = [0.22, 1, 0.36, 1] as const

interface CardShellProps {
  index: number
  className?: string
  children: ReactNode
}

function CardShell({ index, className = '', children }: CardShellProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: CARD_EASE }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function LatestPosts() {
  // Three cards sit beside the video panel to fill the four-column row.
  const featured = posts.slice(0, 3)

  return (
    <section className="relative min-h-screen w-full bg-black px-4 py-20 sm:px-6 sm:py-24 md:px-8">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <WordsPullUpMultiStyle
            className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            stagger={0.05}
            segments={[
              { text: '想清楚一件事，就写下来。', className: 'text-primary' },
              { text: '读书、播客、项目，以及生活。', className: 'text-gray-500' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
          {/* Video panel, carried over from the original design */}
          <CardShell index={0} className="min-h-[320px] lg:h-full">
            <AmbientVideo src={CARD_VIDEO} poster={`${import.meta.env.BASE_URL}img/poster.jpg`} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
              <p className="text-base font-medium sm:text-lg" style={{ color: '#E1E0CC' }}>
                这里是我的小角落。
              </p>
              <p className="mt-2 text-[11px] leading-snug text-gray-400 sm:text-xs">
                共 {posts.length} 篇，持续更新。
              </p>
            </div>
          </CardShell>

          {featured.map((post, i) => (
            <CardShell key={post.slug} index={i + 1} className="bg-[#212121] lg:h-full">
              <Link to={`/post/${encodeURIComponent(post.slug)}`} className="group flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
                  <span>{post.dateText}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-gray-600" />
                  <span>{post.readingMinutes} 分钟</span>
                  <span className="ml-auto align-super text-[10px] text-gray-600 sm:text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3
                  className="mt-5 text-base font-medium leading-snug transition-opacity duration-300 group-hover:opacity-80 sm:mt-6 sm:text-lg"
                  style={{ color: '#E1E0CC' }}
                >
                  {post.title}
                </h3>

                <p className="mt-3 text-[11px] leading-[1.8] text-gray-400 sm:text-xs">
                  {post.excerpt}
                </p>

                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-primary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs text-primary transition-opacity duration-300 group-hover:opacity-70 sm:text-sm">
                  阅读全文
                  <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </CardShell>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/30 py-2.5 pl-6 pr-5 text-sm text-primary transition-all duration-300 hover:gap-3 hover:border-primary/70"
          >
            查看全部文章
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
