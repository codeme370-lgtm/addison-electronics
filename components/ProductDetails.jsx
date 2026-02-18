'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon, Check, Loader } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { assets } from "@/assets/assets";


const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const [mainImage, setMainImage] = useState(product?.images?.[0] || assets.product_placeholder || '/placeholder.svg');
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartConfirmed, setCartConfirmed] = useState(false);
    const { user, isLoaded } = useUser()
    const router = useRouter()

    const addToCartHandler = async () => {
        if (!isLoaded || !user) {
            toast.error('Please sign in to add items to your cart')
            return
        }
        setIsAddingToCart(true)
        dispatch(addToCart({ productId }))
        
        // Simulate processing
        setTimeout(() => {
            setIsAddingToCart(false)
            setCartConfirmed(true)
            toast.success('Added to cart!')
            setTimeout(() => setCartConfirmed(false), 2000)
        }, 600)
    }

    const handleImageHover = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setZoomPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsZoomed(true);
    }

    const averageRating = product?.rating && product.rating.length > 0 ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length : 0;
    
    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                {/* Thumbnail Gallery */}
                <div className="flex sm:flex-col gap-3">
                    {product?.images && product.images.map((image, index) => (
                        <div 
                            key={index} 
                            onClick={() => image && setMainImage(image)} 
                            className={`bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer border-2 transition-all duration-200 ${mainImage === image ? 'border-green-500 shadow-lg' : 'border-transparent hover:border-slate-300'}`}
                        >
                            <Image 
                                src={image || assets.product_placeholder} 
                                className="group-hover:scale-110 group-active:scale-95 transition duration-300" 
                                alt={product?.name ? `${product.name} thumbnail ${index + 1}` : 'Product thumbnail'} 
                                width={45} 
                                height={45} 
                            />
                        </div>
                    ))}
                </div>
                
                {/* Main Image Gallery with Zoom */}
                <div 
                    className="flex justify-center items-center h-100 w-full sm:size-113 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden relative group cursor-zoom-in"
                    onMouseEnter={handleImageHover}
                    onMouseLeave={() => setIsZoomed(false)}
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image 
                            src={mainImage} 
                            alt={product?.name ? `${product.name} main image` : 'Product main image'} 
                            width={500} 
                            height={500} 
                            className={`transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                            style={{ transformOrigin: `${zoomPosition.x}px ${zoomPosition.y}px` }}
                        />
                    </div>
                    {isZoomed && (
                        <div className="absolute top-2 right-2 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                            🔍 Zoom
                        </div>
                    )}
                </div>
            </div>
            
            {/* Product Details */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{product.name}</h1>
                
                {/* Rating Section */}
                <div className='flex items-center mt-3 gap-2'>
                    <div className="flex">
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={16} className='text-transparent' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                        ))}
                    </div>
                    <p className="text-sm font-medium text-slate-600">{product?.rating?.length || 0} Customer Reviews</p>
                </div>
                
                {/* Price Section */}
                <div className="flex items-start my-6 gap-4 text-2xl font-bold text-slate-800">
                    <p className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">{currency}{product.price}</p>
                    <p className="text-lg text-slate-400 line-through">{currency}{product.mrp}</p>
                    <span className="text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}%</span>
                </div>
                
                <hr className="border-gray-300 my-6" />
                
                {/* Quantity and Add to Cart */}
                <div className="flex items-end gap-5 mb-6">
                    {
                        cart[productId] && (
                            <div className="flex flex-col gap-3">
                                <p className="text-lg text-slate-800 font-semibold">Quantity</p>
                                <Counter productId={productId} />
                            </div>
                        )
                    }
                    <button 
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} 
                        disabled={isAddingToCart}
                        className={`flex items-center justify-center gap-2 px-10 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                            cartConfirmed 
                                ? 'bg-green-500 text-white' 
                                : !cart[productId]
                                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:shadow-lg hover:from-slate-900 hover:to-black active:scale-95'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg active:scale-95'
                        } ${isAddingToCart ? 'opacity-80' : ''}`}
                    >
                        {isAddingToCart ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                Adding...
                            </>
                        ) : cartConfirmed ? (
                            <>
                                <Check size={18} />
                                Added to Cart!
                            </>
                        ) : (
                            !cart[productId] ? 'Add to Cart' : 'View Cart'
                        )}
                    </button>
                </div>
                
                <hr className="border-gray-300 my-6" />
                
                {/* Trust Badges */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 space-y-3 border border-slate-200">
                    <div className="flex gap-3 items-center text-slate-700 font-medium"> 
                        <div className="bg-green-100 p-2 rounded-full">
                            <EarthIcon className="text-green-600" size={18} />
                        </div>
                        Free delivery worldwide
                    </div>
                    <div className="flex gap-3 items-center text-slate-700 font-medium"> 
                        <div className="bg-blue-100 p-2 rounded-full">
                            <CreditCardIcon className="text-blue-600" size={18} />
                        </div>
                        100% Secured Payment
                    </div>
                    <div className="flex gap-3 items-center text-slate-700 font-medium"> 
                        <div className="bg-purple-100 p-2 rounded-full">
                            <UserIcon className="text-purple-600" size={18} />
                        </div>
                        Trusted by thousands
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails