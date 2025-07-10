// client/src/components/Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaShoppingCart, FaUser } from 'react-icons/fa';


export default function Layout() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/">E-Shop</Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/cart" className="hover:underline"><FaShoppingCart /></Link>
          <Link to="/profile" className="hover:underline"><FaUser /></Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </nav>
      </header>

      {/* Animated Page Transition */}
      <main className="flex-grow p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Route Content */}
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 p-4 text-center text-sm shadow-inner">
        &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
      </footer>
    </div>
  );
}
