'use client'
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [autoPlay, setAutoPlay] = useState(true)

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Verified Customer',
            image: '👩‍💼',
            rating: 5,
            text: 'Amazing quality products and fast delivery! The customer service team was incredibly helpful when I had questions.',
            verified: true
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Regular Buyer',
            image: '👨‍💻',
            rating: 5,
            text: 'I\'ve been shopping here for over a year. Consistently excellent products at great prices. Highly recommend!',
            verified: true
        },
        {
            id: 3,
            name: 'Emma Williams',
            role: 'First Time Buyer',
            image: '👩‍🎓',
            rating: 5,
            text: 'First time purchasing and I\'m absolutely impressed! Beautiful packaging and the product exceeded my expectations.',
            verified: true
        },
        {
            id: 4,
            name: 'David Martinez',
            role: 'Loyal Customer',
            image: '👨‍🔧',
            rating: 5,
            text: 'Best online shopping experience I\'ve had. Great selection, fair prices, and reliable service every single time.',
            verified: true
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            role: 'Bulk Buyer',
            image: '👩‍📱',
            rating: 5,
            text: 'I buy gifts for my entire family here. The quality is consistent and shipping is always on time. A+ experience!',
            verified: true
        }
    ]

    useEffect(() => {
        if (!autoPlay) return
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [autoPlay, testimonials.length])

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        setAutoPlay(false)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setAutoPlay(false)
    }

    const goToSlide = (index) => {
        setCurrentIndex(index)
        setAutoPlay(false)
    }

    return (
        <div className='px-6 py-16 max-w-6xl mx-auto'>
            {/* Header */}
            <div className='text-center mb-12'>
                <h2 className='text-4xl font-bold mb-3'>
                    <span className='bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent'>Customer Love</span>
                </h2>
                <p className='text-slate-600 text-lg'>Join thousands of happy customers who trust us</p>
            </div>

            {/* Carousel Container */}
            <div className='relative'>
                {/* Testimonials Slides */}
                <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12 min-h-80 relative overflow-hidden border border-slate-200 shadow-lg'>
                    {/* Animated Background */}
                    <div className='absolute inset-0 opacity-20'>
                        <div className='absolute top-0 right-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
                        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
                    </div>

                    {/* Slides */}
                    <div className='relative z-10'>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`transition-all duration-700 transform ${
                                    index === currentIndex
                                        ? 'opacity-100 translate-x-0'
                                        : index < currentIndex
                                        ? 'opacity-0 -translate-x-full absolute'
                                        : 'opacity-0 translate-x-full absolute'
                                }`}
                            >
                                {/* Rating Stars */}
                                <div className='flex gap-1 mb-4'>
                                    {Array(testimonial.rating).fill('').map((_, i) => (
                                        <Star key={i} size={20} className='fill-yellow-400 text-yellow-400' />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className='text-xl text-slate-700 font-medium mb-8 leading-relaxed italic'>
                                    "{testimonial.text}"
                                </p>

                                {/* Customer Info */}
                                <div className='flex items-center gap-4'>
                                    <div className='text-5xl'>{testimonial.image}</div>
                                    <div>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-bold text-lg text-slate-800'>{testimonial.name}</h3>
                                            {testimonial.verified && (
                                                <span className='bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full'>
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className='text-sm text-slate-600'>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className='absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-2xl hover:scale-110 p-3 rounded-full text-slate-800 transition-all duration-300 z-20'
                    aria-label='Previous testimonial'
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={goToNext}
                    className='absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-2xl hover:scale-110 p-3 rounded-full text-slate-800 transition-all duration-300 z-20'
                    aria-label='Next testimonial'
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Dots Navigation */}
            <div className='flex justify-center gap-3 mt-10'>
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                            index === currentIndex
                                ? 'bg-gradient-to-r from-green-600 to-green-500 w-8 h-3 shadow-lg'
                                : 'bg-slate-300 hover:bg-slate-400 w-3 h-3'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>

            {/* Auto-play indicator */}
            <div className='flex justify-center mt-6'>
                <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className='text-sm font-medium text-slate-600 hover:text-slate-800 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-full transition-all'
                >
                    {autoPlay ? '⏸ Auto-play' : '▶ Resume'}
                </button>
            </div>
        </div>
    )
}

export default TestimonialsCarousel
