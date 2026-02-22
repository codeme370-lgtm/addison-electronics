import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = Math.min(parseInt(searchParams.get('limit')) || 10, 20);

    if (!query || query.length < 2) {
      return NextResponse.json({
        suggestions: [],
        categories: [],
        sellers: []
      }, { status: 200 });
    }

    // Search products by name/category
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } }
        ]
      },
      select: { name: true, category: true },
      distinct: ['name'],
      take: limit / 2
    });

    // Get unique product suggestions
    const productSuggestions = [...new Set(
      products.map(p => ({ type: 'product', value: p.name, category: p.category }))
    )];

    // Search categories
    const categories = await prisma.product.findMany({
      where: {
        category: { contains: query, mode: 'insensitive' }
      },
      select: { category: true },
      distinct: ['category'],
      take: Math.ceil(limit / 3)
    });

    const categorySuggestions = categories
      .filter(c => c.category)
      .map(c => ({ type: 'category', value: c.category }));

    // Search sellers
    const sellers = await prisma.store.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } }
        ],
        isActive: true
      },
      select: { id: true, name: true, username: true, logo: true, isVerified: true, averageRating: true },
      take: Math.ceil(limit / 3)
    });

    const sellerSuggestions = sellers.map(s => ({
      type: 'seller',
      value: s.name,
      username: s.username,
      logo: s.logo,
      isVerified: s.isVerified,
      rating: s.averageRating
    }));

    // Combine and deduplicate all suggestions
    const allSuggestions = [
      ...productSuggestions.slice(0, Math.ceil(limit / 2)),
      ...categorySuggestions.slice(0, Math.ceil(limit / 3)),
      ...sellerSuggestions.slice(0, Math.ceil(limit / 3))
    ];

    return NextResponse.json({
      suggestions: allSuggestions.slice(0, limit)
    }, { status: 200 });
  } catch (error) {
    console.error('Error getting search autocomplete:', error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
