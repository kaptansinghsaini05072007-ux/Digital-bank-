// package.json
{
  "name": "digital-bank",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "qrcode.react": "^3.1.0",
    "react-icons": "^4.7.0"
  }
}
// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const signup = (email, password, name) => {
    const newUser = {
      id: Date.now(),
      email,
      name,
      upiId: `${name.replace(/\s+/g, '').toLowerCase()}@digitalbank`,
      balance: 10000,
      transactions: []
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    localStorage.setItem('digitalBankUsers', JSON.stringify([...users, newUser]));
  };

  const login = (email, password) => {
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      setUser(userExists);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, users, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
