
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import DashboardPreview from "./dashboard-preview";

// export default function Hero() {
//   return (
//     <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0055FF] via-[#0044CC] to-[#0033AA] text-white overflow-hidden min-h-[110vh]">
//       {/* Main Content */}
//       <div className="container mx-auto px-4 relative z-20">
//         <div className="text-center max-w-4xl mx-auto">
//           {/* Heading */}
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight font-display"
//           >
//             Precision in Metal<br />Trading & Logistics
//           </motion.h1>

//           {/* Description */}
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-sm md:text-base text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
//           >
//             Comprehensive SaaS solution for Contracts, Invoices, and Financial Statements. Streamline your operations with real-time data.
//           </motion.p>

//           {/* Buttons */}
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
//           >
//             <Link href="/signin">
//               <span className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg shadow-blue-900/20 cursor-pointer inline-block hover:scale-105 active:scale-95">
//                 Sign In
//               </span>
//             </Link>
//             <a href="mailto:contact@metalstrade.com">
//               <span className="border border-white/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer inline-block backdrop-blur-sm hover:scale-105 active:scale-95">
//                 Contact Us <ArrowRight className="w-4 h-4" />
//               </span>
//             </a>
//           </motion.div>
//         </div>

//         {/* Dashboard Overlay */}
//         <DashboardPreview />
//       </div>

//       {/* Angled/Curved White Background Overlay */}
//       <div className="absolute bottom-0 left-0 right-0 h-[40%] z-0 pointer-events-none">
//          <svg 
//           viewBox="0 0 1440 400" 
//           preserveAspectRatio="none" 
//           className="w-full h-full text-white"
//         >
//             <path d="M0,200 C400,100 1000,300 1440,250 L1440,400 L0,400 Z" fill="currentColor" />
//         </svg>
//       </div>
//     </section>
//   );
// }
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import DashboardPreview from "./dashboard-preview";

export default function Hero() {
  return (
    <section className="relative pt-16 md:pt-32 pb-10 md:pb-20 bg-gradient-to-br from-[var(--endeavour)] via-[var(--rock-blue)] to-[var(--port-gore)] text-white overflow-hidden min-h-[70vh] md:min-h-[110vh]">
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Heading */}
        <motion.h1 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight font-display"
>
  Advanced Metal Trading<br />Operations & Logistics Platform
</motion.h1>

<motion.p 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="text-xs sm:text-sm md:text-base lg:text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
>
  A complete digital system designed for metal traders to manage contracts, logistics, pricing, 
  inventory, and financial documentation — all in one powerful dashboard with real-time accuracy.
</motion.p>


          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          >
            <Link href="/signin">
              <span className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg shadow-blue-900/20 cursor-pointer inline-block hover:scale-105 active:scale-95">
                Sign In
              </span>
            </Link>
            <a href="mailto:contact@metalstrade.com">
              <span className="border border-white/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer inline-block backdrop-blur-sm hover:scale-105 active:scale-95">
                Contact Us <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Dashboard Overlay */}
        <DashboardPreview />
      </div>

      {/* Angled/Curved White Background Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] z-0 pointer-events-none">
         <svg 
          viewBox="0 0 1440 400" 
          preserveAspectRatio="none" 
          className="w-full h-full text-white"
        >
            {/* Smooth S-curve rising from left to right */}
           <path d="M0,200 C 700,200 900,80 1440,80 L 1440,400 L 0,400 Z" fill="currentColor"  />
        </svg>
      </div>
    </section>
  );
}
