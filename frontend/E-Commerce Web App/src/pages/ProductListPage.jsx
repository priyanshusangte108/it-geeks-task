
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

import Imagesection from '../components/Imagesection';
import VideoSection from '../components/videosection';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  useEffect(() => {
    let data = [...products];
    if (search) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== 'all') {
      data = data.filter(p => p.category === category);
    }
    setFiltered(data);
  }, [search, category, products]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white overflow-x-hidden">
      
      {/* Full-width video section */}
      <div className="w-full">
        <VideoSection />
      </div>

      {/* Main content with padding */}
      <div className="px-4 sm:px-8 xl:px-24">
        <h1 className="text-4xl font-extrabold text-center mb-10">🛍️ All Products</h1>

        <Imagesection />

        <ProductFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          searchTerm={search}
          onSearchChange={setSearch}
        />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
