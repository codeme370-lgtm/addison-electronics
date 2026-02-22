import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { storeId, orderId, rating, review, communicationRating, shippingRating, userId } = body;

    // Validate input
    if (!storeId || !orderId || !rating || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create seller review
    const sellerReview = await prisma.sellerReview.create({
      data: {
        storeId,
        orderId,
        userId,
        rating,
        review: review || '',
        communicationRating: communicationRating || 3,
        shippingRating: shippingRating || 3
      }
    });

    // Update store stats
    const allReviews = await prisma.sellerReview.findMany({
      where: { storeId }
    });

    const avgRating = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;

    await prisma.store.update({
      where: { id: storeId },
      data: {
        averageRating: parseFloat(avgRating.toFixed(1)),
        totalReviews: allReviews.length
      }
    });

    return NextResponse.json({
      message: 'Review submitted successfully',
      review: sellerReview
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting seller review:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
