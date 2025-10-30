// src/components/SendMoney.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './SendMoney.css';

const SendMoney = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const { user, users, setUsers } = useContext(AuthContext);

  const handleSendMoney = (e) => {
    e.preventDefault();
    
    if (!recipient || !amount) {
      alert('Please fill all fields!');
      return;
    }

    const amountNum = parseInt(amount);
    if (amountNum > user.balance) {
      alert('Insufficient balance!');
      return;
    }

    // Find recipient
    const recipientUser = users.find(u => 
      u.upiId === recipient || u.email === recipient
    );

    if (!recipientUser) {
      alert('Recipient not found!');
      return;
    }

    // Create transaction
    const transaction = {
      id: Date.now(),
      to: recipientUser.name,
      amount: amountNum,
      type: 'sent',
      date: new Date().toLocaleDateString(),
      purpose: purpose || 'Payment'
    };

    // Update sender balance and transactions
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          balance: u.balance - amountNum,
          transactions: [transaction, ...u.transactions]
        };
      }
      if (u.id === recipientUser.id) {
        const recipientTransaction = {
          ...transaction,
          type: 'received',
          to: user.name
        };
        return {
          ...u,
          balance: u.balance + amountNum,
          transactions: [recipientTransaction, ...u.transactions]
        };
      }
      return u;
    });

    setUsers(updatedUsers);
    localStorage.setItem('digitalBankUsers', JSON.stringify(updatedUsers));
    
    alert(`₹${amount} sent successfully to ${recipientUser.name}!`);
    setRecipient('');
    setAmount('');
    setPurpose('');
  };

  return (
    <div className="send-money-container">
      <div className="send-money-header">
        <h2>Send Money</h2>
        <p>Transfer instantly to any UPI ID</p>
      </div>

      <form onSubmit={handleSendMoney} className="send-money-form">
        <div className="input-group">
          <label>Recipient UPI ID or Email</label>
          <input
            type="text"
            placeholder="eg: john@digitalbank"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            max={user?.balance}
            required
          />
        </div>

        <div className="input-group">
          <label>Purpose (Optional)</label>
          <input
            type="text"
            placeholder="eg: Lunch, Shopping, etc."
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        <button type="submit" className="send-money-btn">
          Send ₹{amount || '0'}
        </button>
      </form>

      <div className="quick-contacts">
        <h4>Quick Contacts</h4>
        <div className="contacts-list">
          {users.filter(u => u.id !== user?.id).map(contact => (
            <div 
              key={contact.id} 
              className="contact-item"
              onClick={() => setRecipient(contact.upiId)}
            >
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-upi">{contact.upiId}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
