// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-secondary text-white p-4 shadow-lg transition-all duration-300">
      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="block py-2 px-4 rounded hover:bg-primary transition-all duration-300"
        >
         
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
