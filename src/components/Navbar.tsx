import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/blog' },
  { label: '归档', to: '/archives' },
  { label: '标签', to: '/tags' },
  { label: '关于', to: '/about' },
]

const DIM = 'rgba(225, 224, 204, 0.8)'
const BRIGHT = '#E1E0CC'

interface NavbarProps {
  /** Hero sits inside a rounded inset panel; inner pages sit on the page itself. */
  variant?: 'overlay' | 'page'
}

export default function Navbar({ variant = 'overlay' }: NavbarProps) {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  if (variant === 'overlay') {
    const heroNavItems = [
      { label: '首页', to: '/' },
      { label: '文章', to: '/blog' },
      { label: '归档', to: '/archives' },
      { label: '标签', to: '/tags' },
      { label: '关于', to: '/about' },
    ]

    return (
      <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <Link to="/" className="flex items-center gap-2" aria-label="Deepmost 首页">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="font-playfair text-2xl italic text-white">Deepmost</span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
          {heroNavItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                index === 0
                  ? 'text-white'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? '关闭导航' : '打开导航'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="absolute left-4 right-4 top-[72px] overflow-hidden rounded-lg border border-white/20 bg-black/80 p-2 backdrop-blur-xl md:hidden"
          >
            {heroNavItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                  index === 0 ? 'text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    )
  }

  return (
    <nav
      className="sticky top-0 z-40 flex justify-center"
    >
      <ul
        className="flex items-center gap-3 rounded-b-2xl border-x border-b border-white/5 bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.to)
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className="relative whitespace-nowrap text-[10px] transition-colors duration-300 sm:text-xs md:text-sm"
                style={{ color: active ? BRIGHT : DIM }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = BRIGHT
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = active ? BRIGHT : DIM
                }}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 h-[2px] w-1 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
