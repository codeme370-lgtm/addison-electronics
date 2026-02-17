'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import './Hero.css'

// Hero carousel that cycles through ban1..ban5 and ping-pongs direction every 5s
const Hero = () => {

    const banners = [assets.ban1, assets.ban2, assets.ban3, assets.ban4, assets.ban5].filter(Boolean)
    const intervalMs = 5000
    const transitionMs = 600
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
    const [paused, setPaused] = useState(false)
    const timerRef = useRef(null)
    const bgTimeoutRef = useRef(null)

    // background crossfade states (store raw banner item like import result or string)
    const [currBg, setCurrBg] = useState(banners[0] || null)
    const [prevBg, setPrevBg] = useState(null)
    const [showCurrBg, setShowCurrBg] = useState(true)

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }

    const startTimer = () => {
        clearTimer()
        timerRef.current = setInterval(() => {
            setIndex(prev => {
                const next = prev + direction
                if (next >= banners.length) {
                    setDirection(-1)
                    return Math.max(prev - 1, 0)
                }
                if (next < 0) {
                    setDirection(1)
                    return Math.min(prev + 1, banners.length - 1)
                }
                return next
            })
        }, intervalMs)
    }

    useEffect(() => {
        if (!banners.length) return
        if (!paused) startTimer()
        return clearTimer
    }, [banners.length, direction, paused])

    useEffect(() => () => clearTimer(), [])

    useEffect(() => {
        return () => {
            if (bgTimeoutRef.current) clearTimeout(bgTimeoutRef.current)
        }
    }, [])

    const bgSrc = (img) => img ? ((img.src) ? img.src : img) : ''

    // Crossfade background when `index` changes
    useEffect(() => {
        if (!banners.length) return
        const newBgItem = banners[index]
        const newBg = bgSrc(newBgItem)
        const curr = bgSrc(currBg)
        if (newBg === curr) return

        // set previous, show current, then clear previous after transition
        setPrevBg(currBg)
        setCurrBg(newBgItem)
        setShowCurrBg(true)

        if (bgTimeoutRef.current) clearTimeout(bgTimeoutRef.current)
        bgTimeoutRef.current = setTimeout(() => {
            setPrevBg(null)
        }, transitionMs)
    }, [index, banners])

    const goTo = (i) => setIndex(i)
    const handleNext = () => {
        setIndex(prev => {
            const nxt = Math.min(prev + 1, banners.length - 1)
            if (nxt === banners.length - 1) setDirection(-1)
            else setDirection(1)
            return nxt
        })
    }
    const handlePrev = () => {
        setIndex(prev => {
            const p = Math.max(prev - 1, 0)
            if (p === 0) setDirection(1)
            else setDirection(-1)
            return p
        })
    }

    return (
        <div className='mx-6'>
            <div className='max-w-7xl mx-auto my-6'>
                <div className='relative w-full h-64 md:h-96 overflow-hidden rounded-3xl shadow-lg' onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                    {/* blurred backgrounds (prev + curr) crossfade */}
                    {prevBg && (
                        <div className='hero-bg-blur' style={{ backgroundImage: `url(${bgSrc(prevBg)})`, opacity: showCurrBg ? 0 : 1, transitionDuration: `${transitionMs}ms` }} />
                    )}
                    {currBg && (
                        <div className='hero-bg-blur' style={{ backgroundImage: `url(${bgSrc(currBg)})`, opacity: showCurrBg ? 1 : 0, transitionDuration: `${transitionMs}ms` }} />
                    )}
                    <div className='hero-bg-overlay' />

                    <div className='flex h-full ease-in-out relative z-10' style={{ transform: `translateX(-${index * 100}%)`, transitionDuration: `${transitionMs}ms` }}>
                        {banners.map((src, i) => (
                            <div key={i} className='min-w-full h-full relative bg-transparent flex items-center justify-center'>
                                <Image src={src} alt={`Banner ${i + 1}`} className='w-full h-full object-cover' priority={i===0} fill sizes='(max-width: 768px) 100vw, 50vw' />
                            </div>
                        ))}
                    </div>

                    {/* Arrows */}
                    <button aria-label='Previous' onClick={handlePrev} className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-900 p-2 rounded-full shadow-md'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'><path fillRule='evenodd' d='M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z' clipRule='evenodd' /></svg>
                    </button>
                    <button aria-label='Next' onClick={handleNext} className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-900 p-2 rounded-full shadow-md'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 rotate-180' viewBox='0 0 20 20' fill='currentColor'><path fillRule='evenodd' d='M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z' clipRule='evenodd' /></svg>
                    </button>

                    {/* Dots */}
                    <div className='absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2'>
                        {banners.map((_, i) => (
                            <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`} aria-label={`Go to slide ${i+1}`} />
                        ))}
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>
    )
}

export default Hero