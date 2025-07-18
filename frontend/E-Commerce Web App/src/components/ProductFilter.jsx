
import React, { useState, useRef, useEffect } from 'react';

const ProductFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* <h2 className="text-2xl font-semibold mb-6 text-center">Filter Products</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Dropdown */}
        <div ref={dropdownRef} className="relative">
          <label className="block text-lg font-medium mb-2">Category</label>
          <button
            onClick={() => setDropdownOpen(prev => !prev)}
            className="w-full h-16 px-5 text-lg border rounded-lg bg-white shadow-sm text-left"
          >
            {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
          </button>
          {dropdownOpen && (
            <ul className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg max-h-64 overflow-auto text-lg">
              <li
                className={`py-3 px-5 cursor-pointer ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => {
                  onCategoryChange('all');
                  setDropdownOpen(false);
                }}
              >
                All Categories
              </li>
              {categories.map(cat => (
                <li
                  key={cat}
                  className={`py-3 px-5 cursor-pointer ${cat === selectedCategory ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => {
                    onCategoryChange(cat);
                    setDropdownOpen(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={e => e.preventDefault()}>
          <label className="block text-lg font-medium mb-2">Search</label>
          <div className="relative h-16">
            <input
              type="search"
              className="block w-full h-full pl-14 pr-32 text-lg border rounded-lg bg-gray-50"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
            />
            <svg className="w-6 h-6 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0a7 7 0 1110-10 7 7 0 01-10 10z"/>
            </svg>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 text-white px-6 py-2 rounded-lg text-lg">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFilter;
