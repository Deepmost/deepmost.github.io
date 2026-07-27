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

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <nav
      className={
        variant === 'overlay'
          ? 'absolute left-1/2 top-0 z-20 -translate-x-1/2'
          : 'sticky top-0 z-40 flex justify-center'
      }
    >
      <ul
        className={`flex items-center gap-3 bg-black px-4 py-2 sm:gap-6 md:gap-12 md:px-8 lg:gap-14 ${
          variant === 'overlay'
            ? 'rounded-b-2xl md:rounded-b-3xl'
            : 'rounded-b-2xl border-x border-b border-white/5 md:rounded-b-3xl'
        }`}
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
