"use client";
import { motion } from "framer-motion";

export default function HeroSection({ title, subtitle }) {
  return (
    <section className="relative bg-gradient-to-br from-[#0055FF] via-[#0044CC] to-[#0033AA] text-white 
      overflow-hidden min-h-[70vh] flex items-center justify-center py-60">

      <div className="container px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display tracking-tight">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
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
