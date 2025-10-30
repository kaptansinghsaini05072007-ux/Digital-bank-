// src/components/Signup.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    signup(formData.email, formData.password, formData.name);
    alert('Account created successfully!');
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>Create Account</h2>
        <p>Join Digital Bank</p>
      </div>
      
      <form onSubmit={handleSignup} className="signup-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-btn">
          Create Account
        </button>
      </form>

      <div className="switch-auth">
        <p>Already have an account? 
          <span onClick={onSwitchToLogin}> Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
