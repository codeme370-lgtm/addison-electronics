"use client"

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import {
  Cpu,
  MonitorPlay,
  Gamepad2,
  Headphones,
  Monitor,
  Image as ImageIcon,
  ShoppingBag,
  Watch,
  Sparkles,
} from 'lucide-react'

const iconMap = {
  Cpu,
  MonitorPlay,
  Gamepad2,
  Headphones,
  Monitor,
  ImageIcon,
  ShoppingBag,
  Watch,
  Sparkles,
}

const CategoryMarquee = ({ categories }) => {
  const marqueeRef = useRef(null)
  const speed = 0.4

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return

    let animationFrame = null
    const maxScroll = el.scrollWidth / 2

    const step = () => {
      if (!el) return
      el.scrollLeft = el.scrollLeft + speed
      if (el.scrollLeft >= maxScroll) {
        el.scrollLeft = el.scrollLeft - maxScroll
      }
      animationFrame = requestAnimationFrame(step)
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [speed])

  return (
    <div ref={marqueeRef} className="mt-6 overflow-x-auto pb-4 no-scrollbar">
      <div className="flex min-w-max gap-4">
        {[...categories, ...categories].map((category, index) => {
          const Icon = iconMap[category.icon] || Cpu
          return (
            <Link
              key={`${category.label}-${index}`}
              href="/category"
              className="group flex min-w-[220px] items-center gap-3 rounded-[2rem] border border-white/10 bg-slate-950/80 px-5 py-4 text-slate-100 transition hover:border-violet-500/60 hover:bg-slate-900/95"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300 transition group-hover:bg-violet-500/20">
                <Icon size={20} />
              </div>
              <span className="font-semibold">{category.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryMarquee
