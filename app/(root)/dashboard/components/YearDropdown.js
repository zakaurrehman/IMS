'use client';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import styles from '../dashboard.module.css';

// Year Dropdown Component
const YearDropdown = ({ year, setYear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const years = ['2025', '2024', '2023', '2022', '2021'];

  return (
    <div className={styles.dropdownWrapper}>
      <button 
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {year}
        <FiChevronDown className={`${styles.dropdownIcon} ${isOpen ? styles.dropdownIconOpen : ''}`} />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {years.map((y) => (
            <button
              key={y}
              className={`${styles.dropdownItem} ${y === year ? styles.dropdownItemActive : ''}`}
              onClick={() => { setYear(y); setIsOpen(false); }}
            >
              {y}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
