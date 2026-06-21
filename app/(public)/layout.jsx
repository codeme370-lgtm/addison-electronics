'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/product/productSlice";
import { fetchCategories } from "@/lib/features/category/categorySlice";
import { useAuth } from "@/context/AuthContext";
import { fetchCart,uploadCart } from "@/lib/features/cart/cartSlice";
import { fetchAddress } from "@/lib/features/address/addressSlice";
import { fetchUserRatings } from "@/lib/features/rating/ratingSlice";

export default function PublicLayout({ children }) {
  const dispatch = useDispatch()
  const {user} = useAuth()
  //get cart items on load
  const {cartItems} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts({}))
    dispatch(fetchCategories())
  }, [])

 useEffect(()=>{
if(user){
        dispatch(fetchCart())
        dispatch(fetchAddress())
        dispatch(fetchUserRatings())
}
}, [user])


useEffect(()=>{
if(user){
        dispatch(uploadCart())
}
}, [cartItems])

    return (
        <>
            <Navbar />
            <div className="transition-all duration-300">
                {children}
            </div>
            <Footer />
        </>
    );
}
