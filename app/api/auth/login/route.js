import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createSessionCookie, verifyPassword } from '@/lib/authHelpers'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email?.trim() || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } })

    if (!user || !user.password || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const { password: _password, ...safeUser } = user
    const response = NextResponse.json({ message: 'Login successful', user: safeUser })
    response.headers.set('Set-Cookie', createSessionCookie(user))
    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
