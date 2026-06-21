'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const timeout = window.setTimeout(() => setVisible(true), 120)
    return () => window.clearTimeout(timeout)
  }, [pathname])

  return (
    <div
      className={`transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
    >
      {children}
    </div>
  )
}
