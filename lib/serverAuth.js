import { getSessionFromRequest } from './authHelpers'
import prisma from './prisma'

export async function getServerAuth(request) {
  try {
    const session = getSessionFromRequest(request)
    const userId = session?.id || null
    if (!userId) {
      return { userId: null, has: () => false }
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true }
    })

    const has = ({ plan }) => {
      if (!user) return false
      if (plan === 'plus') return user.role === 'plus'
      return false
    }

    return { userId, has }
  } catch (error) {
    console.error('Server auth error:', error)
    return { userId: null, has: () => false }
  }
}
