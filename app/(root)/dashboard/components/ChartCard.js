'use client';
import { useState, useEffect } from 'react';
import YearDropdown from './YearDropdown';
import styles from '../dashboard.module.css';

// Chart Card Component with Animation
const ChartCard = ({ title, children, delay = 0, showYearDropdown = false, year, setYear }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`${styles.chartCard} ${isVisible ? styles.chartCardVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>{title}</h3>
        {showYearDropdown && <YearDropdown year={year} setYear={setYear} />}
      </div>
      <div className={styles.chartContent}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
