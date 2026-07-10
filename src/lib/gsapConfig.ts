import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Registering twice is a no-op per GSAP's own docs, but centralizing the
// call here means every component imports gsap from this file instead of
// 'gsap' directly, so there's exactly one place plugins are wired up.
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export { gsap, ScrollTrigger }
