import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const Header = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // NavLinks component reused for both desktop and mobile views
  const NavLinks = ({ onLinkClick }) => (
    <>
      <Link
        to="/profile"
        className="text-xl hover:text-gray-300 block md:inline-block px-3 py-2"
        onClick={onLinkClick}
      >
        👤 Profile
      </Link>
      <Link
        to="/cart"
        className="relative text-xl hover:text-gray-300 block md:inline-block px-3 py-2"
        onClick={onLinkClick}
      >
        🛒 Cart
        {totalItems > 0 && (
          <span className="absolute top-1 right-3 bg-red-600 text-white text-xs rounded-full px-1">
            {totalItems}
          </span>
        )}
      </Link>
      <button
        onClick={() => {
          handleLogout();
          if (onLinkClick) onLinkClick();
        }}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold block md:inline-block"
      >
        Logout
      </button>
    </>
  );

  return (
    <header className="bg-blue-700 text-white sticky top-0 z-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold tracking-wide hover:text-gray-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          E-Commerce
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-xl hover:text-gray-200"
            >
              🔍
            </button>
          </form>

          {/* Reused NavLinks for desktop */}
          <NavLinks />
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white space-y-4 px-4 pb-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="pt-4 flex items-center gap-2">
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

          {/* Reused NavLinks for mobile with onLinkClick to close menu */}
          <NavLinks onLinkClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
