'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function SignInPage() {
  const router = useRouter()
  const { user, signIn } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    router.push('/')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.email || !form.password) {
      return setError('Please enter your email and password.')
    }

    setLoading(true)
    try {
      const res = await signIn({ email: form.email, password: form.password })
      if (res.error || !res.user) {
        setError(res.error || 'Unable to authenticate. Please check your credentials.')
      } else {
        setSuccess(res.message || 'Signed in successfully! Redirecting...')
        setTimeout(() => router.push('/'), 900)
      }
    } catch (err) {
      setError(err?.message || 'Auth error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050610] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.24),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_28%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-12 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <section className="space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500 text-white">TN</div>
                <span>TechNova secure login</span>
              </div>

              <div className="max-w-xl space-y-6">
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300">TechNova</p>
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">Welcome back.</h1>
                <p className="max-w-lg text-lg leading-8 text-slate-300">
                  Sign in to your TechNova account and continue discovering the latest deals, tracking your orders, and saving favorites.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Exclusive Deals</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Access member-only offers and discounts instantly after login.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Secure & Safe</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Your account is protected with encrypted credentials and secure sessions.</p>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-3xl">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-white">Sign in to TechNova</h2>
                  <p className="mt-1 text-sm text-slate-400">Enter your credentials to continue shopping.</p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/sign-up')}
                  className="self-start rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/90 p-5">
                  <label className="block text-sm font-medium text-slate-300">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/90 p-5">
                  <label className="block text-sm font-medium text-slate-300">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Continue to sign in'}
                </button>

                {error && <p className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
                {success && <p className="rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p>}
              </form>

              <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
                <p>Or continue with</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {['Google', 'Facebook', 'Instagram'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10"
                    >
                      Continue with {provider}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
