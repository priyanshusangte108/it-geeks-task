// src/components/Layout/LayoutWrapper.jsx
import React from 'react';
// import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layoutwrapper = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-lightBackground dark:bg-darkBackground transition-all duration-300">
      {/* Header Section */}
      {/* <Header /> */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Section */}
        <Sidebar />

        {/* Main Content Section (Right Side) */}
        <main className="flex-1 p-6 sm:p-8 overflow-auto bg-lightBackground dark:bg-darkBackground transition-all duration-300">
          {/* Here will go the dynamic content like Dashboard, Products, Orders, etc. */}
          {children}
        </main>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Layoutwrapper;
