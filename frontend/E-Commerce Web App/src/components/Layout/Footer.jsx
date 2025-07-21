import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/dashboard"; // Redirects only on logout
  };

  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-100 dark:text-black mt-16 border-t border-gray-700 dark:border-gray-300 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Store Info */}
        <div>
          <h2 className="text-xl font-bold mb-3 text-blue-400">E-Commerce Store</h2>
          <p className="text-sm">
            Your one-stop shop for fashion, electronics, groceries and more. Fast delivery & quality guaranteed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Shop</h3>
          <ul className="space-y-2">
            <li><Link to="/dashboard" className="hover:text-blue-400">Shop</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400">Sale</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400">Customer Care</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400">Stores</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold mb-2">My Account</h3>
          <ul className="space-y-2">
            <li><Link to="/profile" className="hover:text-blue-400">👤 Profile</Link></li>
            <li><Link to="/cart" className="hover:text-blue-400">🛒 Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-blue-400">❤️ Wishlist</Link></li>
            <li><Link to="/orders" className="hover:text-blue-400">📦 Orders</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="text-left text-red-500 hover:text-red-600"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
          <p className="text-sm mb-2">📞 +1 (385) 240-2913</p>
          <p className="text-sm mb-4">✉️ sales@itgeeks.com</p>

          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>

          {/* Socials */}
          <div className="flex space-x-4 mt-4 text-sm">
            <Link to="#" className="hover:text-blue-400">Facebook</Link>
            <Link to="#" className="hover:text-blue-400">Instagram</Link>
            <Link to="#" className="hover:text-blue-400">Twitter</Link>
            <Link to="#" className="hover:text-blue-400">YouTube</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-600 py-4 border-t border-gray-700 dark:border-gray-300">
        &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;



