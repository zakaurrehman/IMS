'use client';
import styles from '../dashboard.module.css';

// Mini Bar Chart Component - White bars for stat cards
const MiniBarChart = ({ data = [] }) => {
  const chartData = data.length > 0 ? data : [40, 65, 45, 75, 55, 85, 60, 90, 70, 80, 55, 70];
  const maxValue = Math.max(...chartData);

  return (
    <div className={styles.miniBarChart}>
      {chartData.map((value, index) => (
        <div
          key={index}
          className={styles.miniBar}
          style={{ height: `${(value / maxValue) * 100}%` }}
        />
      ))}
    </div>
  );
};

export default MiniBarChart;
