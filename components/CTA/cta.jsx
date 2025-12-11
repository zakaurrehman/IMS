'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative bg-[var(--selago)] py-24 overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl font-bold text-[var(--port-gore)] mb-6">
          Accelerate Your Business Growth
        </h2>
        <p className="text-base text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Manage contracts, invoices, and analytics seamlessly with our all-in-one SaaS platform. 
          Streamline your operations and make smarter decisions in real-time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link
            href="/signin"
            className="bg-[var(--endeavour)] text-white px-8 py-3 rounded-lg font-bold hover:bg-[var(--port-gore)] transition-all hover:shadow-lg"
          >
            Sign In
          </Link>
          <a
            href="mailto:contact@metalstrade.com"
            className="border-2 border-[var(--endeavour)] text-[var(--endeavour)] px-8 py-3 rounded-lg font-bold hover:bg-[var(--selago)] transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Angled Bottom Section - Transition to Footer */}
      <svg className="w-full h-auto absolute bottom-0 left-0" style={{ marginBottom: '-2px' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,60 L1440,0 L1440,120 L0,120 Z" fill="var(--endeavour)" />
      </svg>
    </section>
  );
}
