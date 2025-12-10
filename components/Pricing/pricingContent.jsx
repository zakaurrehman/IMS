'use client';

import PricingCard from './pricingCard';

export default function PricingContent() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        'Up to 100 invoices',
        'Basic reporting',
        '1 user account',
        'Email support',
        '5GB storage',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Best for growing companies',
      features: [
        'Unlimited invoices',
        'Advanced reporting',
        '5 user accounts',
        'Priority support',
        '100GB storage',
        'Custom workflows',
        'API access',
      ],
      cta: 'Try Free',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale operations',
      features: [
        'Unlimited everything',
        'Dedicated account manager',
        'Unlimited users',
        '24/7 phone support',
        'Unlimited storage',
        'Custom integrations',
        'SLA guaranteed',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan} />
      ))}
    </div>
  );
}
