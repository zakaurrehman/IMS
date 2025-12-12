'use client';
import { useState, useEffect, useRef } from 'react';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = numericValue * easeOutQuart;
      
      setCount(currentValue);
      
      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate);
      }
    };

    countRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(countRef.current);
  }, [value, duration]);

  // Format with dots like Figma (4.732)
  const formatCount = () => {
    if (count >= 1000) {
      return (count / 1000).toFixed(3).replace('.', '.');
    }
    return count.toFixed(3);
  };

  return <span>{formatCount()}</span>;
};

export default AnimatedCounter;
