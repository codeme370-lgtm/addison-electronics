'use client'

import React from 'react'

export default function SideDrawer({ open, onClose, children }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
        style={{ zIndex: 40 }}
      />

      <aside
        className={`fixed inset-y-0 left-0 w-[min(90vw,360px)] bg-slate-950 text-slate-100 shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!open}
        style={{ zIndex: 50 }}
      >
        <div className="h-full overflow-y-auto p-6">{children}</div>
      </aside>
    </>
  )
}
