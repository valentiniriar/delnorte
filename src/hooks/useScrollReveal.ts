'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  stagger?: number
  start?: string
  selector?: string
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.7,
      stagger = 0.1,
      start = 'top 80%',
      selector,
    } = options

    const ctx = gsap.context(() => {
      const target = selector ? ref.current!.querySelectorAll(selector) : ref.current!

      gsap.from(target, {
        opacity,
        y,
        x,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
