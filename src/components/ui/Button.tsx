import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@lib/utils'

type Variant = 'primary' | 'secondary'

interface CommonProps {
  variant?: Variant
  children: ReactNode
  className?: string
}

type AsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonProps = AsAnchor | AsButton

/**
 * Polymorphic CTA button. Renders an <a> when `href` is passed, otherwise
 * a <button>. Styling comes from the .btn-primary/.btn-secondary classes
 * defined in globals.css so raw HTML and React stay visually identical.
 */
export default function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const classes = cn(variant === 'primary' ? 'btn-primary' : 'btn-secondary', className)

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const rest = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
