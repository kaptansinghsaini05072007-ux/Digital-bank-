// src/components/ReceiveMoney.js
import React, { useContext } from 'react';
import QRCode from 'qrcode.react';
import { AuthContext } from '../context/AuthContext';
import './ReceiveMoney.css';

const ReceiveMoney = () => {
  const { user } = useContext(AuthContext);

  const shareUPI = () => {
    navigator.clipboard.writeText(user.upiId);
    alert('UPI ID copied to clipboard!');
  };

  return (
    <div className="receive-money-container">
      <div className="receive-header">
        <h2>Receive Money</h2>
        <p>Share your QR code or UPI ID</p>
      </div>

      <div className="qr-section">
        <div className="qr-code-container">
          <QRCode 
            value={user?.upiId} 
            size={200}
            fgColor="#6F1EB2"
            level="H"
          />
        </div>
        <p className="qr-note">Scan QR code to pay</p>
      </div>

      <div className="upi-section">
        <div className="upi-id-card">
          <div className="upi-label">Your UPI ID</div>
          <div className="upi-value">{user?.upiId}</div>
          <button onClick={shareUPI} className="copy-upi-btn">
            Copy UPI ID
          </button>
        </div>
      </div>

      <div className="receive-instructions">
        <h4>How to receive money?</h4>
        <div className="instruction-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-text">Share your QR code or UPI ID</div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-text">Ask sender to scan or enter UPI ID</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Money will be credited instantly</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveMoney;
