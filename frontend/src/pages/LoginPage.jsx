// Simplified, clean UI; no 3D background
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return toast.error('Please fill in all fields');
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(data);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 480, margin: '40px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Sign in</h1>
      <p style={{ marginBottom: 24, color: 'var(--text-light)' }}>Access your account</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-input" id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        Don’t have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
};

export default LoginPage;