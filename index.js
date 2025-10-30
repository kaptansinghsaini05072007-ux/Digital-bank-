// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';
import App from './App';

// Initialize users data in localStorage
const initializeApp = () => {
  const existingUsers = localStorage.getItem('digitalBankUsers');
  if (!existingUsers) {
    const demoUsers = [
      {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@test.com",
        password: "123456",
        upiId: "rahulsharma@digitalbank",
        balance: 10000,
        transactions: []
      },
      {
        id: 2,
        name: "Priya Patel",
        email: "priya@test.com", 
        password: "123456",
        upiId: "priyapatel@digitalbank",
        balance: 10000,
        transactions: []
      },
      {
        id: 3,
        name: "Amit Kumar",
        email: "amit@test.com",
        password: "123456", 
        upiId: "amitkumar@digitalbank",
        balance: 10000,
        transactions: []
      }
    ];
    localStorage.setItem('digitalBankUsers', JSON.stringify(demoUsers));
  }
};

initializeApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
