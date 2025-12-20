'use client';

import React from 'react';
import PricingContent from './pricingContent';

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Choose the perfect plan for your business needs. No hidden fees.
        </p>
        <PricingContent />
      </div>
    </section>
  );
}
