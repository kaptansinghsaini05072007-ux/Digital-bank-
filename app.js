// src/App.js
import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import ReceiveMoney from './components/ReceiveMoney';
import TransactionHistory from './components/TransactionHistory';
import './styles/theme.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <Login onSwitchToSignup={() => setCurrentView('signup')} />;
      case 'signup':
        return <Signup onSwitchToLogin={() => setCurrentView('login')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'send':
        return <SendMoney />;
      case 'receive':
        return <ReceiveMoney />;
      case 'history':
        return <TransactionHistory />;
      default:
        return <Login onSwitchToSignup={() => setCurrentView('signup')} />;
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        {renderView()}
        
        {/* Bottom Navigation */}
        {user && (
          <div className="bottom-nav">
            <button onClick={() => setCurrentView('dashboard')}>🏠</button>
            <button onClick={() => setCurrentView('send')}>📤</button>
            <button onClick={() => setCurrentView('receive')}>📥</button>
            <button onClick={() => setCurrentView('history')}>📊</button>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
