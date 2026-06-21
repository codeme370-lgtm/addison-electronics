'use client'

import { Heart, Trash2Icon, ShoppingCart, Share2, Star, Truck, RotateCcw, Lock, Headphones } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { fetchProducts } from "@/lib/features/product/productSlice";
import { useAuth } from '@/context/AuthContext';
import toast from "react-hot-toast";

export default function Wishlist() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'GHS';
    
    const { wishlistItems } = useSelector(state => state.wishlist);
    const products = useSelector(state => state.product.list);
    const { user } = useAuth();

    const dispatch = useDispatch();

    const [wishlistArray, setWishlistArray] = useState([]);
    const [loadingItems, setLoadingItems] = useState(new Set());
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [compareCount] = useState(2);
    const [recentlyViewedCount] = useState(0);

    const createWishlistArray = () => {
        const wishlistArray = [];
        for (const [key] of Object.entries(wishlistItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                wishlistArray.push(product);
            }
        }
        setWishlistArray(wishlistArray);
    }

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFromWishlist({ productId }))
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(productId);
            return newSet;
        });
        toast.success('Removed from wishlist')
    }

    const handleAddToCart = (productId) => {
        setLoadingItems(prev => new Set(prev).add(productId))
        dispatch(addToCart({ productId }))
        setTimeout(() => {
            setLoadingItems(prev => {
                const newSet = new Set(prev)
                newSet.delete(productId)
                return newSet
            })
            toast.success('Added to cart')
        }, 600)
    }

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(new Set(wishlistArray.map(p => p.id)));
        } else {
            setSelectedItems(new Set());
        }
    }

    const handleSelectItem = (productId) => {
        const newSet = new Set(selectedItems);
        if (newSet.has(productId)) {
            newSet.delete(productId);
        } else {
            newSet.add(productId);
        }
        setSelectedItems(newSet);
    }

    const handleAddSelectedToCart = () => {
        if (selectedItems.size === 0) {
            toast.error('No items selected');
            return;
        }
        selectedItems.forEach(productId => {
            dispatch(addToCart({ productId }));
        });
        toast.success(`Added ${selectedItems.size} items to cart`);
        setSelectedItems(new Set());
    }

    const handleRemoveSelected = () => {
        if (selectedItems.size === 0) {
            toast.error('No items selected');
            return;
        }
        selectedItems.forEach(productId => {
            dispatch(removeFromWishlist({ productId }));
        });
        toast.success(`Removed ${selectedItems.size} items`);
        setSelectedItems(new Set());
    }

    useEffect(() => {
        if (products.length > 0) {
            createWishlistArray();
        }
    }, [wishlistItems, products]);

    useEffect(() => {
        dispatch(fetchProducts({}));
    }, [dispatch]);

    const renderRating = (rating) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                    />
                ))}
                <span className="text-xs text-gray-400 ml-1">({Math.floor(Math.random() * 1000)} reviews)</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Header with buttons */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <Heart className="text-red-600 fill-red-600" size={36} />
                            My Wishlist ({wishlistArray.length})
                        </h1>
                        <p className="text-slate-400 text-sm mt-2">Save your favorite items and shop them anytime you want.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all">
                            <Share2 size={18} />
                            <span>Share Wishlist</span>
                        </button>
                        <button 
                            onClick={handleAddSelectedToCart}
                            disabled={selectedItems.size === 0}
                            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                        >
                            <ShoppingCart size={18} />
                            <span>Add All to Cart</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="space-y-6">
                            {/* My Wishlist */}
                            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <Heart size={24} className="text-red-600 fill-red-600" />
                                    <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">{wishlistArray.length}</span>
                                </div>
                                <h3 className="text-white font-semibold">My Wishlist</h3>
                                <p className="text-slate-400 text-xs mt-1">{wishlistArray.length} items saved</p>
                            </div>

                            {/* Compare */}
                            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2m0 0l2-2m-2 2v-2m-2-8h4" />
                                    </svg>
                                    <span className="bg-violet-600 text-white text-xs font-bold rounded-full px-2 py-1">{compareCount}</span>
                                </div>
                                <h3 className="text-white font-semibold">Compare</h3>
                                <p className="text-slate-400 text-xs mt-1">{compareCount} items</p>
                            </div>

                            {/* Recently Viewed */}
                            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-semibold">Recently Viewed</h3>
                                <p className="text-slate-400 text-xs mt-1">No items yet</p>
                            </div>

                            {/* Don't Miss Out */}
                            <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-lg p-4 border border-violet-500">
                                <div className="text-center">
                                    <div className="text-3xl mb-3">🛒</div>
                                    <h3 className="text-white font-bold mb-2">Don't Miss Out!</h3>
                                    <p className="text-violet-100 text-xs mb-4">Items in your wishlist may go out of stock. Add to cart now!</p>
                                    <Link href="/shop" className="inline-flex items-center gap-2 bg-white text-violet-600 hover:bg-slate-100 px-3 py-2 rounded-lg text-xs font-bold transition-all">
                                        <span>Shop Now</span>
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-4">
                        {wishlistArray.length > 0 ? (
                            <>
                                {/* Wishlist Table/Grid */}
                                <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-slate-800 border-b border-slate-700">
                                                    <th className="px-4 py-4 text-left">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={selectedItems.size === wishlistArray.length && wishlistArray.length > 0}
                                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                                            className="rounded"
                                                        />
                                                    </th>
                                                    <th className="px-4 py-4 text-left text-slate-300 font-semibold">Product</th>
                                                    <th className="px-4 py-4 text-left text-slate-300 font-semibold">Price</th>
                                                    <th className="px-4 py-4 text-left text-slate-300 font-semibold">Status</th>
                                                    <th className="px-4 py-4 text-left text-slate-300 font-semibold">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-700">
                                                {wishlistArray.map((product, index) => (
                                                    <tr key={product.id || index} className="hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-4 py-4">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={selectedItems.has(product.id)}
                                                                onChange={() => handleSelectItem(product.id)}
                                                                className="rounded"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <Link href={`/product/${product.id}`} className="flex items-center gap-4">
                                                                <div className="w-16 h-16 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                                                                    <Image
                                                                        src={product.images?.[0] || '/placeholder.jpg'}
                                                                        alt={product?.name || 'Product'}
                                                                        width={64}
                                                                        height={64}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-white font-semibold hover:text-violet-400 transition-colors line-clamp-2">
                                                                        {product.name}
                                                                    </h4>
                                                                    {renderRating(product.rating || 4)}
                                                                </div>
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-violet-400 font-bold">{currency}{product.price}</span>
                                                                    {product.mrp && (
                                                                        <span className="text-slate-500 line-through text-sm">{currency}{product.mrp}</span>
                                                                    )}
                                                                </div>
                                                                {product.mrp && product.price && (
                                                                    <span className="text-xs font-bold text-amber-400 mt-1">
                                                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="text-sm">
                                                                <span className="text-green-400 font-semibold">In Stock</span>
                                                                <p className="text-slate-400 text-xs">Ships in 24 hrs</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleAddToCart(product.id)}
                                                                    disabled={loadingItems.has(product.id)}
                                                                    className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-lg transition-all disabled:opacity-50"
                                                                    title="Add to cart"
                                                                >
                                                                    <ShoppingCart size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRemoveFromWishlist(product.id)}
                                                                    className="bg-slate-800 hover:bg-red-600/20 text-red-400 hover:text-red-300 p-2 rounded-lg transition-all"
                                                                    title="Remove from wishlist"
                                                                >
                                                                    <Trash2Icon size={16} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Bottom Actions */}
                                <div className="flex items-center justify-between mt-6">
                                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedItems.size === wishlistArray.length && wishlistArray.length > 0}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="rounded"
                                        />
                                        <span className="text-sm">Select All ({wishlistArray.length})</span>
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleRemoveSelected}
                                            disabled={selectedItems.size === 0}
                                            className="text-red-400 hover:text-red-300 font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Remove Selected
                                        </button>
                                        <button 
                                            onClick={handleAddSelectedToCart}
                                            disabled={selectedItems.size === 0}
                                            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                                        >
                                            <ShoppingCart size={16} />
                                            <span>Add All to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-slate-900 rounded-lg border border-slate-800 p-12 text-center">
                                <Heart size={64} className="text-slate-700 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-white mb-2">Your Wishlist is Empty</h2>
                                <p className="text-slate-400 mb-6">
                                    Add items to your wishlist to save them for later
                                </p>
                                <Link 
                                    href="/shop"
                                    className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-4 bg-slate-900 rounded-lg p-6 border border-slate-800">
                        <Truck className="text-violet-400" size={32} />
                        <div>
                            <h4 className="text-white font-bold">Free Shipping</h4>
                            <p className="text-slate-400 text-sm">On orders over $99</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900 rounded-lg p-6 border border-slate-800">
                        <RotateCcw className="text-violet-400" size={32} />
                        <div>
                            <h4 className="text-white font-bold">30-Day Returns</h4>
                            <p className="text-slate-400 text-sm">Hassle free returns</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900 rounded-lg p-6 border border-slate-800">
                        <Lock className="text-violet-400" size={32} />
                        <div>
                            <h4 className="text-white font-bold">Secure Payments</h4>
                            <p className="text-slate-400 text-sm">100% secure checkout</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900 rounded-lg p-6 border border-slate-800">
                        <Headphones className="text-violet-400" size={32} />
                        <div>
                            <h4 className="text-white font-bold">24/7 Support</h4>
                            <p className="text-slate-400 text-sm">We're here to help</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
