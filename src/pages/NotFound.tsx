import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <div className="bg-noise pointer-events-none fixed inset-0 opacity-[0.12]" />
      <Navbar variant="page" />

      <main className="relative flex flex-1 flex-col items-center justify-center gap-5 px-4 text-center">
        <p className="text-6xl font-medium tracking-[-0.04em] text-primary sm:text-7xl">404</p>
        <p className="font-serif text-xl italic text-primary/70 sm:text-2xl">
          nothing lives here.
        </p>
        <p className="max-w-sm text-xs leading-[1.8] text-gray-500 sm:text-sm">
          这个地址没有对应的页面，也许是链接过期了。
        </p>

        <Link
          to="/"
          className="group mt-2 inline-flex items-center gap-2 rounded-full bg-primary py-2 pl-5 pr-2 transition-all duration-300 hover:gap-3"
        >
          <span className="text-xs font-medium text-black sm:text-sm">回到首页</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110">
            <ArrowRight className="h-3.5 w-3.5" color="#E1E0CC" />
          </span>
        </Link>
      </main>

      <Footer />
    </div>
  )
}
