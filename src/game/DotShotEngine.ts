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

/** A floating "+10" / "+50" score readout that rises and fades at the hit point. */
interface ScorePopup {
  x: number
  y: number
  life: number // 1 -> 0
  text: string
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
  wins: number
  wonThisRun: boolean
  gameOver: boolean
  started: boolean
  bossActive: boolean
  canFire: boolean
}

const PIN_PALETTE = [colorsRgb.blue, colorsRgb.cyan, colorsRgb.purple]
const GOLDEN_EVERY = 6 // every 6th stuck pin is golden (bonus points)
const BOSS_EVERY = 8 // every 8th stuck pin triggers a boss speed-spike wave
const BOSS_WAVE_LENGTH = 5 // pins the player must survive during a boss wave
const WIN_SCORE = 400 // reaching this score counts as a "win" for the run

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
  popups: ScorePopup[] = []

  score = 0
  best = 0
  wins = 0
  wonThisRun = false
  gameOver = false
  started = false

  bossActive = false
  bossPinsRemaining = 0

  // Juice — screen shake on impact, launcher recoil on fire, hub pulse
  private shakeTime = 0
  private shakeMagnitude = 0
  private launcherPulse = 0
  private time = 0

  private onChange: (snapshot: EngineSnapshot) => void

  constructor(width: number, height: number, onChange: (snapshot: EngineSnapshot) => void) {
    this.onChange = onChange
    this.resize(width, height)
    this.best = Number(localStorage.getItem('dotshot-best-score') ?? 0)
    this.wins = Number(localStorage.getItem('dotshot-wins') ?? 0)
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
    // Shortened — was 0.34x hub radius, now 0.2x, so pins sit closer to
    // the rim and the ring reads less cluttered at a glance.
    this.pinLength = Math.max(10, this.hubRadius * 0.2)
  }

  start() {
    this.pins = []
    this.particles = []
    this.popups = []
    this.shot = null
    this.score = 0
    this.hubRotation = 0
    this.hubDirection = 1
    this.bossActive = false
    this.bossPinsRemaining = 0
    this.wonThisRun = false
    this.gameOver = false
    this.started = true
    this.emit()
  }

  /** Fires a new shot from the bottom center, if none is currently in flight. */
  fireShot() {
    if (!this.started || this.gameOver || this.shot) return
    this.shot = { x: this.hubX, y: this.height - 48, speed: 620 }
    this.launcherPulse = 1
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
      wins: this.wins,
      wonThisRun: this.wonThisRun,
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
    this.time += dt

    // Hub rotation — sped up and possibly reversed during a boss wave.
    const speedMultiplier = this.bossActive ? 1.7 : 1 + Math.min(this.pins.length * 0.014, 0.75)
    this.hubRotation += this.hubBaseSpeed * speedMultiplier * this.hubDirection * dt

    // Juice decay
    if (this.shakeTime > 0) this.shakeTime = Math.max(0, this.shakeTime - dt)
    if (this.launcherPulse > 0) this.launcherPulse = Math.max(0, this.launcherPulse - dt * 3)

    // Particles
    this.particles = this.particles.filter((p) => p.life > 0)
    for (const p of this.particles) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.vy += 140 * dt // gravity
      p.life -= dt * 1.6
    }

    // Score popups — rise and fade
    this.popups = this.popups.filter((p) => p.life > 0)
    for (const p of this.popups) {
      p.y -= 38 * dt
      p.life -= dt * 1.1
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
      const points = golden ? 50 : 10

      this.pins.push({ offsetAngle, golden, colorRgb })
      this.score += points
      this.spawnBurst(stuckX, stuckY, colorRgb, golden ? 20 : 10)
      this.shakeTime = golden ? 0.18 : 0.08
      this.shakeMagnitude = golden ? 5 : 2.5
      this.shot = null

      // First time crossing the win threshold this run — count it once.
      if (!this.wonThisRun && this.score >= WIN_SCORE) {
        this.wonThisRun = true
        this.wins++
        localStorage.setItem('dotshot-wins', String(this.wins))
        this.popups.push({ x: this.hubX, y: this.hubY, life: 1.4, text: 'WIN!', colorRgb: colorsRgb.green })
      }

      if (this.bossActive) {
        this.bossPinsRemaining--
        if (this.bossPinsRemaining <= 0) {
          this.bossActive = false
        }
      } else if (pinIndex % BOSS_EVERY === 0) {
        this.bossActive = true
        this.bossPinsRemaining = BOSS_WAVE_LENGTH
        this.hubDirection = this.hubDirection === 1 ? -1 : 1
        // Slight haptic buzz as a boss wave kicks in — mobile only, and
        // only where the Vibration API actually exists.
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([35, 40, 35])
        }
      }

      this.emit()
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height)

    ctx.save()

    // Screen shake — small random offset that decays over shakeTime
    if (this.shakeTime > 0) {
      const s = this.shakeMagnitude * (this.shakeTime / 0.18)
      ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s)
    }

    // Hub outer glow — soft, colorful, gently pulsing so the hub feels alive
    const pulse = 0.85 + Math.sin(this.time * 2.2) * 0.15
    const outerGrad = ctx.createRadialGradient(
      this.hubX, this.hubY, this.hubRadius * 0.4,
      this.hubX, this.hubY, this.hubRadius * 1.9
    )
    if (this.bossActive) {
      outerGrad.addColorStop(0, `rgba(${colorsRgb.purple},${0.32 * pulse})`)
      outerGrad.addColorStop(1, 'rgba(0,0,0,0)')
    } else {
      outerGrad.addColorStop(0, `rgba(${colorsRgb.cyan},${0.22 * pulse})`)
      outerGrad.addColorStop(1, 'rgba(0,0,0,0)')
    }
    ctx.fillStyle = outerGrad
    ctx.beginPath()
    ctx.arc(this.hubX, this.hubY, this.hubRadius * 1.9, 0, Math.PI * 2)
    ctx.fill()

    // Hub ring — a rotating multi-color conic gradient instead of a flat
    // single-tone stroke, so the "big ball" actually reads as colorful.
    ctx.beginPath()
    ctx.lineWidth = 3
    if (typeof ctx.createConicGradient === 'function') {
      const conic = ctx.createConicGradient(this.hubRotation, this.hubX, this.hubY)
      if (this.bossActive) {
        conic.addColorStop(0, `rgba(${colorsRgb.purple},1)`)
        conic.addColorStop(0.33, `rgba(${colorsRgb.amber},1)`)
        conic.addColorStop(0.66, `rgba(${colorsRgb.purple},1)`)
        conic.addColorStop(1, `rgba(${colorsRgb.purple},1)`)
      } else {
        conic.addColorStop(0, `rgba(${colorsRgb.blue},1)`)
        conic.addColorStop(0.33, `rgba(${colorsRgb.cyan},1)`)
        conic.addColorStop(0.66, `rgba(${colorsRgb.purple},1)`)
        conic.addColorStop(1, `rgba(${colorsRgb.blue},1)`)
      }
      ctx.strokeStyle = conic
    } else {
      // Fallback for browsers without createConicGradient — a flat tone.
      ctx.strokeStyle = this.bossActive ? `rgba(${colorsRgb.purple},0.9)` : `rgba(${colorsRgb.blue},0.7)`
    }
    ctx.arc(this.hubX, this.hubY, this.hubRadius, 0, Math.PI * 2)
    ctx.stroke()

    // Hub core fill — richer inner gradient with a bright center highlight
    const coreRgb = this.bossActive ? colorsRgb.purple : colorsRgb.cyan
    const coreGrad = ctx.createRadialGradient(
      this.hubX, this.hubY, 0,
      this.hubX, this.hubY, this.hubRadius
    )
    coreGrad.addColorStop(0, `rgba(255,255,255,0.1)`)
    coreGrad.addColorStop(0.4, `rgba(${coreRgb},0.22)`)
    coreGrad.addColorStop(1, `rgba(${coreRgb},0)`)
    ctx.fillStyle = coreGrad
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

    // Launcher — pulses/recoils briefly on every fire for tactile feedback
    const launcherR = 5 + this.launcherPulse * 4
    ctx.beginPath()
    ctx.fillStyle = `rgba(${colorsRgb.blue},${0.6 + this.launcherPulse * 0.4})`
    ctx.shadowColor = `rgba(${colorsRgb.blue},0.7)`
    ctx.shadowBlur = this.launcherPulse * 14
    ctx.arc(this.hubX, this.height - 48, launcherR, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0

    // Particles
    for (const p of this.particles) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(${p.colorRgb},${Math.max(p.life, 0)})`
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    // Score popups — "+10" / "+50" / "WIN!" rising and fading at hit point
    for (const p of this.popups) {
      ctx.font = p.text === 'WIN!' ? 'bold 22px sans-serif' : 'bold 14px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillStyle = `rgba(${p.colorRgb},${Math.max(p.life, 0)})`
      ctx.shadowColor = `rgba(${p.colorRgb},0.6)`
      ctx.shadowBlur = 6
      ctx.fillText(p.text, p.x, p.y)
      ctx.shadowBlur = 0
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
