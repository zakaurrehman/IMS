'use client';
import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

// Subscriptions List - User cards with status (Figma design)
const SubscriptionsList = ({ items = [], count = 0, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const subscriptions = items.length > 0 ? items : [
    { 
      id: 1, 
      name: 'Martin Lewis', 
      role: 'Ceo at Bukalapak', 
      date: '4 Sep 2022', 
      status: 'pending',
      avatar: 'ML'
    },
    { 
      id: 2, 
      name: 'Sofia Annisa', 
      role: 'Ceo at Tokopedia', 
      date: '3 Sep 2022', 
      status: 'approved',
      avatar: 'SA'
    },
    { 
      id: 3, 
      name: 'Shakir Ramzi', 
      role: 'Ceo at Dana', 
      date: '2 Sep 2022', 
      status: 'approved',
      avatar: 'SR'
    },
  ];

  const getAvatarColor = (index) => {
    const colors = ['#0366ae', '#9fb8d4', '#103a7a', '#1c134d'];  // endeavour, rock-blue, chathams-blue, bunting
    return colors[index % colors.length];
  };

  return (
    <div className={`${styles.bottomCard} ${isVisible ? styles.bottomCardVisible : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className={styles.subscriptionsListHeader}>
        <h3 className={styles.bottomCardTitle}>Subscriptions</h3>
        <span className={styles.subscriptionsBadge}>{count || subscriptions.length}</span>
      </div>
      <div className={styles.userCardList}>
        {subscriptions.map((item, index) => (
          <div key={item.id} className={styles.userCard}>
            <div className={styles.userAvatar} style={{ backgroundColor: getAvatarColor(index) }}>
              {item.avatar}
            </div>
            <div className={styles.userInfo}>
              <h4 className={styles.userName}>{item.name}</h4>
              <p className={styles.userRole}>{item.role}</p>
              <p className={styles.userDate}>{item.date}</p>
            </div>
            <span className={`${styles.userStatus} ${item.status === 'approved' ? styles.statusApproved : styles.statusPending}`}>
              {item.status === 'approved' ? 'Approved' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsList;
