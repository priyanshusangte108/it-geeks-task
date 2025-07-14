


import React, { useState, useEffect } from 'react';
import api from '../services/api';
import VideoSection from '../components/VideoSection';
import ImageSection from '../components/ImageSection';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    api.get('/products').then(res => {
      const data = res.data || [];
      setProducts(data);
      setFiltered(data);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    let data = products;
    if (search.trim()) data = data.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') data = data.filter(p => p.category === category);
    setFiltered(data);
  }, [search, category, products]);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white ">
      <div className="">
        <VideoSection />
        <h1 className="text-4xl font-extrabold text-center mb-10">🛍️ All Products</h1>
        <ImageSection />
        <ProductFilter
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          searchTerm={search}
          onSearchChange={setSearch}
        />
        {filtered.length ? (
          <div className="px-4">
            <ProductList products={filtered} />
          </div>
        ) : (
          <p className="text-center text-lg mt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
