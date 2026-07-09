import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { colorsRgb } from '@lib/tokens'
import { useReducedMotion } from '@hooks/useReducedMotion'

const PARTICLE_COUNT = 340

/** Generates a random point cloud spread across a wide, shallow box behind the hero text. */
function useParticlePositions(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 // z
    }
    return positions
  }, [count])
}

function rgbToThreeColor(rgb: string): THREE.Color {
  const [r, g, b] = rgb.split(',').map(Number)
  return new THREE.Color(r / 255, g / 255, b / 255)
}

function ParticleField() {
  const groupRef = useRef<THREE.Group>(null)
  const positions = useParticlePositions(PARTICLE_COUNT)
  const reduced = useReducedMotion()

  useFrame((_, delta) => {
    if (reduced || !groupRef.current) return
    // Slow, continuous drift — matches the `drift`/`spin-slow` easing used elsewhere in the design system.
    groupRef.current.rotation.y += delta * 0.025
    groupRef.current.rotation.x += delta * 0.008
  })

  const blue = useMemo(() => rgbToThreeColor(colorsRgb.blue), [])

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={blue}
          size={0.045}
          sizeAttenuation
          depthWrite={false}
          opacity={0.55}
        />
      </Points>
    </group>
  )
}

/**
 * Full-bleed hero background scene. Kept intentionally simple — one
 * instanced point cloud, no postprocessing — so it stays cheap on mid-range
 * mobile GPUs. Callers should not mount this on small screens; see Hero.tsx
 * for the useMediaQuery gate.
 */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ParticleField />
    </Canvas>
  )
}
