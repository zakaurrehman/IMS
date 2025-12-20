import { Activity, Command, TrendingUp, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "./feature-card";

const features = [
  {
    icon: Activity,
    color: "bg-[#FF5555]", // Coral Red
    title: "Quick Onboarding",
    description: "Get started in minutes with our intuitive and easy-to-use setup."
  },
  {
    icon: Command,
    color: "bg-[var(--endeavour)]", // Site Blue
    title: "Bank-Grade Security",
    description: "Your data is fully encrypted and secured with industry-leading standards."
  },
  {
    icon: TrendingUp,
    color: "bg-[#F59E0B]", // Amber/Orange
    title: "Advanced Analytics",
    description: "Track performance, visualize trends, and make data-driven decisions."
  },
  {
    icon: MousePointer2,
    color: "bg-[#14B8A6]", // Teal
    title: "Global Reach",
    description: "Expand your operations with actionable insights from multiple locations."
  }
];

export default function Features() {
  return (
    <section className="relative py-16 md:py-32 z-10">
      {/* Angled Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
         <div 
           className="absolute inset-0 bg-gradient-to-r from-[var(--endeavour)] to-[var(--port-gore)]"
           style={{
             clipPath: "polygon(0 15%, 100% 0, 100% 85%, 0% 100%)" 
           }}
         />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white font-display tracking-tight">
            Everything you need to grow your business
          </h2>
        </motion.div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              icon={feature.icon}
              color={feature.color}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
