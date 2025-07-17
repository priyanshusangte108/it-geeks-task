// src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex md:flex-col z-40`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          {/* Close button visible only on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-2xl md:hidden"
            aria-label="Close sidebar"
          >
            &times;
          </button>
        </div>

        <nav className="flex flex-col mt-4 space-y-2 px-4">
          <Link
            to="/admin/dashboard"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            Orders
          </Link>
          <button
            onClick={handleLogout}
            className="mt-6 px-3 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between bg-blue-700 text-white p-4 shadow-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-3xl md:hidden"
            aria-label="Open sidebar"
          >
            &#9776;
          </button>
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          {/* Add admin profile or other header items here */}
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
