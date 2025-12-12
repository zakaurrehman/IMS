'use client';
import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

// Subscriptions Statistic - Progress bars card (Figma design)
const SubscriptionsStatistic = ({ data = [], delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const items = data.length > 0 ? data : [
    { label: 'Subscriptions', current: 12, total: 60 },
    { label: 'Pending Invoice', current: 15, total: 90 },
    { label: 'Pending Invoice', current: 15, total: 90 },
    { label: 'Complete Projects', current: 90, total: 120 },
    { label: 'Open Tickets', current: 20, total: 120 },
    { label: 'Closed Tickets', current: 40, total: 100 },
  ];

  return (
    <div className={`${styles.bottomCard} ${isVisible ? styles.bottomCardVisible : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <h3 className={styles.bottomCardTitle}>Subscriptions Statistic</h3>
      <div className={styles.progressList}>
        {items.map((item, index) => (
          <div key={index} className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>{item.label}</span>
              <span className={styles.progressValue}>{item.current}/{item.total}</span>
            </div>
            <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${(item.current / item.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsStatistic;
