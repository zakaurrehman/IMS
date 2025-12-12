'use client';
import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

// Task Statistic - Donut chart with badges (Figma design)
const TaskStatistic = ({ data = {}, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const taskData = {
    totalTasks: data.totalTasks || 476,
    overdueTasks: data.overdueTasks || 23,
    completeTasks: data.completeTasks || 186,
    tasks: data.tasks || [
      { label: 'Complete Task', value: 186, color: '#0366ae' },  // endeavour
      { label: 'Inprogress Task', value: 47, color: '#9fb8d4' },  // rock-blue
      { label: 'On Hold Task', value: 23, color: '#838ca7' },     // regent-gray
      { label: 'Review Task', value: 48, color: '#103a7a' },      // chathams-blue
      { label: 'Pending Task', value: 54, color: '#1c134d' },     // bunting
    ]
  };

  const total = taskData.tasks.reduce((acc, t) => acc + t.value, 0);
  
  // Calculate stroke-dasharray for donut segments
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className={`${styles.bottomCard} ${isVisible ? styles.bottomCardVisible : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <h3 className={styles.bottomCardTitle}>Task Statistic</h3>
      
      {/* Top Badges */}
      <div className={styles.taskBadges}>
        <div className={styles.taskBadge}>
          <span className={styles.taskBadgeLabel}>Total Tasks</span>
          <span className={styles.taskBadgeValue}>{taskData.totalTasks}</span>
        </div>
        <div className={`${styles.taskBadge} ${styles.taskBadgeOverdue}`}>
          <span className={styles.taskBadgeLabel}>Overdue Tasks</span>
          <span className={styles.taskBadgeValue}>{taskData.overdueTasks}</span>
        </div>
      </div>

      {/* Donut Chart */}
      <div className={styles.donutWrapper}>
        <svg className={styles.donutChart} viewBox="0 0 180 180">
          {taskData.tasks.map((task, index) => {
            const percentage = task.value / total;
            const dashLength = circumference * percentage;
            const dashOffset = circumference * offset;
            offset += percentage;
            
            return (
              <circle
                key={index}
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke={task.color}
                strokeWidth="20"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={-dashOffset}
                transform="rotate(-90 90 90)"
              />
            );
          })}
        </svg>
        <div className={styles.donutCenter}>
          <span className={styles.donutCenterLabel}>Complete Task</span>
          <span className={styles.donutCenterValue}>{taskData.completeTasks} Task</span>
        </div>
      </div>

      {/* Legend */}
      <div className={styles.taskLegend}>
        {taskData.tasks.map((task, index) => (
          <div key={index} className={styles.taskLegendItem}>
            <span className={styles.taskLegendDot} style={{ backgroundColor: task.color }} />
            <span className={styles.taskLegendLabel}>{task.label}</span>
            <span className={styles.taskLegendValue}>{task.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatistic;
