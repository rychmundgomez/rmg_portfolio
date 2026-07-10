import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Link2, MapPin, Send } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'
import { socialLinks } from '@data/about'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: socialLinks.email,
    href: `mailto:${socialLinks.email}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'richmond-makafui-gamor',
    href: socialLinks.linkedin,
  },
  {
    icon: Link2,
    label: 'StackUp Nest',
    value: 'stackupnest.pages.dev',
    href: socialLinks.stackupNest,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Accra, Ghana',
    href: null,
  },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // This is a static site with no backend to receive a POST, so the
  // honest thing to build is a mailto: handoff — it opens the visitor's
  // own mail client with the message prefilled, rather than pretending
  // to silently submit somewhere. If a backend/form service gets added
  // later, this is the function to swap out.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${email}`)
    window.location.href = `mailto:${socialLinks.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-y bg-bg-subtle/70">
      <div className="container-base grid md:grid-cols-2 gap-16 items-start">
        <div>
          <SectionHeader
            eyebrow="Get In Touch"
            title={
              <>
                Let&apos;s work
                <br />
                <span className="text-gradient-primary">together</span>
              </>
            }
            subtitle="Open to freelance projects, collaborations, and new professional opportunities."
          />

          <div className="flex flex-col gap-4 mt-8">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <div className="w-[38px] h-[38px] rounded-md bg-blue/8 border border-blue/18 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-label-sm text-text-tertiary mb-0.5">{item.label}</div>
                    <div className="text-body-sm font-medium">{item.value}</div>
                  </div>
                </>
              )
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3.5 hover:text-cyan transition-colors duration-200 w-fit"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-3.5">
                  {content}
                </div>
              )
            })}
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-3.5"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-label-md text-text-secondary">
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kwame Mensah"
              className="bg-white/[0.035] border border-border rounded-md px-4 py-3.5 text-body-sm outline-none focus:border-blue/45 focus:bg-white/[0.05] transition-colors duration-200"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-label-md text-text-secondary">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-white/[0.035] border border-border rounded-md px-4 py-3.5 text-body-sm outline-none focus:border-blue/45 focus:bg-white/[0.05] transition-colors duration-200"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-label-md text-text-secondary">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project or opportunity..."
              rows={5}
              className="bg-white/[0.035] border border-border rounded-md px-4 py-3.5 text-body-sm outline-none focus:border-blue/45 focus:bg-white/[0.05] transition-colors duration-200 resize-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-label-sm text-amber">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-fit">
            <Send size={14} aria-hidden="true" />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}
