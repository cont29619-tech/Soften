import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tools', label: 'Tools' },
  { to: '/check-in', label: 'Check-In' },
  { to: '/learn', label: 'Learn' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleSOS() {
    navigate('/tools/breathing-exercise')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-charcoal/8 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold text-sage tracking-tight shrink-0"
          aria-label="Soften — home"
        >
          Soften
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-sage' : 'text-charcoal/60 hover:text-charcoal'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side: SOS button + hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSOS}
            className="animate-sos-pulse bg-sos text-white text-sm font-medium px-3 py-1.5 rounded-xl hover:bg-sos/90 transition-colors whitespace-nowrap"
            aria-label="I need calm now — open breathing exercise"
          >
            I need calm now
          </button>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden p-1.5 text-charcoal/60 hover:text-charcoal transition-colors"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="15" x2="19" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden bg-bg border-t border-charcoal/8 px-4 py-3 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-sage/10 text-sage' : 'text-charcoal/70 hover:bg-charcoal/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
