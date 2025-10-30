// src/components/TransactionHistory.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);

  const getTransactionIcon = (type) => {
    return type === 'sent' ? '📤' : '📥';
  };

  const getTransactionColor = (type) => {
    return type === 'sent' ? '#ff4444' : '#00D200';
  };

  return (
    <div className="transaction-history-container">
      <div className="history-header">
        <h2>Transaction History</h2>
        <p>All your transactions in one place</p>
      </div>

      <div className="balance-summary">
        <div className="balance-item">
          <div className="balance-title">Total Balance</div>
          <div className="balance-value">₹{user?.balance}</div>
        </div>
      </div>

      <div className="transactions-tabs">
        <button className="tab-active">All Transactions</button>
        <button>Sent</button>
        <button>Received</button>
      </div>

      <div className="transactions-list">
        {user?.transactions?.length > 0 ? (
          user.transactions.map(transaction => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-icon">
                {getTransactionIcon(transaction.type)}
              </div>
              
              <div className="transaction-details">
                <div className="transaction-main">
                  <div className="transaction-name">
                    {transaction.type === 'sent' ? 'To: ' : 'From: '}
                    {transaction.to}
                  </div>
                  <div 
                    className="transaction-amount"
                    style={{ color: getTransactionColor(transaction.type) }}
                  >
                    {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount}
                  </div>
                </div>
                
                <div className="transaction-meta">
                  <div className="transaction-purpose">{transaction.purpose}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
              </div>

              <div 
                className="transaction-status"
                style={{ 
                  background: transaction.type === 'sent' ? '#FFF0F0' : '#F0FFF0',
                  color: transaction.type === 'sent' ? '#ff4444' : '#00D200'
                }}
              >
                {transaction.type === 'sent' ? 'Sent' : 'Received'}
              </div>
            </div>
          ))
        ) : (
          <div className="no-transactions">
            <div className="no-transactions-icon">📊</div>
            <h3>No transactions yet</h3>
            <p>Your transactions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
