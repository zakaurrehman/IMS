'use client';
import { useState, useEffect } from 'react';
import MiniBarChart from './MiniBarChart';
import styles from '../dashboard.module.css';

// Stat Card With Chart - Blue pill with value and mini bar chart (Figma design)
const StatCardWithChart = ({ title, value, prefix = '', change = 0, chartData = [], delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;
    const duration = 1500 + delay;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(numericValue * easeOutQuart);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, delay]);

  const formatValue = (num) => {
    if (num >= 10000) return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (num >= 100) return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return Math.round(num).toString();
  };

  const isPositive = change >= 0;

  return (
    <div 
      className={`${styles.statCardWithChart} ${isVisible ? styles.statCardWithChartVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.statCardLeftContent}>
        <p className={styles.statCardTitle}>{title}</p>
        <h3 className={styles.statCardValue}>{prefix}{formatValue(displayValue)}</h3>
        <span className={`${styles.statCardChange} ${isPositive ? styles.statCardChangePositive : styles.statCardChangeNegative}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
      <div className={styles.statCardRightContent}>
        <MiniBarChart data={chartData} />
      </div>
    </div>
  );
};

export default StatCardWithChart;
