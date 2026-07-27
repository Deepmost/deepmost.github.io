import { useEffect, useRef, useState } from 'react'

interface AmbientVideoProps {
  src: string
  className?: string
  /** Shown while loading, on failure, and instead of video on small screens. */
  poster?: string
}

/**
 * Decorative background video with graceful degradation:
 *  - skipped entirely on narrow screens (mobile data) and when the OS asks for
 *    reduced motion, falling back to a static gradient/poster;
 *  - if the CDN URL ever fails, the fallback simply stays visible.
 */
export default function AmbientVideo({ src, className = '', poster }: AmbientVideoProps) {
  const [enabled, setEnabled] = useState(false)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideQuery = window.matchMedia('(min-width: 768px)')

    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ??
      false

    const update = () => setEnabled(wideQuery.matches && !motionQuery.matches && !saveData)

    update()
    motionQuery.addEventListener('change', update)
    wideQuery.addEventListener('change', update)
    return () => {
      motionQuery.removeEventListener('change', update)
      wideQuery.removeEventListener('change', update)
    }
  }, [])

  const showVideo = enabled && !failed

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Always-present base layer, so a missing video never leaves a bare box. */}
      <div className="absolute inset-0 bg-[#0b0b0a]">
        {poster && (
          <picture>
            <source srcSet={`${import.meta.env.BASE_URL}img/poster.webp`} type="image/webp" />
            <img
              src={poster}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-50"
            />
          </picture>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1917] via-black to-[#111110]" />
      </div>

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
