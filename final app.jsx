// Final App.js with complete navigation
import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import ReceiveMoney from './components/ReceiveMoney';
import TransactionHistory from './components/TransactionHistory';
import './styles/theme.css';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

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
    <div className="App">
      {renderView()}
      
      {/* Bottom Navigation - Only when user is logged in */}
      {user && currentView !== 'login' && currentView !== 'signup' && (
        <div className="bottom-nav">
          <button 
            onClick={() => setCurrentView('dashboard')}
            style={{ color: currentView === 'dashboard' ? '#6F1EB2' : '#666' }}
          >
            🏠
          </button>
          <button 
            onClick={() => setCurrentView('send')}
            style={{ color: currentView === 'send' ? '#6F1EB2' : '#666' }}
          >
            📤
          </button>
          <button 
            onClick={() => setCurrentView('receive')}
            style={{ color: currentView === 'receive' ? '#6F1EB2' : '#666' }}
          >
            📥
          </button>
          <button 
            onClick={() => setCurrentView('history')}
            style={{ color: currentView === 'history' ? '#6F1EB2' : '#666' }}
          >
            📊
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
