import { useEffect } from 'react'

const SITE_NAME = 'Richmond Makafui Gamor'

/** Sets document.title for the current route, restoring the previous title on unmount. */
export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    const previous = document.title
    document.title = pageTitle ? `${pageTitle} — ${SITE_NAME}` : `${SITE_NAME} — Creative Technologist`
    return () => {
      document.title = previous
    }
  }, [pageTitle])
}
