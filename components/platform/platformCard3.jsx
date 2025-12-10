'use client';

import { motion } from "framer-motion";
import { Lock, MoreHorizontal, Check } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Button } from "@components/ui/button";

// Mock Data for Charts
const lineData = [
  { time: "10:30 AM", value: 30 },
  { time: "11:00 AM", value: 25 },
  { time: "11:30 AM", value: 45 },
  { time: "12:00 PM", value: 30 },
  { time: "12:30 PM", value: 55 },
  { time: "01:00 PM", value: 40 },
  { time: "01:30 PM", value: 65 },
  { time: "02:00 PM", value: 50 },
  { time: "02:30 PM", value: 70 },
];

const creditBalanceData = [
  { value: 30 },
  { value: 40 },
  { value: 35 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
  { value: 55 },
];

export function PlatformCard3() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative min-h-[400px]">
      
      {/* Left: Credit Balance Card */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative min-h-[400px] w-full py-12 lg:pl-12 h-full"
      >
        {/* Main Card */}
        <div className="relative z-10 bg-gradient-to-r from-[#0074F0] to-[#0056D2] rounded-2xl p-6 text-white shadow-2xl shadow-blue-500/20 w-[85%]">
          <div className="flex justify-between items-start mb-6">
            <span className="text-sm font-medium opacity-90">Credit Balance</span>
            <MoreHorizontal className="w-6 h-6 opacity-70" />
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-bold tracking-tight">$25,215</h3>
            <div className="h-10 w-20 pb-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={creditBalanceData}>
                   <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="white" 
                    strokeWidth={2} 
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Background Chart Elements */}
        <div className="absolute top-32 left-0 right-0 h-48 w-full z-0 pointer-events-none">
           <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F0F4FF" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#F8F9FB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="natural" 
                dataKey="value" 
                stroke="#0056D2" 
                strokeWidth={3} 
                fill="url(#grad2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Shield Icon Overlay */}
        <div 
          className="absolute bottom-8 right-8 md:right-16 bg-[#0056D2] w-28 h-32 flex items-center justify-center shadow-2xl shadow-blue-900/30 z-20 cursor-pointer hover:scale-105 transition-transform duration-300"
          style={{ borderRadius: '10px 10px 50px 50px' }}
        >
           <div className="bg-white rounded-full p-2 shadow-sm">
             <Check className="w-8 h-8 text-[#0056D2] stroke-[4px]" />
           </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute bottom-24 left-12 w-24 h-3 bg-blue-100/50 rounded-full blur-sm" />
        <div className="absolute bottom-16 left-24 w-16 h-2 bg-purple-100/50 rounded-full blur-sm" />
      </motion.div>

      {/* Right: Security & Protection */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-start space-y-6 py-12 lg:pl-12 h-full justify-start"
      >
        <div className="w-16 h-16 bg-[#0056D2] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
          <Lock className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#0056D2] tracking-tight">Secure & Reliable</h2>
          <p className="text-gray-500 leading-relaxed text-lg">
            Protect your financial data with industry-standard security protocols. 
            Keep your transactions safe and maintain complete peace of mind.
          </p>
        </div>
        <Button className="bg-[#0056D2] hover:bg-[#0044A5] text-white px-8 py-6 rounded-xl text-lg font-medium shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 cursor-pointer">
          Learn More
        </Button>
      </motion.div>
    </div>
  );
}
