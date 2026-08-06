import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85'
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85'

const SPOTLIGHT_R = 260

interface RevealLayerProps {
  image: string
  cursorX: number
  cursorY: number
}

function RevealLayer({ image, cursorX, cursorY }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const reveal = revealRef.current
    if (!canvas || !reveal) return

    const context = canvas.getContext('2d')
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
    const gradient = context.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    )
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)')
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')

    context.fillStyle = gradient
    context.beginPath()
    context.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2)
    context.fill()

    const mask = `url(${canvas.toDataURL()})`
    reveal.style.maskImage = mask
    reveal.style.webkitMaskImage = mask
  })

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ display: 'none' }}
      />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </>
  )
}

export default function Hero() {
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>()
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY }
    }

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      setCursorPos({ x: smooth.current.x, y: smooth.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ height: '100dvh' }}
    >
      <div
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

      <Navbar variant="overlay" />

      <div className="pointer-events-none absolute left-0 right-0 top-[14%] z-50 flex flex-col items-center px-5 text-center">
        <h1 className="leading-[0.95] text-white">
          <span
            className="hero-anim hero-reveal font-playfair block text-5xl font-normal italic sm:text-7xl md:text-8xl"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            Thoughts become
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            clear in writing
          </span>
        </h1>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[260px] sm:block md:left-14"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm leading-relaxed text-white/80">
          在 AI、工程与生活之间持续学习和创造。这里记录项目实践、读书与播客笔记，
          也收纳那些仍在形成的思考。
        </p>
      </div>

      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
          写作是把模糊的念头变清楚，也是为走过的路留下坐标。愿这些关于技术、阅读和生活的记录，
          也能给你一点启发。
        </p>
        <Link
          to="/blog"
          className="rounded-full bg-[#e8702a] px-7 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95"
        >
          进入博客
        </Link>
      </div>
    </section>
  )
}
