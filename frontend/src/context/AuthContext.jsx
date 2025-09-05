import { createContext, useState, useEffect } from 'react';

// Named + default export
export const AuthContext = createContext();
const AuthContextDefault = AuthContext;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Accept server response { _id, name, email, token }
  const login = (data) => {
    const userData = { _id: data._id, name: data.name, email: data.email, token: data.token };
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextDefault;