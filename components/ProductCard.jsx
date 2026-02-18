'use client'
import { StarIcon, ShoppingCart, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ProductCard = ({ product, hideAddToCart = false }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS'
    const [isAdding, setIsAdding] = useState(false)
    const [addedSuccess, setAddedSuccess] = useState(false)
    const dispatch = useDispatch()
    const { user } = useUser()
    const router = useRouter()
    const cart = useSelector(state => state.cart.cartItems)

    // calculate the average rating of the product
    const rating = product.rating && product.rating.length > 0 
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user) {
            toast.error('Please sign in to add items to cart')
            return
        }

        setIsAdding(true)
        dispatch(addToCart({ productId: product.id }))

        setTimeout(() => {
            setIsAdding(false)
            setAddedSuccess(true)
            toast.success('Added to cart!')
            setTimeout(() => setAddedSuccess(false), 2000)
        }, 600)
    }

    const viewCartOrProduct = (e) => {
        if (cart[product.id]) {
            e.preventDefault()
            router.push('/cart')
        }
    }

    return (
        <Link href={`/product/${product.id}`} className='group max-xl:mx-auto block'>
            <div className='relative'>
                {/* Product Image */}
                <div className='bg-gradient-to-br from-slate-100 to-slate-50 h-40 w-full sm:h-68 rounded-lg flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300'>
                    <Image 
                        width={500} 
                        height={500}
                        className='w-full h-full object-contain group-hover:scale-115 transition duration-300' 
                        src={product.images?.[0] || '/placeholder.jpg'} 
                        alt={product?.name ? `${product.name} image` : 'Product image'} 
                    />
                </div>

                {/* Add to Cart Button - Overlay on Hover */}
                {!hideAddToCart && (
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`absolute bottom-0 left-0 right-0 py-3 px-4 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 transform rounded-t-lg ${
                            addedSuccess
                                ? 'bg-green-500 translate-y-0'
                                : 'translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black'
                        } ${isAdding ? 'opacity-90' : ''}`}
                    >
                        {isAdding ? (
                            <>
                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                Adding...
                            </>
                        ) : addedSuccess ? (
                            <>
                                <Check size={18} className='animate-bounce' />
                                Added!
                            </>
                        ) : (
                            <>
                                <ShoppingCart size={18} />
                                {cart[product.id] ? 'View in Cart' : 'Add to Cart'}
                            </>
                        )}
                    </button>
                )}

                {/* Stock Badge */}
                {product.inStock ? (
                    <div className='absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse'>
                        In Stock
                    </div>
                ) : (
                    <div className='absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg'>
                        Out of Stock
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className='w-full pt-3'>
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold text-sm line-clamp-2 text-slate-800 leading-tight'>{product.name}</p>
                    <div className='flex items-center gap-1'>
                        <div className='flex'>
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon key={index} size={12} className='text-transparent' fill={rating >= index + 1 ? "#fbbf24" : "#D1D5DB"} />
                            ))}
                        </div>
                        <span className='text-xs text-slate-500'>({product.rating?.length || 0})</span>
                    </div>
                    <div className='flex items-baseline gap-2'>
                        <p className='font-bold text-slate-900 text-sm'>{currency}{product.price}</p>
                        <p className='text-xs text-slate-400 line-through'>{currency}{product.mrp}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard