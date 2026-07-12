import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { cn } from '@lib/utils'

interface SmartImageProps {
  /** Path to the real image, e.g. "/images/projects/stackup-nest.jpg". */
  src?: string
  alt: string
  /** Shown under the placeholder icon while no image exists yet. */
  fallbackLabel?: string
  className?: string
  fallbackIconSize?: number
}

/**
 * Renders the real image once it exists at `src`. Until then — or if it
 * 404s — falls back to the same icon+label placeholder used throughout
 * the site, so dropping a correctly-named file into /public is the only
 * step needed; no component code has to change.
 */
export default function SmartImage({
  src,
  alt,
  fallbackLabel,
  className,
  fallbackIconSize = 22,
}: SmartImageProps) {
  const [errored, setErrored] = useState(false)
  const showFallback = !src || errored

  if (showFallback) {
    return (
      <div
        className={cn(
          'w-full h-full flex flex-col items-center justify-center gap-2 text-text-tertiary p-4 text-center',
          className
        )}
      >
        <ImageIcon size={fallbackIconSize} strokeWidth={1.3} className="opacity-30" aria-hidden="true" />
        {fallbackLabel && <span className="text-label-sm">{fallbackLabel}</span>}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn('w-full h-full object-cover', className)}
      onError={() => setErrored(true)}
    />
  )
}
