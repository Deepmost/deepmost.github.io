import { useEffect, useRef, useState } from 'react'

interface AmbientVideoProps {
  src: string
  /** Optional smaller source that also enables video playback below 768px. */
  mobileSrc?: string
  className?: string
  /** Shown while loading, on failure, and whenever playback is disabled. */
  poster?: string
  /** Optional WebP version of the poster for browsers that support it. */
  posterWebp?: string
}

/**
 * Decorative background video with graceful degradation:
 *  - skipped when the OS asks for reduced motion or data saving is enabled,
 *    falling back to a static gradient/poster;
 *  - narrow screens play only when a mobile source is provided;
 *  - if the CDN URL ever fails, the fallback simply stays visible.
 */
export default function AmbientVideo({
  src,
  mobileSrc,
  className = '',
  poster,
  posterWebp,
}: AmbientVideoProps) {
  const [enabled, setEnabled] = useState(false)
  const [isWide, setIsWide] = useState(false)
  const [failed, setFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wideQuery = window.matchMedia('(min-width: 768px)')

    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ??
      false

    const update = () => {
      setIsWide(wideQuery.matches)
      setEnabled((wideQuery.matches || Boolean(mobileSrc)) && !motionQuery.matches && !saveData)
    }

    update()
    motionQuery.addEventListener('change', update)
    wideQuery.addEventListener('change', update)
    return () => {
      motionQuery.removeEventListener('change', update)
      wideQuery.removeEventListener('change', update)
    }
  }, [mobileSrc])

  const showVideo = enabled && !failed
  const videoSrc = !isWide && mobileSrc ? mobileSrc : src

  useEffect(() => setFailed(false), [videoSrc])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Always-present base layer, so a missing video never leaves a bare box. */}
      <div className="absolute inset-0 bg-[#0b0b0a]">
        {poster && (
          <picture>
            {posterWebp && <source srcSet={posterWebp} type="image/webp" />}
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
          src={videoSrc}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
