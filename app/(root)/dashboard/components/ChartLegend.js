'use client';
import styles from '../dashboard.module.css';

// Legend Component - Matching Figma
const ChartLegend = ({ items }) => (
  <div className={styles.legendWrapper}>
    {items.map((item, index) => (
      <div key={index} className={styles.legendItem}>
        <span className={styles.legendDot} style={{ backgroundColor: item.color }}></span>
        <span className={styles.legendLabel}>{item.label}</span>
      </div>
    ))}
  </div>
);

export default ChartLegend;
