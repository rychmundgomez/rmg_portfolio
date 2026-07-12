import { colorsRgb } from '@lib/tokens'

interface Pin {
  offsetAngle: number // angle relative to hub rotation, stays fixed once stuck
  golden: boolean
  colorRgb: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number // 1 -> 0
  colorRgb: string
}

interface Shot {
  x: number
  y: number
  speed: number
}

export interface EngineSnapshot {
  score: number
  best: number
  gameOver: boolean
  started: boolean
  bossActive: boolean
  canFire: boolean
}

const PIN_PALETTE = [colorsRgb.blue, colorsRgb.cyan, colorsRgb.purple]
const GOLDEN_EVERY = 6 // every 6th stuck pin is golden (bonus points)
const BOSS_EVERY = 8 // every 8th stuck pin triggers a boss speed-spike wave
const BOSS_WAVE_LENGTH = 5 // pins the player must survive during a boss wave

/**
 * DOT SHOT — shoot dots up into a rotating hub. Each shot sticks as a pin;
 * get too close to an existing pin and it's game over. Every 6th pin is
 * golden (bonus score). Every 8th pin triggers a "boss wave" — the hub
 * spins faster and the ring glows a warning color for the next few shots.
 */
export class DotShotEngine {
  width = 0
  height = 0

  hubX = 0
  hubY = 0
  hubRadius = 64
  pinRadius = 8
  pinLength = 20

  hubRotation = 0
  hubBaseSpeed = 0.55 // radians/sec
  hubDirection: 1 | -1 = 1

  pins: Pin[] = []
  shot: Shot | null = null
  particles: Particle[] = []

  score = 0
  best = 0
  gameOver = false
  started = false

  bossActive = false
  bossPinsRemaining = 0

  private onChange: (snapshot: EngineSnapshot) => void

  constructor(width: number, height: number, onChange: (snapshot: EngineSnapshot) => void) {
    this.onChange = onChange
    this.resize(width, height)
    this.best = Number(localStorage.getItem('dotshot-best-score') ?? 0)
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.hubX = width / 2
    this.hubY = height * 0.32
    // Bigger hub = more rim circumference = more physical room for pins.
    this.hubRadius = Math.max(58, Math.min(width, height) * 0.2)
    // Pins are now thin stubs with a small dot cap (like a real pin), not
    // fat balls sitting on the rim, so the cap can stay small and fixed-ish.
    this.pinRadius = Math.max(4.5, this.hubRadius * 0.075)
    this.pinLength = Math.max(16, this.hubRadius * 0.34)
  }

  start() {
    this.pins = []
    this.particles = []
    this.shot = null
    this.score = 0
    this.hubRotation = 0
    this.hubDirection = 1
    this.bossActive = false
    this.bossPinsRemaining = 0
    this.gameOver = false
    this.started = true
    this.emit()
  }

  /** Fires a new shot from the bottom center, if none is currently in flight. */
  fireShot() {
    if (!this.started || this.gameOver || this.shot) return
    this.shot = { x: this.hubX, y: this.height - 48, speed: 620 }
  }

  private currentPinInterval(): number {
    // Angular gap (radians) required between pins — shrinks slightly as
    // the ring fills up, making the late game genuinely harder.
    // Pins are now thin pins rather than fat balls, so the required gap
    // can be much tighter (close to CloudStudio's own DOT SHOT, ~0.165rad)
    // while still leaving real breathing room around the hub.
    const base = 0.2
    const tighten = Math.min(this.pins.length * 0.0028, 0.09)
    return base - tighten
  }

  private emit() {
    this.onChange({
      score: this.score,
      best: this.best,
      gameOver: this.gameOver,
      started: this.started,
      bossActive: this.bossActive,
      canFire: this.started && !this.gameOver && !this.shot,
    })
  }

