import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const transparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-sm shadow-md border-b border-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${transparent ? 'bg-white/20 text-white' : 'bg-maroon-950 text-saffron-300'}`}>
              ॐ
            </div>
            <div>
              <div className={`font-bold text-lg leading-none transition-colors ${transparent ? 'text-white' : 'text-maroon-950'}`} style={{ fontFamily: 'var(--font-serif)' }}>
                Devabhumi
              </div>
              <div className={`text-xs leading-none transition-colors ${transparent ? 'text-saffron-200' : 'text-stone-400'}`}>
                Temple Heritage Portal
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: '/', label: 'Home' },
              { to: '/temples', label: 'Temples' },
              { to: '/about', label: 'About' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-200 ${
                    isActive
                      ? `after:w-full ${transparent ? 'text-saffron-200 after:bg-saffron-200' : 'text-maroon-950 after:bg-maroon-950'}`
                      : `after:w-0 hover:after:w-full ${transparent ? 'text-white/80 hover:text-white after:bg-white' : 'text-stone-600 hover:text-maroon-950 after:bg-maroon-950'}`
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/temples"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                transparent
                  ? 'bg-white/15 text-white hover:bg-white/25 border border-white/30'
                  : 'bg-maroon-950 text-white hover:bg-maroon-800'
              }`}
            >
              <Search size={14} />
              Explore Temples
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden p-2 rounded-lg transition-colors ${transparent ? 'text-white hover:bg-white/10' : 'text-stone-600 hover:bg-stone-100'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/temples', label: 'Temples' },
              { to: '/about', label: 'About' },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-maroon-50 text-maroon-950 font-semibold' : 'text-stone-600 hover:bg-stone-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/temples"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-maroon-950 text-white rounded-lg text-sm font-semibold"
            >
              <Search size={14} />
              Explore Temples
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
