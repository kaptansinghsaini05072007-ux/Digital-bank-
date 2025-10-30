// src/components/Dashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="user-info">
          <h3>Hello, {user?.name}</h3>
          <p>UPI: {user?.upiId}</p>
        </div>
        <div className="profile-icon">👤</div>
      </div>

      {/* Balance Card */}
      <div className="balance-card">
        <div className="balance-label">Available Balance</div>
        <div className="balance-amount">₹{user?.balance}</div>
        <div className="balance-subtext">+ 10,000 coins welcome bonus</div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="action-btn">
          <div className="action-icon">📤</div>
          <span>Send</span>
        </div>
        <div className="action-btn">
          <div className="action-icon">📥</div>
          <span>Receive</span>
        </div>
        <div className="action-btn">
          <div className="action-icon">📊</div>
          <span>History</span>
        </div>
        <div className="action-btn">
          <div className="action-icon">📷</div>
          <span>Scan</span>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <div className="section-header">
          <h4>Recent Transactions</h4>
          <span>View All</span>
        </div>
        <div className="transactions-list">
          {user?.transactions?.length > 0 ? (
            user.transactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-name">{transaction.to}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount}
                </div>
              </div>
            ))
          ) : (
            <div className="no-transactions">
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
