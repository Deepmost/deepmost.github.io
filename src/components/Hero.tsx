import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WordsPullUp from './WordsPullUp'
import AmbientVideo from './AmbientVideo'
import Navbar from './Navbar'

const HERO_VIDEO = `${import.meta.env.BASE_URL}video/hero.mp4`
const HERO_VIDEO_MOBILE = `${import.meta.env.BASE_URL}video/hero-mobile.mp4`

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="h-screen w-full bg-black p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <AmbientVideo
          src={HERO_VIDEO}
          mobileSrc={HERO_VIDEO_MOBILE}
          poster={`${import.meta.env.BASE_URL}img/hero-poster.jpg`}
          posterWebp={`${import.meta.env.BASE_URL}img/hero-poster.webp`}
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <Navbar variant="overlay" />

        {/* Bottom-aligned hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-2 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-4">
            <div className="md:col-span-8" style={{ color: '#E1E0CC' }}>
              <WordsPullUp
                text="Deepmost"
                showAsterisk
                className="text-[19vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[17vw] md:text-[15vw] lg:text-[14vw] xl:text-[13vw] 2xl:text-[13vw]"
              />
            </div>

            <div className="flex flex-col gap-5 pb-6 sm:gap-6 md:col-span-4 md:pb-10">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="max-w-md text-xs text-primary/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.4 }}
              >
                在 AI、工程与生活之间持续学习和创造。这里记录项目实践、读书与播客笔记，
                也收纳那些仍在形成的思考。
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              >
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pl-6 pr-1.5 transition-all duration-300 hover:gap-3 sm:py-2 sm:pl-7 sm:pr-2"
                >
                  <span className="text-sm font-medium text-black sm:text-base">进入博客</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" color="#E1E0CC" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
