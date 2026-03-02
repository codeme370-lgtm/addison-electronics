"use client"

import Link from 'next/link'

export default function PolicyPage(){
    return (
        <div className="min-h-screen bg-sky-50 py-16">
            <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
                <h1 className="text-3xl font-semibold text-slate-800 mb-4">Privacy & Policy</h1>
                <p className="text-slate-600 mb-6">Welcome to JeesCage. This page outlines our privacy practices, terms and policies that govern the use of our website and services.</p>

                <section className="mb-6">
                    <h2 className="text-xl font-medium text-slate-800 mb-2">Privacy</h2>
                    <p className="text-slate-600">We collect only the data necessary to provide and improve our services. Personal data is processed securely and only used for order processing, shipping, account management and customer support. We do not sell personal data to third parties.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-medium text-slate-800 mb-2">Cookies</h2>
                    <p className="text-slate-600">We use cookies and similar technologies to remember preferences, enable core functionality, and analyze website usage. You can manage cookie preferences in your browser settings.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-medium text-slate-800 mb-2">Terms of Use</h2>
                    <p className="text-slate-600">By using our site you agree to our terms and conditions. You must be at least 18 years old to purchase products. All product listings, prices and promotions are subject to change.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-medium text-slate-800 mb-2">Returns & Refunds</h2>
                    <p className="text-slate-600">Our refund and returns policy is customer-friendly. If a product is faulty or not as described, contact support within the stated return window and we’ll help process a return or refund.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-medium text-slate-800 mb-2">Contact</h2>
                    <p className="text-slate-600">If you have any questions about these policies, please <Link href="/contact" className="text-sky-600 hover:underline">contact us</Link>.</p>
                </section>

                <div className="mt-8 text-sm text-slate-500">
                    <p>Last updated: March 01, 2026</p>
                </div>
            </div>
        </div>
    )
}
