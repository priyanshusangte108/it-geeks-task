// src/components/Layout/Footer.jsx
import React from 'react';

const Footer = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="flex justify-between items-center">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>

        {/* Copyright Notice */}
        <div className="text-sm">
          &copy; 2025 E-Commerce Store. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
