

// src/pages/ProductListPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Adjust the path based on your API setup
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter'; // Build this component based on your needs
import VideoSection from '../components/videosection';
import Imagesection from '../components/Imagesection'


const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // Fetch the products from the API
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data); // Initially show all products
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  useEffect(() => {
    let data = [...products];
    if (search) {
      data = data.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== 'all') {
      data = data.filter(p => p.category === category);
    }
    setFiltered(data); // Set filtered products based on search and category
  }, [search, category, products]);

  // Get unique categories for filtering
  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <VideoSection /> {/* Optional video section */}
      <h1 className="text-4xl font-extrabold text-center mb-10">🛍️ All Products</h1>
      <Imagesection/>
      <ProductFilter 
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        searchTerm={search}
        onSearchChange={setSearch}
      />
      
      {/* Grid Layout for Product Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-2">
          {filtered.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg mt-10">No products found.</p>
      )}
    </div>
  );
};

export default ProductListPage;
