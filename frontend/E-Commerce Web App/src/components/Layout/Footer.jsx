

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <footer className="bg-darkBackground dark:bg-lightBackground text-white dark:text-gray-900 transition-all duration-300 border-t border-gray-700 dark:border-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          
          {/* App Info */}
          <div className="text-center md:text-left max-w-xs">
            <h2 className="text-xl font-semibold text-blue-400 dark:text-blue-600">
              E-Commerce Store
            </h2>
            <p className="mt-2 text-sm text-white dark:text-gray-800">
              Your one-stop shop for electronics, fashion, home goods, and more. We deliver quality products with fast shipping and reliable service.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-2 md:space-y-4">
            <Link to="/profile" className="hover:text-blue-500 transition text-white dark:text-gray-900">👤 Profile</Link>
            <Link to="/cart" className="hover:text-blue-500 transition text-white dark:text-gray-900">🛒 Cart</Link>
            <Link to="/wishlist" className="hover:text-blue-500 transition text-white dark:text-gray-900">❤️ Wishlist</Link>
            <Link to="/orders" className="hover:text-blue-500 transition text-white dark:text-gray-900">📦 Orders</Link>
          </div>

          {/* Logout and Legal Links */}
          <div className="flex flex-col items-center space-y-3 md:items-end">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
            <div className="flex space-x-4 text-sm mt-2 text-white dark:text-gray-900">
              <Link to="#" className="hover:text-blue-500">Terms</Link>
              <Link to="#" className="hover:text-blue-500">Privacy</Link>
              <Link to="#" className="hover:text-blue-500">Support</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-700">
          &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
