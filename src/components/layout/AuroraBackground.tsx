import { useReducedMotion } from '@hooks/useReducedMotion'

/**
 * Three large, blurred color blobs fixed to the viewport behind every
 * section. Unlike the per-section flares (which only live behind the
 * hero/cards), this is what keeps the *rest* of the page — Skills,
 * Experience, Contact — from reading as flat black once you scroll
 * past the hero. Blobs drift slowly via the existing `animate-drift`
 * keyframe; reduced-motion users get the color wash without the motion.
 */
export default function AuroraBackground() {
  const reduced = useReducedMotion()

  return (
    <div className="aurora-bg" aria-hidden="true">
      <div
        className={`aurora-blob ${reduced ? '' : 'animate-drift'}`}
        style={{
          top: '-10%',
          left: '-8%',
          width: '46vw',
          height: '46vw',
          maxWidth: 640,
          maxHeight: 640,
          background: 'radial-gradient(circle, rgba(59,130,246,0.24) 0%, transparent 70%)',
        }}
      />
      <div
        className={`aurora-blob ${reduced ? '' : 'animate-drift'}`}
        style={{
          top: '30%',
          right: '-12%',
          width: '50vw',
          height: '50vw',
          maxWidth: 700,
          maxHeight: 700,
          background: 'radial-gradient(circle, rgba(139,92,246,0.19) 0%, transparent 70%)',
          animationDelay: '-5s',
        }}
      />
      <div
        className={`aurora-blob ${reduced ? '' : 'animate-drift'}`}
        style={{
          bottom: '-15%',
          left: '18%',
          width: '42vw',
          height: '42vw',
          maxWidth: 560,
          maxHeight: 560,
          background: 'radial-gradient(circle, rgba(6,182,212,0.19) 0%, transparent 70%)',
          animationDelay: '-10s',
        }}
      />
    </div>
  )
}