  private spawnBurst(x: number, y: number, colorRgb: string, count = 14) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
      const speed = 60 + Math.random() * 120
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        colorRgb,
      })
    }
  }

  private endGame() {
    this.gameOver = true
    this.shot = null
    if (this.score > this.best) {
      this.best = this.score
      localStorage.setItem('dotshot-best-score', String(this.best))
    }
    this.emit()
  }

  update(dt: number) {
    if (!this.started) return

    // Hub rotation — sped up and possibly reversed during a boss wave.
    const speedMultiplier = this.bossActive ? 1.7 : 1 + Math.min(this.pins.length * 0.014, 0.75)
    this.hubRotation += this.hubBaseSpeed * speedMultiplier * this.hubDirection * dt

    // Particles
    this.particles = this.particles.filter((p) => p.life > 0)
    for (const p of this.particles) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.vy += 140 * dt // gravity
      p.life -= dt * 1.6
    }

    if (this.gameOver || !this.shot) return

    this.shot.y -= this.shot.speed * dt

    const dx = this.shot.x - this.hubX
    const dy = this.shot.y - this.hubY
    const distToCenter = Math.hypot(dx, dy)
    // Pins now stick out from the rim, so the shot travels up to meet the
    // tip of the pin ring, not the bare hub surface.
    const ringRadius = this.hubRadius + this.pinLength

    if (distToCenter <= ringRadius) {
      const impactAngle = Math.atan2(dy, dx)
      const offsetAngle = normalizeAngle(impactAngle - this.hubRotation)

      const tooClose = this.pins.some((pin) => {
        const diff = Math.abs(normalizeAngle(pin.offsetAngle - offsetAngle))
        const wrapped = Math.min(diff, Math.PI * 2 - diff)
        return wrapped < this.currentPinInterval()
      })

      const stuckX = this.hubX + Math.cos(impactAngle) * ringRadius
      const stuckY = this.hubY + Math.sin(impactAngle) * ringRadius

      if (tooClose) {
        this.spawnBurst(stuckX, stuckY, colorsRgb.amber, 24)
        this.endGame()
        return
      }

      const pinIndex = this.pins.length + 1
      const golden = pinIndex % GOLDEN_EVERY === 0
      const colorRgb = golden ? colorsRgb.amber : PIN_PALETTE[pinIndex % PIN_PALETTE.length]

      this.pins.push({ offsetAngle, golden, colorRgb })
      this.score += golden ? 50 : 10
      this.spawnBurst(stuckX, stuckY, colorRgb, golden ? 20 : 10)
      this.shot = null

      if (this.bossActive) {
        this.bossPinsRemaining--
        if (this.bossPinsRemaining <= 0) {
          this.bossActive = false
        }
      } else if (pinIndex % BOSS_EVERY === 0) {
        this.bossActive = true
        this.bossPinsRemaining = BOSS_WAVE_LENGTH
        this.hubDirection = this.hubDirection === 1 ? -1 : 1
      }

      this.emit()
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height)

    // Hub ring
    ctx.save()
    ctx.strokeStyle = this.bossActive
      ? `rgba(${colorsRgb.purple},0.9)`
      : `rgba(${colorsRgb.blue},0.5)`
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(this.hubX, this.hubY, this.hubRadius, 0, Math.PI * 2)
    ctx.stroke()

    // Hub core glow
    const grad = ctx.createRadialGradient(
      this.hubX,
      this.hubY,
      0,
      this.hubX,
      this.hubY,
      this.hubRadius
    )
    const coreRgb = this.bossActive ? colorsRgb.purple : colorsRgb.cyan
    grad.addColorStop(0, `rgba(${coreRgb},0.18)`)
    grad.addColorStop(1, `rgba(${coreRgb},0)`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(this.hubX, this.hubY, this.hubRadius, 0, Math.PI * 2)
    ctx.fill()

    // Pins — a thin stub from the rim out to a small dot cap at the tip,
    // like an actual pin, instead of a fat ball sitting on the rim.
    for (const pin of this.pins) {
      const angle = pin.offsetAngle + this.hubRotation
      const x1 = this.hubX + Math.cos(angle) * this.hubRadius
      const y1 = this.hubY + Math.sin(angle) * this.hubRadius
      const x2 = this.hubX + Math.cos(angle) * (this.hubRadius + this.pinLength)
      const y2 = this.hubY + Math.sin(angle) * (this.hubRadius + this.pinLength)

      ctx.beginPath()
      ctx.strokeStyle = `rgba(${pin.colorRgb},0.85)`
      ctx.lineWidth = 2.5
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      ctx.beginPath()
      ctx.fillStyle = `rgba(${pin.colorRgb},1)`
      ctx.shadowColor = `rgba(${pin.colorRgb},0.8)`
      ctx.shadowBlur = pin.golden ? 14 : 7
      ctx.arc(x2, y2, pin.golden ? this.pinRadius * 1.3 : this.pinRadius, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.shadowBlur = 0

    // Active shot — a small dot, matching the pin cap size, not a big ball.
    if (this.shot) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(${colorsRgb.cyan},1)`
      ctx.shadowColor = `rgba(${colorsRgb.cyan},0.9)`
      ctx.shadowBlur = 10
      ctx.arc(this.shot.x, this.shot.y, this.pinRadius * 0.9, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    // Launcher marker at the bottom
    ctx.beginPath()
    ctx.fillStyle = `rgba(${colorsRgb.blue},0.6)`
    ctx.arc(this.hubX, this.height - 48, 5, 0, Math.PI * 2)
    ctx.fill()

    // Particles
    for (const p of this.particles) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(${p.colorRgb},${Math.max(p.life, 0)})`
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }
}

function normalizeAngle(angle: number): number {
  const twoPi = Math.PI * 2
  let a = angle % twoPi
  if (a < 0) a += twoPi
  return a
}
