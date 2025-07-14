
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const categories = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

const Header = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-blue-700 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          E-Commerce
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Search */}
          <input
            type="search"
            placeholder="Search products..."
            className="px-3 py-1 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Categories Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 rounded-md hover:bg-blue-600 transition-all">
              Categories ▼
            </button>
            <ul className="absolute left-0 top-full mt-2 w-40 bg-white text-gray-800 rounded-md shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {categories.map(cat => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Profile */}
          <Link to="/profile" className="text-xl hover:text-gray-300">
            👤
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-xl hover:text-gray-300">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-2xl"
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden  pb-4 space-y-4 bg-blue-600 text-white">
          {/* Search */}
          <input
            type="search"
            placeholder="Search products..."
            className="w-full  py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {/* Categories */}
          <div className="space-y-2">
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className="block px-3 py-2 rounded-md hover:bg-blue-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Profile */}
          <Link to="/profile" className="block px-3 py-2 rounded-md hover:bg-blue-500">
            👤 Profile
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative block px-3 py-2 rounded-md hover:bg-blue-500">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute top-1 right-2 bg-red-600 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
