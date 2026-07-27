import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-black px-4 py-10 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-bold text-primary">Deepmost</p>
          <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">记录 — 永远感恩 — 热爱生活</p>
        </div>

        <div className="flex items-center gap-5 text-[10px] text-gray-500 sm:text-xs">
          <Link to="/blog" className="transition-colors duration-300 hover:text-primary">
            文章
          </Link>
          <Link to="/archives" className="transition-colors duration-300 hover:text-primary">
            归档
          </Link>
          <Link to="/tags" className="transition-colors duration-300 hover:text-primary">
            标签
          </Link>
          <a
            href="https://github.com/Deepmost"
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors duration-300 hover:text-primary"
          >
            GitHub
          </a>
        </div>

        <p className="text-[10px] text-gray-600 sm:text-xs">© {new Date().getFullYear()} Deepmost</p>
      </div>
    </footer>
  )
}
