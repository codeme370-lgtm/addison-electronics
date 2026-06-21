import crypto from 'crypto'

export function createSessionCookie(user) {
  const sessionPayload = {
    id: user.id,
    role: user.role || 'customer',
    name: user.name,
    email: user.email,
    image: user.image,
  }

  const encoded = Buffer.from(JSON.stringify(sessionPayload)).toString('base64')
  const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''

  return `session=${encoded}; Path=/; ${secureFlag}HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
}

export function clearSessionCookie() {
  return 'session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax;'
}

export function getSessionFromRequest(request) {
  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null
  const sessionCookie = cookieHeader
    .split('; ')
    .find((c) => c.startsWith('session='))
  if (!sessionCookie) return null

  try {
    const base64Value = sessionCookie.split('=')[1]
    const payload = JSON.parse(Buffer.from(base64Value, 'base64').toString('utf8'))
    return payload
  } catch (err) {
    console.error('Failed to parse session cookie', err)
    return null
  }
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${derivedKey}`
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || typeof storedHash !== 'string') return false
  const [salt, key] = storedHash.split(':')
  if (!salt || !key) return false

  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex')
  const derivedBuffer = Buffer.from(derivedKey, 'hex')
  const keyBuffer = Buffer.from(key, 'hex')
  if (derivedBuffer.length !== keyBuffer.length) return false

  return crypto.timingSafeEqual(derivedBuffer, keyBuffer)
}
