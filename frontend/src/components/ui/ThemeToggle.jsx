import { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <span className="toggle-icon">☀️</span>
      ) : (
        <span className="toggle-icon">🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;