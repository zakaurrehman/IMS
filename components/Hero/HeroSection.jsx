"use client";
import { motion } from "framer-motion";

export default function HeroSection({ title, subtitle }) {
  return (
    <section className="relative bg-gradient-to-br from-[var(--endeavour)] via-[var(--rock-blue)] to-[var(--port-gore)] text-white 
      overflow-hidden min-h-[70vh] flex items-center justify-center py-16 md:py-32 lg:py-60">

      <div className="container px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display tracking-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Curved Background Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] z-0 pointer-events-none">
        <svg 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none" 
          className="w-full h-full text-white"
        >
          <path d="M0,160 C 400,160 800,60 1440,60 L 1440,320 L 0,320 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
