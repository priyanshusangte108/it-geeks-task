// src/pages/WishlistPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { wishlist } = useContext(WishlistContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (wishlist.length > 0) {
      api
        .get('/products', { params: { ids: wishlist.join(',') } })
        .then(res => setItems(Array.isArray(res.data) ? res.data : []))
        .catch(() => setItems([]));
    } else {
      setItems([]);
    }
  }, [wishlist]);

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        Your Wishlist
      </h1>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(p => (
            <ProductCard key={p._id || p.id} {...p} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
          No items in your wishlist.
        </p>
      )}
    </div>
  );
};

export default WishlistPage;
