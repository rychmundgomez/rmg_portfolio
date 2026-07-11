import { useState } from 'react'
import { Menu, X, ExternalLink } from 'lucide-react'
import { useScrolled } from '@hooks/useScrolled'
import { cn } from '@lib/utils'

const NAV_LINKS = [
  { href: '#projects', label: 'Work' },
  { href: '#skills', label: 'Expertise' },
  { href: '#experience', label: 'Experience' },
  { href: '/play', label: 'Playground' },
  { href: '#gallery', label: 'Journal' },
]

export default function Navbar() {
  const scrolled = useScrolled(30)
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[200] border-b transition-colors duration-350',
        scrolled
          ? 'bg-bg-base/85 backdrop-blur-nav border-border'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container-base flex items-center justify-between py-4">
        <a href="#hero" className="font-display font-bold text-body-md text-gradient-primary">
          RMG
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-xs font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 inline-flex items-center gap-1"
            >
              Resume
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-body-xs font-semibold px-4 py-1.5 rounded-sm text-blue bg-blue/10 border border-blue/25 hover:bg-blue/20 hover:border-blue/45 transition-colors duration-200"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden p-1 text-text-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-bg-base/95 backdrop-blur-nav border-b border-border px-6 py-6 flex flex-col gap-5"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-body-sm font-medium text-text-secondary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="text-body-sm font-medium text-text-secondary inline-flex items-center gap-1.5"
          >
            Resume
            <ExternalLink size={13} aria-hidden="true" />
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-body-sm font-semibold text-blue"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  )
}
