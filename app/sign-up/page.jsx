'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function SignUpPage() {
  const router = useRouter()
  const { user, signUp } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
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

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      return setError('Please complete all fields.')
    }
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.')
    }
    if (form.password.length < 8) {
      return setError('Password must be at least 8 characters.')
    }

    setLoading(true)
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        imageUrl: ''
      }
      const res = await signUp(payload)
      if (res.error) {
        setError(res.error)
      } else {
        setSuccess(res.message || 'Account created successfully! Redirecting...')
        setTimeout(() => router.push('/'), 900)
      }
    } catch (err) {
      setError(err?.message || 'Signup failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050610] text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.25),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_28%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-12 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <section className="space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500 text-white">TN</div>
                <span>Teknova premium signup</span>
              </div>

              <div className="max-w-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-white">TechNova</span>
                  <span className="text-xl text-violet-400">.</span>
                </div>
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Tech for the future.
                </h1>
                <p className="max-w-lg text-lg leading-8 text-slate-300">
                  Create an account and get access to exclusive deals, top brands and the latest in tech.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Exclusive Deals</p>
                  <p className="mt-3 text-slate-300">Access member-only offers and discounts.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Secure & Safe</p>
                  <p className="mt-3 text-slate-300">Your data is protected with enterprise-grade security.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">24/7 Support</p>
                  <p className="mt-3 text-slate-300">We&apos;re here to help anytime, anywhere.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Fast Setup</p>
                  <p className="mt-3 text-slate-300">Get up and running with a seamless onboarding flow.</p>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-3xl">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-white">Create your account</h2>
                  <p className="mt-1 text-sm text-slate-400">Join TechNova and start your tech journey</p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/sign-in')}
                  className="self-start rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                >
                  Login
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-5">
                  <div className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-slate-400">Sign Up</div>

                  <label className="block text-sm font-medium text-slate-300">Full Name</label>
                  <div className="mt-2 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-200 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-400/20">
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-sm text-white placeholder:text-slate-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <label className="block text-sm font-medium text-slate-300 mt-4">Email Address</label>
                  <div className="mt-2 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-200 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-400/20">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-sm text-white placeholder:text-slate-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <label className="block text-sm font-medium text-slate-300 mt-4">Password</label>
                  <div className="mt-2 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-200 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-400/20">
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-sm text-white placeholder:text-slate-500"
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <label className="block text-sm font-medium text-slate-300 mt-4">Confirm Password</label>
                  <div className="mt-2 rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-200 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-400/20">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-sm text-white placeholder:text-slate-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>

                {error && <p className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
                {success && <p className="rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p>}
              </form>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-sm text-slate-500">
                <p className="mb-4">or sign up with</p>
                <div className="grid gap-3 sm:grid-cols-3">
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

              <p className="mt-6 text-center text-sm text-slate-500">
                By creating an account, you agree to our <span className="text-violet-400">Terms of Service</span> and <span className="text-violet-400">Privacy Policy</span>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
