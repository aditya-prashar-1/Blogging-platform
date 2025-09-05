import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="fade-in">
        <div className="container-narrow">
          {children || <Outlet />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;