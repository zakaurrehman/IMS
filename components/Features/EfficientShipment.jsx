
'use client';

import { motion } from 'framer-motion';
import { Layers, PieChart, Grid3x3, TrendingUp } from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-start gap-4 group cursor-pointer"
  >
    <div className="p-4 rounded-2xl bg-[var(--endeavour)] text-white shadow-lg shadow-[var(--endeavour)]/10 group-hover:scale-105 transition-transform duration-300">
      <Icon size={28} strokeWidth={2} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-[var(--endeavour)] mb-3 group-hover:opacity-80 transition-opacity">
        {title}
      </h3>
      <p className="text-slate-500 text-[15px] leading-relaxed max-w-[260px]">
        {description}
      </p>
    </div>
  </motion.div>
);

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white overflow-hidden flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Title */}
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-[var(--endeavour)] text-center mb-16"
          >
            Efficient Shipment Management
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative min-h-[600px]">
            
            {/* Left Column */}
            <div className="flex flex-col justify-between py-12 lg:pl-12 h-full">
              <FeatureCard 
                icon={Layers}
                title="Accounting"
                description="Manage invoices, track expenses, and streamline financial reporting."
                delay={0.1}
              />
              <FeatureCard 
                icon={PieChart}
                title="Contracts"
                description="Create, track, and store contracts with ease and security."
                delay={0.2}
              />
            </div>

            {/* Center Column - Visualization */}
            <div className="relative flex flex-col items-center justify-center py-10">
              <h3 className="text-xl font-bold text-[#0F172A] mb-16 absolute top-12">Global Statistics</h3>
              
              <div className="relative w-[400px] h-[400px] flex items-center justify-center mt-12">
                {/* Sales Trend Floating Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute -top-2 -right-2 z-20 bg-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[200px] border border-slate-50"
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium mb-1">Sales trend</span>
                    <span className="text-3xl font-bold text-[#0F172A] mb-4">68%</span>
                    <div className="h-16 w-full relative">
                      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#0EA5E9" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,40 C20,35 30,15 50,25 S80,10 100,35"
                          fill="none"
                          stroke="#F59E0B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.8"
                        />
                        <path
                          d="M0,35 C20,25 30,5 50,15 S80,0 100,30"
                          fill="none"
                          stroke="url(#trendGradient)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute -bottom-2 right-0 w-16 h-1.5 bg-blue-100/50 rounded-full">
                        <div className="w-10 h-full bg-blue-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Main Rings SVG */}
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="blueRing" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                    <linearGradient id="purpleRing" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="#D946EF" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                    <linearGradient id="orangeRing" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                  </defs>

                  <circle cx="200" cy="200" r="160" fill="none" stroke="#F8FAFC" strokeWidth="14" strokeLinecap="round" />
                  <motion.circle 
                    cx="200" cy="200" r="160" fill="none" stroke="url(#blueRing)" strokeWidth="14" strokeLinecap="round"
                    strokeDasharray="1005"
                    strokeDashoffset="1005"
                    whileInView={{ strokeDashoffset: 1005 - (1005 * 0.75) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <circle cx="200" cy="200" r="115" fill="none" stroke="#F8FAFC" strokeWidth="14" strokeLinecap="round" />
                  <motion.circle 
                    cx="200" cy="200" r="115" fill="none" stroke="url(#purpleRing)" strokeWidth="14" strokeLinecap="round"
                    strokeDasharray="722"
                    strokeDashoffset="722"
                    whileInView={{ strokeDashoffset: 722 - (722 * 0.65) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  />
                  <circle cx="200" cy="200" r="70" fill="none" stroke="#F8FAFC" strokeWidth="14" strokeLinecap="round" />
                  <motion.circle 
                    cx="200" cy="200" r="70" fill="none" stroke="url(#orangeRing)" strokeWidth="14" strokeLinecap="round"
                    strokeDasharray="440"
                    strokeDashoffset="440"
                    whileInView={{ strokeDashoffset: 440 - (440 * 0.85) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center bg-white rounded-full p-8 shadow-sm z-10 w-32 h-32 justify-center border border-slate-50">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                        <TrendingUp size={12} className="text-blue-500" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Growth</span>
                    </div>
                    <span className="text-3xl font-bold text-[#0F172A]">68%</span>
                  </div>
                </div>

                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full flex justify-center gap-12">
                   <div className="w-32 h-[2px] border-t-2 border-dashed border-slate-100"></div>
                   <div className="w-32 h-[2px] border-t-2 border-dashed border-slate-100"></div>
                </div>
              </div>
              
              <div className="mt-20 grid grid-cols-2 gap-8 w-full max-w-[300px]">
                <div className="space-y-3">
                  <div className="h-2.5 bg-slate-100 rounded-full w-full"></div>
                  <div className="h-2.5 bg-slate-100 rounded-full w-2/3"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 bg-slate-100 rounded-full w-full"></div>
                  <div className="h-2.5 bg-slate-100 rounded-full w-2/3"></div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-between py-12 lg:pl-12 h-full">
              <FeatureCard 
                icon={Grid3x3}
                title="Invoices"
                description="Generate and manage invoices efficiently with ease."
                delay={0.3}
              />
              <FeatureCard 
                icon={TrendingUp}
                title="Expenses"
                description="Track expenses and optimize financial performance."
                delay={0.4}
              />
            </div>

          </div>

          {/* Learn More Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-16"
          >
            <button className="px-10 py-4 bg-[var(--endeavour)] text-white font-bold rounded-md hover:bg-[var(--port-gore)] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
              Learn More
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
