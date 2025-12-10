'use client';

import PricingFeatures from './pricingFeatures';

export default function PricingCard({ plan }) {
  const baseClasses =
    'flex flex-col h-full p-8 rounded-xl border-2 transition-all duration-300 hover:shadow-xl';
  const classes = plan.highlighted
    ? `${baseClasses} border-blue-600 bg-blue-50 scale-105`
    : `${baseClasses} border-gray-200 bg-white`;

  return (
    <div className={classes}>
      {plan.highlighted && (
        <span className="inline-block w-fit px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
          Most Popular
        </span>
      )}

      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-gray-600 text-sm"> {plan.period}</span>
      </div>

      <button
        className={`w-full py-3 px-4 rounded-lg font-semibold mb-8 transition-colors ${
          plan.highlighted
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
        }`}
      >
        {plan.cta}
      </button>

      <PricingFeatures features={plan.features} />
    </div>
  );
}
