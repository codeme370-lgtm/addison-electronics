import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Get seller profile with stats
    const store = await prisma.store.findUnique({
      where: { username },
      include: {
        user: {
          select: { name: true, email: true, image: true }
        },
        Product: {
          select: { id: true, name: true, price: true, images: true, rating: true }
        },
        sellerReviews: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { name: true, image: true } }
          }
        },
        _count: {
          select: { followers: true }
        }
      }
    });

    if (!store) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    // Calculate average seller rating
    const reviews = await prisma.sellerReview.findMany({
      where: { storeId: store.id }
    });

    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    return NextResponse.json({
      seller: {
        id: store.id,
        name: store.name,
        username: store.username,
        description: store.description,
        logo: store.logo,
        email: store.email,
        contact: store.contact,
        address: store.address,
        isVerified: store.isVerified,
        averageRating: parseFloat(avgRating),
        totalReviews: reviews.length,
        totalFollowers: store._count.followers,
        productsSold: store.productsSold,
        avgResponseTime: store.avgResponseTime,
        returnRate: store.returnRate,
        totalProducts: store.Product.length,
        categories: Array.from(new Set(store.Product.map(p => p.category).filter(Boolean))),
        createdAt: store.createdAt
      },
      products: store.Product.slice(0, 12), // Show latest 12 products
      reviews: store.sellerReviews
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching seller profile:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
