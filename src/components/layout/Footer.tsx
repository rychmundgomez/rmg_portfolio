const FOOTER_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container-base flex items-center justify-between flex-wrap gap-4">
        <span className="text-label-md text-text-tertiary">
          © {new Date().getFullYear()} Richmond Makafui Gamor
        </span>
        <nav aria-label="Footer">
          <ul className="flex gap-6">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-label-md text-text-tertiary hover:text-text-secondary transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
