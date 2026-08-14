import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import { posts } from '../content/posts'

const BODY_TEXT =
  '这里记录我在后端与 AI 应用中的真实实践：知识图谱、CDN 查询、多智能体学习平台、RAG 与 Agent 架构，也整理面向 FDE 的学习和项目复盘。技术之外，还有产品思考、读书播客与生活观察。写作对我来说，是把问题想清楚，也把经验沉淀下来。'

interface AnimatedLetterProps {
  char: string
  index: number
  totalChars: number
  progress: MotionValue<number>
}

/**
 * One character of the paragraph. Opacity is driven by the section's scroll
 * progress, offset by the character's position, so the sentence brightens
 * left-to-right as the reader scrolls through it.
 */
function AnimatedLetter({ char, index, totalChars, progress }: AnimatedLetterProps) {
  const charProgress = index / totalChars
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])

  return (
    <motion.span style={{ opacity }} className="inline">
      {char === ' ' ? ' ' : char}
    </motion.span>
  )
}

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = BODY_TEXT.split('')
  const tagCount = new Set(posts.flatMap((p) => p.tags)).size

  return (
    <section className="w-full bg-black px-4 py-20 sm:px-6 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-5 py-16 text-center sm:px-8 sm:py-20 md:px-12 md:py-24 lg:rounded-[2rem]">
        <p className="mb-6 text-[10px] uppercase tracking-[0.18em] text-primary sm:mb-8 sm:text-xs">
          About
        </p>

        <div style={{ color: '#E1E0CC' }}>
          <WordsPullUpMultiStyle
            className="mx-auto max-w-3xl text-3xl leading-[1.15] sm:text-4xl sm:leading-[1.1] md:text-5xl lg:text-6xl"
            stagger={0.045}
            segments={[
              { text: '我是 Deepmost，', className: 'font-normal' },
              { text: 'a curious builder.', className: 'italic font-serif' },
              {
                text: '写下 AI 实践、工程复盘与持续思考。',
                className: 'font-normal',
                breakBefore: true,
              },
            ]}
          />
        </div>

        <p
          ref={paragraphRef}
          className="mx-auto mt-10 max-w-2xl text-xs leading-[1.9] text-[#DEDBC8] sm:mt-12 sm:text-sm md:text-base"
        >
          {chars.map((char, i) => (
            <AnimatedLetter
              key={i}
              char={char}
              index={i}
              totalChars={chars.length}
              progress={scrollYProgress}
            />
          ))}
        </p>

        {/* Small stat row grounds the intro in the actual content of the site. */}
        <div className="mt-12 flex items-center justify-center gap-8 sm:mt-14 sm:gap-14">
          {[
            { value: String(posts.length), label: '篇文章' },
            { value: String(tagCount), label: '个标签' },
            { value: '2026', label: '开始记录' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
