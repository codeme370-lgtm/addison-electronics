import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get all search parameters
    const query = searchParams.get('q') || '';
    const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
    const maxPrice = parseFloat(searchParams.get('maxPrice')) || Infinity;
    const minRating = parseFloat(searchParams.get('minRating')) || 0;
    const category = searchParams.get('category');
    const seller = searchParams.get('seller');
    const sortBy = searchParams.get('sortBy') || 'newest'; // newest, price-low, price-high, rating, popular
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;

    // Build filters
    const where = {
      AND: [
        // Price filter
        { price: { gte: minPrice } },
        { price: { lte: maxPrice } },
        // Category filter
        ...(category ? [{ category: { contains: category, mode: 'insensitive' } }] : []),
        // Seller filter
        ...(seller ? [{ store: { username: seller } }] : []),
        // Search query
        ...(query ? [{
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } }
          ]
        }] : [])
      ]
    };

    // Count total results
    const total = await prisma.product.count({ where });

    // Build orderBy
    let orderBy = { createdAt: 'desc' };
    if (sortBy === 'price-low') orderBy = { price: 'asc' };
    if (sortBy === 'price-high') orderBy = { price: 'desc' };
    if (sortBy === 'rating') orderBy = { rating: 'desc' };
    if (sortBy === 'popular') orderBy = { createdAt: 'desc' };

    // Get products with pagination
    const products = await prisma.product.findMany({
      where,
      include: {
        store: {
          select: { id: true, name: true, username: true, logo: true, isVerified: true, averageRating: true }
        },
        rating: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit
    });

    // Get unique categories for filter suggestions
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ['category']
    });

    // Get unique sellers for filter suggestions
    const sellers = await prisma.store.findMany({
      select: { id: true, name: true, username: true, logo: true, isVerified: true, averageRating: true },
      take: 10,
      orderBy: { averageRating: 'desc' }
    });

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      categories: categories.map(c => c.category).filter(Boolean).slice(0, 20),
      featuredSellers: sellers,
      filters: {
        query,
        minPrice,
        maxPrice,
        minRating,
        category: category || null,
        seller: seller || null,
        sortBy
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
