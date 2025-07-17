

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layoutwrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-lightBackground dark:bg-darkBackground transition-all duration-300">
      <Header toggleSidebar={toggleSidebar} />

      <main
        className="flex-1 overflow-auto bg-lightBackground dark:bg-darkBackground transition-all duration-300 p-4"
        onClick={closeSidebar} // close sidebar if clicking main content
      >
        {children}
      </main>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <Footer />
    </div>
  );
};

export default Layoutwrapper;
