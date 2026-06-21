import { getServerAuth } from '@/lib/serverAuth';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { inngest } from "@/lib/inngest";


//creating a coupon

export async function POST(request) {
    try {
       //let's get the user Id
       const { userId } = getServerAuth(request);
       //check if the user is an admin from the middleware
       const isAdmin = await authAdmin(userId)
       //if it is not an admin, return error
       if(!isAdmin){
        return NextResponse.json({ error: 'you are not authorized to perform this action' }, { status: 401 });
       }
       const {coupon} = await request.json();
       if (!coupon || !coupon.code || !coupon.discount || !coupon.expiresAt) {
          return NextResponse.json({ error: 'Coupon code, discount and expiry date are required' }, { status: 400 });
       }

       const couponData = {
         ...coupon,
         code: coupon.code.toUpperCase(),
         discount: Number(coupon.discount),
         expiresAt: new Date(coupon.expiresAt)
       }

       const createdCoupon = await prisma.coupon.create({
         data: couponData
       })

       await inngest.send({
            name: 'app/coupon.expired',
            data: {
                code: createdCoupon.code,
                expires_at: createdCoupon.expiresAt
            }
        });

       return NextResponse.json({message:'coupon created successfully'});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 } )
    }
}

//Delete a coupon /api/admin/coupon?code=COUPONCODE
export async function DELETE(request){
    try{
       // let's get the user Id and check if admin
       const { userId } = getServerAuth(request);
       const isAdmin = await authAdmin(userId)
       if(!isAdmin){
        return NextResponse.json({ error: 'you are not authorized to perform this action' }, { status: 401 });
       }

       const { searchParams } = new URL(request.url);
       const code = searchParams.get('code');

       if (!code) {
           return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
       }

       const deleted = await prisma.coupon.delete({
        where: { code }
       });

       if (!deleted) {
           return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
       }

       return NextResponse.json({message:'coupon deleted successfully'});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 } )
    }
}

//creating the api to get all coupons
export async function GET(request){
    try{
        //get the user and check if admin
       const { userId } = getServerAuth(request);
       const isAdmin = await authAdmin(userId)
       //if it is not an admin, return error
       if(!isAdmin){
        return NextResponse.json({ error: 'you are not authorized to perform this action' }, { status: 401 });
       }
       //fetch all coupons from prisma
       const coupons=await prisma.coupon.findMany({
        orderBy:{createdAt:'desc'}
       })
       //return the response
       return NextResponse.json({coupons});

    }catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 } )
    }
}