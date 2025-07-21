
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ThemeContext } from '../../context/ThemeContext';

const Header = ({ toggleSidebar }) => {
  const { cart } = useContext(CartContext);
  const { toggleTheme, isDark } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-blue-700 text-white sticky top-0 z-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold hover:text-gray-200">
          E-Commerce
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 flex-grow max-w-lg mx-6"
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none"
          />
          <button type="submit" className="text-xl hover:text-gray-200">
            🔍
          </button>
        </form>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/profile" className="text-xl hover:text-gray-300 px-3 py-2">👤 Profile</Link>
          <Link to="/cart" className="relative text-xl hover:text-gray-300 px-3 py-2">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute top-1 right-3 bg-red-600 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-3 ml-4">
          {/* ☰ Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="text-2xl"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          {/*  Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-xl bg-gray-900 px-3 py-1 rounded hover:bg-gray-700"
            aria-label="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
