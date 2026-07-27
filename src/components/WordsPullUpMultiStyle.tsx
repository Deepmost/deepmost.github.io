import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { tokenize } from '../lib/text'

export interface Segment {
  text: string
  className?: string
  /** Forces a line break before this segment. */
  breakBefore?: boolean
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
  stagger?: number
  /** Alignment of the wrapped token rows. */
  align?: 'center' | 'left'
}

/**
 * Splits every segment into tokens while keeping each token's own className, so a
 * single heading can mix roman and italic-serif runs and still animate as one
 * continuous stagger.
 */
export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  stagger = 0.08,
  align = 'center',
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const tokens = segments.flatMap((segment, segmentIndex) =>
    tokenize(segment.text).map((token, tokenIndex) => ({
      ...token,
      className: segment.className ?? '',
      // Only the first token of a segment can carry the forced break.
      breakBefore: Boolean(segment.breakBefore) && tokenIndex === 0 && segmentIndex > 0,
    }))
  )

  return (
    <div ref={ref} className={className}>
      <span
        className={`inline-flex flex-wrap ${align === 'center' ? 'justify-center' : 'justify-start'}`}
      >
        {tokens.map((token, i) => (
          <span key={i} className="contents">
            {token.breakBefore && <span className="w-full basis-full" aria-hidden="true" />}
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: i * stagger, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block ${token.className}`}
            >
              {token.text}
              {token.space && <span>&nbsp;</span>}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  )
}
