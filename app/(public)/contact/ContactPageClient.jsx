'use client'

import { Mail, Phone, MapPin, Clock, Send, MessageSquare, LifeBuoy, Headphones } from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "support@teknova.com",
    description: "We're available 24/7"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    description: "Mon - Sat: 9:00 AM - 8:00 PM"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    details: "Chat with our support team",
    description: "Available on our website"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Tech Street, Silicon Valley, CA",
    description: "Mon - Fri: 9:00 AM - 6:00 PM"
  }
];

const ContactPageClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: hook up to API later
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050714] text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.18),_transparent_20%),radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.12),_transparent_25%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.28em] text-violet-300">CONTACT US</p>
              <h1 className="text-5xl font-bold leading-tight">
                We\u0002re Here to <span className="text-violet-400">Help You!</span>
              </h1>
              <p className="text-slate-300 max-w-2xl">
                Have a question, need support, or want to work with us? Our team is ready to assist you.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-start gap-3 rounded-2xl bg-[#0b0f1a]/60 p-4">
                  <div className="rounded-full bg-violet-500/10 p-3">
                    <Send className="text-violet-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Fast Response</p>
                    <p className="text-sm text-slate-400">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-[#0b0f1a]/60 p-4">
                  <div className="rounded-full bg-violet-500/10 p-3">
                    <Headphones className="text-violet-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Expert Support</p>
                    <p className="text-sm text-slate-400">Get help from our specialists</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-[#0b0f1a]/60 p-4">
                  <div className="rounded-full bg-violet-500/10 p-3">
                    <LifeBuoy className="text-violet-300" />
                  </div>
                  <div>
                    <p className="font-semibold">Customer First</p>
                    <p className="text-sm text-slate-400">Your satisfaction is our priority</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1220]/80 to-[#050714]/80 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
                <h3 className="text-lg font-semibold text-slate-100">Send Us a Message</h3>
                <p className="text-sm text-slate-400 mt-2 mb-4">We typically respond within 24 hours — please provide as much detail as possible.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-3 rounded-lg bg-[#071021] border border-white/6 focus:outline-none" />
                    <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-[#071021] border border-white/6 focus:outline-none" />
                  </div>
                  <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-[#071021] border border-white/6 focus:outline-none">
                    <option value="">What is this regarding?</option>
                    <option>Product Inquiry</option>
                    <option>Order Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-lg bg-[#071021] border border-white/6 focus:outline-none resize-none" />
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-sky-500 px-4 py-3 font-semibold text-white">
                    <Send size={16} />
                    Send Message
                  </button>
                  {submitted && <div className="text-center text-sm text-emerald-300">Thanks — we'll get back to you soon.</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8">
        <h3 className="text-lg text-violet-300 mb-4">Other Ways to Reach Us</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="rounded-2xl border border-white/6 bg-[#071021] p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-violet-500/10 p-3">
                    <Icon className="text-violet-300" />
                  </div>
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm text-slate-400">{c.details}</p>
                    <p className="text-xs text-slate-500 mt-1">{c.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-[#071021] rounded-lg p-4">
                <summary className="font-semibold">How can I track my order?</summary>
                <p className="text-sm text-slate-400 mt-2">Use the tracking link sent to your email or check your orders page in your account.</p>
              </details>
              <details className="bg-[#071021] rounded-lg p-4">
                <summary className="font-semibold">What is your return policy?</summary>
                <p className="text-sm text-slate-400 mt-2">We offer 30-day returns on most items in original condition.</p>
              </details>
              <details className="bg-[#071021] rounded-lg p-4">
                <summary className="font-semibold">How can I request a refund?</summary>
                <p className="text-sm text-slate-400 mt-2">Contact support with your order number and reason for refund.</p>
              </details>
              <details className="bg-[#071021] rounded-lg p-4">
                <summary className="font-semibold">Do you offer international shipping?</summary>
                <p className="text-sm text-slate-400 mt-2">Yes — shipping rates and times vary by destination.</p>
              </details>
            </div>
            <div className="mt-4">
              <a href="/faq" className="text-sm text-violet-300 hover:underline">View All FAQs →</a>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#0b1020] to-[#060714] p-8 flex flex-col justify-between items-stretch">
            <div>
              <h3 className="text-2xl font-semibold mb-3">Need Immediate Help?</h3>
              <p className="text-slate-400 mb-6">Our support team is available to assist you right now.</p>
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-white font-semibold">Start Live Chat</a>
            </div>
            <div className="mt-6 self-end">
              <div className="w-48 h-48 rounded-xl bg-[#0b0f1a] flex items-center justify-center">
                {/* Decorative headphone graphic could go here */}
                <Headphones className="text-violet-500" size={56} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPageClient;
