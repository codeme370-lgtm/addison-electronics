'use client'
import { StarIcon, ShoppingCart, Check, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '@/lib/features/wishlist/wishlistSlice'
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
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems)
    const isInWishlist = wishlistItems[product.id]

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
        }, 600)
    }

    const handleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user) {
            toast.error('Please sign in to add items to wishlist')
            return
        }

        if (isInWishlist) {
            dispatch(removeFromWishlist({ productId: product.id }))
            toast.success('Removed from wishlist')
        } else {
            dispatch(addToWishlist({ productId: product.id }))
            toast.success('Added to wishlist')
        }
    }

    const handleSellerClick = (e, username) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/seller/${username}`)
    }

    return (
        <Link href={`/product/${product.id}`} className='group max-xl:mx-auto block'>
            <div className='relative'>
                {/* Product Image */}
                <div className='bg-gradient-to-br from-slate-100 to-slate-50 h-48 sm:h-56 lg:h-68 w-full rounded-lg flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300'>
                    <Image 
                        width={500} 
                        height={500}
                        className='w-full h-full object-cover group-hover:scale-115 transition duration-300' 
                        src={product.images?.[0] || '/placeholder.jpg'} 
                        alt={product?.name ? `${product.name} image` : 'Product image'} 
                    />
                </div>

                {/* Quick Cart Icon - Top Right */}
                {!hideAddToCart && (
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || addedSuccess}
                        title="Add to cart"
                        className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                            addedSuccess
                                ? 'bg-green-500 text-white scale-110'
                                : 'bg-white text-slate-800 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300'
                        } ${isAdding ? 'scale-95' : ''}`}
                    >
                        {isAdding ? (
                            <div className='w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin'></div>
                        ) : addedSuccess ? (
                            <Check size={20} className='text-white' />
                        ) : (
                            <ShoppingCart size={20} />
                        )}
                    </button>
                )}

                {/* Wishlist Heart Icon - Top Left */}
                <button
                    onClick={handleWishlist}
                    title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-2 left-2 p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                        isInWishlist
                            ? 'bg-red-600 text-white'
                            : 'bg-white text-slate-800 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300'
                    }`}
                >
                    <Heart size={18} className={isInWishlist ? 'fill-white' : ''} />
                </button>
            </div>

            {/* Product Info */}
            <div className='w-full pt-2 sm:pt-3'>
                <div className='flex flex-col gap-1 sm:gap-2'>
                    <p className='font-semibold text-xs sm:text-sm line-clamp-2 text-slate-800 leading-tight'>{product.name}</p>
                    
                    {/* Seller Info */}
                    {product.store && (
                        <button
                            onClick={(e) => handleSellerClick(e, product.store.username)}
                            className='text-xs text-blue-600 hover:underline truncate text-left hover:text-blue-700 transition'
                        >
                            {product.store.name}
                            {product.store.isVerified && ' ✓'}
                        </button>
                    )}
                    
                    <div className='flex items-center gap-1'>
                        <div className='flex'>
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon key={index} size={11} className='text-transparent' fill={rating >= index + 1 ? "#fbbf24" : "#D1D5DB"} />
                            ))}
                        </div>
                        <span className='text-xs text-slate-500 max-sm:hidden'>({product.rating?.length || 0})</span>
                    </div>
                    <div className='flex items-baseline gap-1 sm:gap-2'>
                        <p className='font-bold text-slate-900 text-xs sm:text-sm'>{currency}{product.price}</p>
                        <p className='text-xs text-slate-400 line-through max-sm:text-xs'>{currency}{product.mrp}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard