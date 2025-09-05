// filepath: e:\blogging-platform\frontend\src\pages\VerifyOtpPage.jsx
import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import '../styles/AuthPages.css';
import AnimatedBackground from '../components/AnimatedBackground';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    // Redirect if email is not in state (e.g., direct navigation)
    navigate('/register');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      login(data.token);
      toast.success('Email verified successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <AnimatedBackground />
      <div className="auth-form-container">
        <h1 className="auth-title">Verify Your Email</h1>
        <p className="auth-subtitle">An OTP has been sent to {email}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otp">One-Time Password (OTP)</label>
            <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter the 6-digit code" required />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;