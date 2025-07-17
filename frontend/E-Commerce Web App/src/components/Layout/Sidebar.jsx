import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onClose();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-blue-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Menu</h1>
          <button
            onClick={onClose}
            className="text-white text-3xl"
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center px-4 py-3 border-b border-blue-700"
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="flex-grow px-3 py-2 rounded-l-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="bg-blue-600 px-3 py-2 rounded-r-md hover:bg-blue-700 transition"
          >
            🔍
          </button>
        </form>

        <nav className="flex flex-col mt-4 space-y-2 px-4">
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Dashboard
          </Link>
          <Link
            to="/product"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Products
          </Link>
          <Link
            to="/orders"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className="relative px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute top-2 right-4 bg-red-600 text-white text-xs rounded-full px-1">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/wishlist"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={onClose}
            >
            Wishlist
            </Link>
          <Link
            to="/profile"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
