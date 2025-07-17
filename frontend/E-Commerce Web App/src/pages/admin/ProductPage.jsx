import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ProductCard from '../../components/ProductCard';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {products.length ? products.map(p => <ProductCard key={p._id} {...p} />) : <p>No products found.</p>}
      </div>
    </div>
  );
};

export default ProductPage;
