// src/components/UI/ThemeToggle.jsx
import React from 'react';

const Themetoggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all duration-300"
    >
      Toggle Theme
    </button>
  );
};

export default Themetoggle;
