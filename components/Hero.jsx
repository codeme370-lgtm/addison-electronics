"use client"
import React, { useEffect, useRef, useState } from 'react'
import { assets } from '@/assets/assets'

const Hero = () => {
  const banners = [assets.ba1, assets.ba2, assets.ba3].filter(Boolean)
  const [idx, setIdx] = useState(0)
  const intervalMs = 5000

  useEffect(() => {
    if (!banners.length) return
    const t = setInterval(() => {
      setIdx(prev => (prev + 1) % banners.length)
    }, intervalMs)
    return () => clearInterval(t)
  }, [banners.length])

  const src = img => (img && img.src) ? img.src : img || ''

  return (
    <div className='mx-0'>
      <div className='w-full my-1'>
        {/* container flexes to two columns on medium+ screens */}
        <div className='flex flex-col md:flex-row gap-3'>
          {/* rotating banner occupies 100% width on mobile, 2/3 on md+ */}
          <div className='relative w-full md:w-2/3 h-48 md:h-64 overflow-hidden shadow-lg'>
            <div
              className='absolute inset-0'
              style={{
                backgroundImage: `url(${src(banners[idx])})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                transform: 'scale(1.1)' // slight scale to avoid blur edges
              }}
            ></div>
            <img
              src={src(banners[idx])}
              alt={`Banner ${idx + 1}`}
              className='relative w-full h-full object-contain object-center block'
            />
          </div>
          {/* static right panel only visible on medium+ screens */}
          <div className='hidden md:block relative w-full md:w-1/3 h-48 md:h-64 overflow-hidden shadow-lg'>
            <img
              src={src(assets.ba4)}
              alt='Sidebar banner'
              className='w-full h-full object-cover object-center block'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
