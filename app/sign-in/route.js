import { NextResponse } from 'next/server'

// Redirect any GET /sign-in requests to Clerk's sign-in page.
// Uses NEXT_PUBLIC_CLERK_SIGN_IN_URL if provided, otherwise falls back
// to Clerk's hosted sign-in URL.
const CLERK_SIGN_IN = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK || 'https://clerk.com/sign-in'

export async function GET() {
  return NextResponse.redirect(CLERK_SIGN_IN)
}
