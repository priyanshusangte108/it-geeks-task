// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get('q')?.trim() || '';
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        const data = res.data.products || res.data;  // adapt to API
        setProducts(data);
      } catch (err) {
        console.error('Search fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(p =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
  }, [products, searchTerm]);

  if (loading) return <p className="p-6">Loading search results…</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Search results for: <span className="text-blue-600">"{searchTerm}"</span>
      </h1>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard
              key={product.id || product._id}
              id={product.id || product._id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              images={product.images}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
