import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Command, Briefcase, Sparkles, Clock, Gamepad2, Mail, FileDown, User, Search } from 'lucide-react'

type CommandItem = {
  id: string
  label: string
  icon: typeof Command
  href?: string
  external?: boolean
  action?: () => void
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const commands: CommandItem[] = [
    { id: 'work', label: 'Explore My Work', icon: Briefcase, href: '#projects' },
    { id: 'skills', label: 'Skills & Capabilities', icon: Sparkles, href: '#skills' },
    { id: 'experience', label: 'Experience', icon: Clock, href: '#experience' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'playground', label: 'Playground (Game)', icon: Gamepad2, action: () => navigate('/play') },
    { id: 'resume', label: 'Download Resume', icon: FileDown, href: '/resume.pdf', external: true },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ]

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  const runCommand = (cmd: CommandItem) => {
    setOpen(false)
    setQuery('')
    if (cmd.action) {
      cmd.action()
      return
    }
    if (cmd.href?.startsWith('#')) {
      // Let the existing global anchor-click handler own the smooth
      // scroll — dispatch a real click on a temporary link so it goes
      // through the same code path as any other nav link.
      const link = document.createElement('a')
      link.href = cmd.href
      document.body.appendChild(link)
      link.click()
      link.remove()
    } else if (cmd.href) {
      window.open(cmd.href, cmd.external ? '_blank' : '_self', 'noopener,noreferrer')
    }
  }

  // Global ⌘K / Ctrl+K to open, Escape to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault()
      runCommand(filtered[activeIndex])
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-3.5 py-2.5 rounded-full bg-surface backdrop-blur-md border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors duration-200 shadow-lg"
      >
        <Command size={13} aria-hidden="true" />
        <span className="text-label-xs">K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[16vh] px-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-card overflow-hidden"
            >
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
                <Search size={15} className="text-text-tertiary shrink-0" aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActiveIndex(0)
                  }}
                  onKeyDown={onListKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-body-sm text-text-primary placeholder:text-text-tertiary outline-none"
                />
                <kbd className="text-label-xs text-text-tertiary border border-border rounded px-1.5 py-0.5">
                  esc
                </kbd>
              </div>

              <ul className="max-h-[320px] overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <li className="px-4 py-6 text-body-sm text-text-tertiary text-center">No matching commands</li>
                )}
                {filtered.map((cmd, i) => {
                  const Icon = cmd.icon
                  return (
                    <li key={cmd.id}>
                      <button
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-body-sm text-left transition-colors duration-100 ${
                          i === activeIndex ? 'bg-white/[0.06] text-text-primary' : 'text-text-secondary'
                        }`}
                      >
                        <Icon size={15} className="text-text-tertiary shrink-0" aria-hidden="true" />
                        {cmd.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
