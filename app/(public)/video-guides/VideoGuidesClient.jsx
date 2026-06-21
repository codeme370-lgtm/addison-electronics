'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Download, Heart, Play, Share2, Sparkles, TriangleRight, Video, Volume2 } from 'lucide-react'

const chapters = [
  { time: '00:00', title: 'Introduction', label: 'Overview of the ASUS ROG Zephyrus G14' },
  { time: '00:52', title: 'Unboxing', label: 'What comes inside the box' },
  { time: '02:15', title: 'Initial Setup', label: 'First boot and setup tips' },
  { time: '04:30', title: 'Keyboard Shortcuts', label: 'Power user productivity shortcuts' },
  { time: '06:45', title: 'Performance Modes', label: 'Optimizing performance with Armoury Crate' },
  { time: '09:20', title: 'Advanced Features', label: 'Exploring AniMe Matrix and AI modes' },
  { time: '11:30', title: 'Troubleshooting', label: 'Quick fixes and support tips' },
]

const relatedVideos = [
  { title: 'How to Connect to Wi-Fi', subtitle: 'ASUS Official', views: '12K views', duration: '3:45' },
  { title: 'Armoury Crate Ultimate Guide', subtitle: 'ASUS Official', views: '18K views', duration: '8:12' },
  { title: 'Increase Battery Life', subtitle: 'ASUS Official', views: '9K views', duration: '4:33' },
  { title: 'ROG Zephyrus G14 Tips & Tricks', subtitle: 'ASUS Official', views: '15K views', duration: '6:27' },
]

const highlights = [
  'NVIDIA® GeForce RTX™ 4060',
  'AMD Ryzen™ 9 7940HS Processor',
  '14" QHD+ 165Hz Display',
  '16GB LPDDR5X RAM',
  '1TB PCIe® 4.0 SSD Storage',
  'Windows 11 Home',
]

export default function VideoGuidesClient() {
  const [activeChapter, setActiveChapter] = useState(chapters[2].time)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className={`rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.9)] transition duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Home / Shop / Laptops / ASUS ROG Zephyrus G14 / Video Guide</p>
              <h1 className="mt-4 text-4xl font-semibold text-white">ASUS ROG Zephyrus G14 (2024)</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-400">Complete video guide with setup, performance tips, shortcuts, and troubleshooting for your new ROG laptop.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-4 py-3 text-sm text-slate-300 shadow-sm shadow-slate-950/20">
              <Video size={18} className="text-violet-300" /> Video Session
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.5fr_0.85fr]">
            <div className="space-y-6">
              <div className="rounded-[32px] border border-slate-800 bg-slate-950/90 p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.8)]">
                <div className="grid gap-6 lg:grid-cols-[1fr_0.35fr]">
                  <div className="space-y-5">
                    <div className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/90">
                      <div className="aspect-video bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.25),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(15,23,42,0.95))] bg-cover bg-center p-6">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950" />
                        <button className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-violet-500/90 p-5 text-white shadow-xl shadow-violet-500/20 transition hover:scale-105">
                          <Play size={28} />
                        </button>
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
                          <Volume2 size={14} /> 1080p
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-4">
                      {['Cover', 'Features', 'Setup', '+2 More'].map((label) => (
                        <div key={label} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-3 text-center text-sm text-slate-300 transition hover:border-violet-500 hover:text-white">
                          {label}
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button className="inline-flex items-center justify-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                        <Download size={16} /> Download Transcript
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-800 bg-slate-950/90 px-5 py-3 text-sm text-slate-200 transition hover:border-violet-500 hover:text-white">
                        <Share2 size={16} /> Share Video
                      </button>
                    </div>
                  </div>

                  <aside className="space-y-4 rounded-[28px] border border-slate-800 bg-slate-950/80 p-5">
                    <div className="rounded-[28px] bg-slate-900/90 p-4">
                      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Video Chapters</p>
                      <div className="mt-4 space-y-2">
                        {chapters.map((chapter) => (
                          <button
                            key={chapter.time}
                            onClick={() => setActiveChapter(chapter.time)}
                            className={`flex w-full items-start justify-between gap-3 rounded-3xl border px-4 py-3 text-left text-sm transition ${activeChapter === chapter.time ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-slate-800 bg-slate-950/90 text-slate-300 hover:border-violet-500 hover:bg-slate-950'}`}
                          >
                            <div>
                              <p className="font-semibold">{chapter.title}</p>
                              <p className="mt-1 text-slate-500">{chapter.label}</p>
                            </div>
                            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">{chapter.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-800 bg-slate-900/90 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Related Video Guides</p>
                          <p className="mt-1 text-xs text-slate-500">Explore similar content.</p>
                        </div>
                        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">View All</span>
                      </div>
                      <div className="mt-5 space-y-3">
                        {relatedVideos.map((video) => (
                          <div key={video.title} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 transition hover:border-violet-500">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-semibold text-white">{video.title}</p>
                                <p className="mt-1 text-sm text-slate-500">{video.subtitle}</p>
                              </div>
                              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">{video.duration}</span>
                            </div>
                            <p className="mt-3 text-sm text-slate-500">{video.views}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-5 text-center">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Need more help?</p>
                      <p className="mt-3 text-sm text-slate-300">Visit ASUS Support Center for manuals, downloads, and warranty info.</p>
                      <button className="mt-6 inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                        Get Support <ArrowRight size={16} />
                      </button>
                    </div>
                  </aside>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.8)]">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Video Transcript</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">Transcript timeline</h2>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                    <Play size={16} /> {activeChapter} selected
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/90 p-4">
                  <div className="grid gap-3">
                    {chapters.map((chapter) => (
                      <div key={chapter.time} className={`rounded-3xl border px-4 py-4 transition ${activeChapter === chapter.time ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-violet-500 hover:bg-slate-950'}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold">{chapter.title}</p>
                            <p className="mt-1 text-sm text-slate-500">{chapter.label}</p>
                          </div>
                          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{chapter.time}</span>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-400">Dive into the {chapter.title.toLowerCase()} section with expert tips, guided walkthroughs, and real product examples to get the most from your ROG G14.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-800 bg-slate-950/80 p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-4 text-sm text-slate-300 transition hover:border-violet-500 hover:text-white">
                      <span className="rounded-full bg-violet-500/10 p-2 text-violet-300"><Sparkles size={16} /></span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
