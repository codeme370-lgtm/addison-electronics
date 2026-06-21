import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createSessionCookie, hashPassword } from '@/lib/authHelpers'

export async function POST(request) {
  try {
    const body = await request.json()
    const { fullName, email, password, imageUrl } = body

    if (!fullName?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ error: 'Full name, email and password are required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } })
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const user = await prisma.user.create({
      data: {
        name: fullName.trim(),
        email: normalizedEmail,
        password: hashPassword(password),
        image: imageUrl?.trim() || '',
        role: 'customer',
        authType: 'local',
        cart: {},
      },
    })

    const { password: _password, ...safeUser } = user
    const response = NextResponse.json({ message: 'Signup successful', user: safeUser })
    response.headers.set('Set-Cookie', createSessionCookie(user))
    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
