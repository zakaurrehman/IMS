'use client';

export default function Footer() {
  return (
    <footer className="relative bg-[#0055FF] text-white overflow-hidden pt-20">
      <div className="relative container mx-auto px-16 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-5 gap-24 mb-24">
          {/* Brand Column - Left */}
          <div className="col-span-1">
            <div className="mb-8">
              {/* Logo */}
              <div className="inline-flex items-center justify-center  rounded w-16 h-16 mb-6">
                <span className="text-[#FFFFFF] font-bold text-2xl">IMS</span>
              </div>
              
              {/* Description */}
              <p className="text-white/80 text-xs leading-relaxed mb-8">
                IMS provides innovative solutions for businesses worldwide, helping them grow with technology and expertise.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-blue-500/40 hover:bg-blue-500/60 rounded flex items-center justify-center transition-colors text-white text-sm font-semibold">
                🌐
              </a>
              <a href="#" className="w-9 h-9 bg-blue-500/40 hover:bg-blue-500/60 rounded flex items-center justify-center transition-colors text-white text-xs font-bold">
                f
              </a>
              <a href="#" className="w-9 h-9 bg-blue-500/40 hover:bg-blue-500/60 rounded flex items-center justify-center transition-colors text-white text-xs font-bold">
                𝕏
              </a>
              <a href="#" className="w-9 h-9 bg-blue-500/40 hover:bg-blue-500/60 rounded flex items-center justify-center transition-colors text-white text-xs font-bold">
                G
              </a>
              <a href="#" className="w-9 h-9 bg-blue-500/40 hover:bg-blue-500/60 rounded flex items-center justify-center transition-colors text-white text-xs font-bold">
                in
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold text-white mb-8 text-sm">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Landing Page</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Features</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Documentation</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Referral Program</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Pricing</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-white mb-8 text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">About IMS</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Careers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Customers</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Contact Us</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Partners</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-white mb-8 text-sm">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Guides</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">API Documentation</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Community</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-white mb-8 text-sm">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Cookie Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-xs">Data Protection</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/60 text-xs text-center">
            © 2025 IMS Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
