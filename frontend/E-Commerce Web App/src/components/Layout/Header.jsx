// src/components/Layout/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-darkBackground shadow-md">
      {/* E-Commerce Branding */}
      <div className="text-xl font-bold text-primary dark:text-white">
        E-Commerce
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
      >
        Toggle Theme
      </button>
    </header>
  );
};

export default Header;
