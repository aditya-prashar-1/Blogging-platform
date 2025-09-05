import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ui/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="navbar-brand">Blogify</Link>
          </div>
          
          <div className="navbar-center">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search posts..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="search-btn">Search</button>
            </form>
          </div>

          <div className="navbar-right">
            <Link to="/" className="navbar-link">Home</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/create-post" className="navbar-link">Write</Link>
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                <div className="user-menu">
                  <span className="user-name">{user?.name}</span>
                  <button onClick={logout} className="btn btn-secondary btn-sm">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;