'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavbarLinks() {
  const pathname = usePathname(); // To highlight active link if needed

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/features', label: 'Features' },
    { href: '/blog', label: 'Blog' },
    { href: '/overview', label: 'Overview' },
      { href: '/dashboard', label: 'Dashboard' },
      

    
  ];

  return (
    <div className="flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-medium transition-colors ${
            pathname === link.href ? 'text-blue-200' : 'text-white hover:text-blue-100'
          }`}
        >
          {link.label}
        </Link>
      ))}

      {/* Sign In Link */}
      <Link
        href="/signin"
        className={`font-medium transition-colors ${
          pathname === '/signin' ? 'text-blue-200' : 'text-white hover:text-blue-100'
        }`}
      >
        Sign In
      </Link>

      {/* Contact Button */}
      <Link
        href="/contact"
        className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium"
      >
        Contact
      </Link>
    </div>
  );
}
