

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const Header = ({ toggleSidebar }) => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold tracking-wide hover:text-gray-200"
        >
          E-Commerce
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 flex-grow max-w-lg mx-6"
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            aria-label="Search"
            className="text-xl hover:text-gray-200"
          >
            🔍
          </button>
        </form>

        {/* Cart & Profile (desktop only) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/profile"
            className="text-xl hover:text-gray-300 px-3 py-2"
          >
            👤 Profile
          </Link>
          <Link
            to="/cart"
            className="relative text-xl hover:text-gray-300 px-3 py-2"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute top-1 right-3 bg-red-600 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Menu button - always visible on right */}
        <button
          onClick={toggleSidebar}
          className="text-2xl ml-4"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
