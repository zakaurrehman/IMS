'use client';
import { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';

// Clients Payment Table - Dark blue table with pagination (Figma design)
const ClientsPayment = ({ data = [], delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState('All Data');
  const [filterYear, setFilterYear] = useState('2022');
  const [showDataDropdown, setShowDataDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const payments = data.length > 0 ? data : [
    { id: 1, name: 'Martin Lewis', email: 'martinlewis@gmail.com', paymentType: 'Paypal', paidDate: '17.08.2022', paidTime: '10:00 AM', amount: 240, status: 'inactive', avatar: 'ML' },
    { id: 2, name: 'Sofia Annisa', email: 'annisasofia@gmail.com', paymentType: 'Paypal', paidDate: '16.08.2022', paidTime: '10:00 AM', amount: 170, status: 'active', avatar: 'SA' },
    { id: 3, name: 'Shakir Ramzi', email: 'shakirramzi@gmail.com', paymentType: 'Paypal', paidDate: '15.08.2022', paidTime: '10:00 AM', amount: 350, status: 'inactive', avatar: 'SR' },
    { id: 4, name: 'Matius Okoye', email: 'matiusokoy@gmail.com', paymentType: 'Paypal', paidDate: '14.08.2022', paidTime: '10:00 AM', amount: 570, status: 'active', avatar: 'MO' },
  ];

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  const getAvatarColor = (index) => {
    const colors = ['#0366ae', '#9fb8d4', '#103a7a', '#1c134d'];  // endeavour, rock-blue, chathams-blue, bunting
    return colors[index % colors.length];
  };

  const dataOptions = ['All Data', 'Active', 'Inactive'];
  const yearOptions = ['2025', '2024', '2023', '2022', '2021'];

  return (
    <div className={`${styles.paymentsCard} ${isVisible ? styles.paymentsCardVisible : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {/* Header */}
      <div className={styles.paymentsHeader}>
        <h3 className={styles.paymentsTitle}>Clients Payment</h3>
        <div className={styles.paymentsFilters}>
          {/* All Data Dropdown */}
          <div className={styles.filterDropdown}>
            <button 
              className={styles.filterButton}
              onClick={() => { setShowDataDropdown(!showDataDropdown); setShowYearDropdown(false); }}
            >
              {filterData}
              <svg className={styles.filterIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {showDataDropdown && (
              <div className={styles.filterMenu}>
                {dataOptions.map((option) => (
                  <button
                    key={option}
                    className={`${styles.filterMenuItem} ${filterData === option ? styles.filterMenuItemActive : ''}`}
                    onClick={() => { setFilterData(option); setShowDataDropdown(false); }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className={styles.filterDropdown}>
            <button 
              className={styles.filterButton}
              onClick={() => { setShowYearDropdown(!showYearDropdown); setShowDataDropdown(false); }}
            >
              {filterYear}
              <svg className={styles.filterIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {showYearDropdown && (
              <div className={styles.filterMenu}>
                {yearOptions.map((option) => (
                  <button
                    key={option}
                    className={`${styles.filterMenuItem} ${filterYear === option ? styles.filterMenuItemActive : ''}`}
                    onClick={() => { setFilterYear(option); setShowYearDropdown(false); }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.paymentsTableWrapper}>
        <table className={styles.paymentsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Payment Type</th>
              <th>Paid Date</th>
              <th>Paid Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment, index) => (
              <tr key={payment.id}>
                <td>
                  <div className={styles.paymentUser}>
                    <div className={styles.paymentAvatar} style={{ backgroundColor: getAvatarColor(index) }}>
                      {payment.avatar}
                    </div>
                    <span className={styles.paymentName}>{payment.name}</span>
                  </div>
                </td>
                <td>{payment.email}</td>
                <td>{payment.paymentType}</td>
                <td>
                  <div className={styles.paymentDate}>
                    <span>{payment.paidDate}</span>
                    <span className={styles.paymentTime}>{payment.paidTime}</span>
                  </div>
                </td>
                <td>${payment.amount}</td>
                <td>
                  <span className={`${styles.paymentStatus} ${payment.status === 'active' ? styles.paymentStatusActive : styles.paymentStatusInactive}`}>
                    <span className={styles.paymentStatusDot} />
                    {payment.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className={styles.paymentActions}>
                    <button className={styles.actionButton} title="Delete">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button className={styles.actionButton} title="Edit">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.paymentsPagination}>
        <span className={styles.paginationInfo}>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, payments.length)} of {payments.length} entries
        </span>
        <div className={styles.paginationControls}>
          <button 
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.paginationNumber} ${currentPage === page ? styles.paginationNumberActive : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button 
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientsPayment;