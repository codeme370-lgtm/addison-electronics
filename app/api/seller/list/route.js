import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 24;
    const q = searchParams.get('q') || '';
    const verified = searchParams.get('verified'); // 'true' or undefined
    const minRating = parseFloat(searchParams.get('minRating')) || 0;
    const category = searchParams.get('category');

    // Build where clause only when filters exist
    const conditions = [];
    if (q) conditions.push({ OR: [ { name: { contains: q, mode: 'insensitive' } }, { username: { contains: q, mode: 'insensitive' } } ] });
    if (verified === 'true') conditions.push({ isVerified: true });
    if (minRating > 0) conditions.push({ averageRating: { gte: minRating } });
    if (category) conditions.push({ product: { some: { category: { contains: category, mode: 'insensitive' } } } });

    const where = conditions.length > 0 ? { AND: conditions } : {};

    const total = await prisma.store.count({ where });

    const sellers = await prisma.store.findMany({
      where,
      select: {
        id: true,
        name: true,
        username: true,
        logo: true,
        description: true,
        isVerified: true,
        averageRating: true,
        productsSold: true,
        _count: { select: { Product: true, followers: true } },
        Product: { select: { category: true }, take: 50 }
      },
      orderBy: { averageRating: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const formatted = sellers.map(s => ({
      id: s.id,
      name: s.name,
      username: s.username,
      logo: s.logo,
      description: s.description,
      isVerified: s.isVerified,
      averageRating: s.averageRating,
      productsSold: s.productsSold,
      totalProducts: s._count.Product,
      totalFollowers: s._count.followers,
      categories: Array.from(new Set((s.Product || []).map(p => p.category).filter(Boolean)))
    }));

    // Global categories for filter dropdown
    const categoriesRaw = await prisma.product.findMany({ select: { category: true }, distinct: ['category'] });
    const allCategories = categoriesRaw.map(c => c.category).filter(Boolean);

    return NextResponse.json({ sellers: formatted, page, limit, total, totalPages: Math.ceil(total / limit), allCategories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching sellers list:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
