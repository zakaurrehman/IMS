'use client';

import Link from 'next/link';

export default function NavbarMenu({ isMenuOpen }) {
  if (!isMenuOpen) return null;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    // { href: '/pricing', label: 'Pricing' },
     { href: '/contact', label: 'Contact' },
  { href: '/features', label: 'Features' },
    { href: '/blog', label: 'Blog' },
    // { href: '/overview', label: 'Overview' },
      { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <div className="flex flex-col space-y-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-white hover:text-blue-100 font-medium py-2"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/signin"
        className="text-white hover:text-blue-100 font-medium py-2"
      >
        Sign In
      </Link>
      <a
        href="/contact"
        className="border-2 border-white text-white px-4 py-2 rounded-lg text-center hover:bg-white hover:text-blue-600 transition-colors font-medium"
      >
        Contact
      </a>
    </div>
  );
}
