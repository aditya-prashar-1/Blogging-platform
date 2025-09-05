import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return toast.error('Please fill in all fields');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', formData);
      login(data);
      toast.success('Account created!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 480, margin: '40px auto', padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Create account</h1>
      <p style={{ marginBottom: 24, color: 'var(--text-light)' }}>Join the community</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full name</label>
          <input className="form-input" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-input" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-input" id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="At least 6 characters" />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14 }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;