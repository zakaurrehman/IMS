'use client';
import { useState, useEffect } from 'react';
import AnimatedCounter from './AnimatedCounter';
import styles from '../dashboard.module.css';

// Stat Card Component - Matching Figma Blue Pill Design
const StatCard = ({ title, value, icon: Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`${styles.statCard} ${isVisible ? styles.statCardVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.statIconWrapper}>
        <Icon className={styles.statIcon} />
      </div>
      <div className={styles.statContent}>
        <p className={styles.statTitle}>{title}</p>
        <h3 className={styles.statValue}>
          <AnimatedCounter value={value} duration={1500 + delay} />
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
