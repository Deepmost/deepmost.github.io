import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { tokenize } from '../lib/text'

interface WordsPullUpProps {
  text: string
  className?: string
  /** Renders a superscript asterisk on the final character. */
  showAsterisk?: boolean
  /** Seconds between each token, lowered for long strings. */
  stagger?: number
  delay?: number
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
  stagger = 0.08,
  delay = 0,
}: WordsPullUpProps) {
  const tokens = tokenize(text)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {tokens.map((token, i) => {
        const isLast = i === tokens.length - 1
        const transition = {
          duration: 0.6,
          delay: delay + i * stagger,
          ease: [0.16, 1, 0.3, 1] as const,
        }

        // The asterisk hangs off the final glyph so it reads as a footnote
        // marker on the wordmark, not a separate character in the flow.
        if (isLast && showAsterisk) {
          const head = token.text.slice(0, -1)
          const tail = token.text.slice(-1)

          return (
            <motion.span
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={transition}
              className="inline-block"
            >
              {head}
              <span className="relative inline-block">
                {tail}
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none">
                  *
                </span>
              </span>
            </motion.span>
          )
        }

        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={transition}
            className="inline-block"
          >
            {token.text}
            {token.space && <span>&nbsp;</span>}
          </motion.span>
        )
      })}
    </div>
  )
}
