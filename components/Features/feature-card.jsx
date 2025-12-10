import { motion } from "framer-motion";

export default function FeatureCard({ icon: Icon, color, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl p-8 shadow-lg h-full flex flex-col items-start text-left"
    >
      {/* Icon with rounded square background */}
      <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mb-6 shadow-md`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <h3 className="text-[#004488] font-bold text-lg mb-4">
        {title}
      </h3>
      
      <p className="text-gray-500 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
