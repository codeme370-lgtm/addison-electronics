'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { assets } from "@/assets/assets"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-9 sm:my-12 md:my-18 text-xs sm:text-sm md:text-base text-slate-600">

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-4 sm:mb-6 max-w-2xl overflow-x-auto">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button className={`${tab === selectedTab ? 'border-b-[1.5px] font-semibold' : 'text-slate-400'} px-2 sm:px-3 py-2 font-medium text-xs sm:text-sm whitespace-nowrap`} key={index} onClick={() => setSelectedTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <p className="max-w-xl leading-relaxed">{product.description}</p>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-3 mt-8 sm:mt-12 md:mt-14">
                    {product?.rating && product.rating.length > 0 ? product.rating.map((item,index) => (
                        <div key={index} className="flex gap-3 sm:gap-5 mb-8 sm:mb-10">
                            <Image src={item.user.image} alt={item.user?.name ? `${item.user.name} avatar` : 'User avatar'} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" width={100} height={100} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center" >
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={14} className='sm:size-[18px] text-transparent mt-0.5' fill={item.rating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                                    ))}
                                </div>
                                <p className="text-xs sm:text-sm md:text-base max-w-lg my-2 sm:my-4 break-words">{item.review}</p>
                                <p className="font-medium text-slate-800 text-xs sm:text-sm">{item.user.name}</p>
                                <p className="mt-2 sm:mt-3 font-light text-xs sm:text-sm text-slate-500">{new Date(item.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    )) : <p className="text-slate-400 text-xs sm:text-sm">No reviews yet</p>}
                </div>
            )}

            {/* Store Page */}
                <div className="flex gap-3 mt-14">
                <Image src={product.store?.logo || '/favicon.ico' || assets.product_placeholder || '/placeholder.svg'} alt={product.store?.name ? `${product.store.name} logo` : 'Store logo'} className="size-11 rounded-full ring ring-slate-400 object-cover" width={100} height={100} />
                <div>
                    <p className="font-medium text-slate-600">Product by {product.store.name}</p>
                    <Link href={`/shop/${product.store.username}`} className="flex items-center gap-1.5 text-green-500"> view store <ArrowRight size={14} /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription