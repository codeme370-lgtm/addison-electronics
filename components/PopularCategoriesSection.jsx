'use client'
import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const PopularCategoriesSection = () => {
    const products = useSelector(state => state.product.list)
    
    // Get unique categories from products
    const categoriesData = {}
    products.forEach(product => {
        if (!categoriesData[product.category]) {
            categoriesData[product.category] = {
                name: product.category,
                count: 0,
                products: []
            }
        }
        categoriesData[product.category].count++
        if (categoriesData[product.category].products.length < 1) {
            categoriesData[product.category].products.push(product)
        }
    })

    const categories = Object.values(categoriesData).slice(0, 6)

    // Enhanced color palette for categories with gradients
    const colors = [
        { bg: 'bg-blue-600', gradient: 'from-blue-500 to-blue-700', text: 'text-white' },
        { bg: 'bg-orange-500', gradient: 'from-orange-400 to-orange-600', text: 'text-white' },
        { bg: 'bg-pink-500', gradient: 'from-pink-400 to-pink-600', text: 'text-white' },
        { bg: 'bg-purple-600', gradient: 'from-purple-500 to-purple-700', text: 'text-white' },
        { bg: 'bg-yellow-400', gradient: 'from-yellow-300 to-yellow-500', text: 'text-gray-900' },
        { bg: 'bg-green-600', gradient: 'from-green-500 to-green-700', text: 'text-white' },
    ]

    return (
        <div className='w-full bg-gray-50 py-8 px-4 md:px-8'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-900'>Popular Categories</h2>
                    <Link href='/shop' className='text-orange-600 hover:text-orange-700 font-semibold text-sm md:text-base flex items-center gap-1 transition-colors'>
                        <ChevronRight size={18} />
                    </Link>
                </div>
                
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4'>
                    {categories.map((category, idx) => {
                        const color = colors[idx % colors.length]
                        const productImage = category.products?.[0]?.images?.[0]
                        
                        return (
                            <Link key={idx} href={`/shop?category=${encodeURIComponent(category.name)}`}>
                                <div className={`relative bg-gradient-to-br ${color.gradient} rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200 h-40 md:h-48 flex flex-col items-center justify-center`}>
                                    {/* Background product image with overlay */}
                                    {productImage && (
                                        <Image
                                            src={productImage}
                                            alt={category.name}
                                            fill
                                            className='object-cover opacity-20 absolute inset-0'
                                        />
                                    )}
                                    
                                    {/* Content overlay */}
                                    <div className='relative z-10 text-center px-4'>
                                        <h3 className={`font-bold text-sm md:text-base line-clamp-2 mb-1 ${color.text}`}>
                                            {category.name}
                                        </h3>
                                        <p className={`text-xs opacity-80 ${color.text}`}>
                                            {category.count} items
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PopularCategoriesSection
