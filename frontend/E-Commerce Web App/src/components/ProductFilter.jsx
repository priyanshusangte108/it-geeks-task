import React, { useState, useRef, useEffect } from "react";

const ProductFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (cat) => {
    onCategoryChange(cat);
    setDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Filter Products
      </h2>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Category Dropdown */}
        <div ref={dropdownRef}>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Category
          </label>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full h-16 px-5 text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {selectedCategory === "all"
              ? "Select the category"
              : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </button>
          {dropdownOpen && (
            <ul
              className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-auto text-lg"
              role="listbox"
              tabIndex={-1}
            >
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer select-none relative py-3 px-5 ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "text-gray-900 hover:bg-blue-100"
                  }`}
                  role="option"
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Column 2: Search Input & Button */}
        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative h-16">
            <input
              type="search"
              id="default-search"
              className="block w-full h-full pl-14 pr-32 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0a7 7 0 1110-10 7 7 0 01-10 10z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-lg px-6 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFilter;
