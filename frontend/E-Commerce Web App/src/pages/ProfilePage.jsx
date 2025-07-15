// src/pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import api from '../services/api';

const ProfilePage = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [user, setUser] = useState(null);
  const [wishItems, setWishItems] = useState([]);

  useEffect(() => {
    api.get('/user/profile').then(res => setUser(res.data.user)).catch(console.error);
  }, []);

  useEffect(() => {
    if (wishlist.length) {
      api.get('/products', { params: { ids: wishlist.join(',') } })
         .then(res => setWishItems(res.data))
         .catch(console.error);
    } else setWishItems([]);
  }, [wishlist]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      {user ? (
        <div className="mb-8">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : <p>Loading...</p>}

      <section>
        <h2 className="text-2xl font-semibold mb-3">Wishlist</h2>
        {wishItems.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishItems.map(p => (
              <li key={p.id} className="bg-white rounded shadow p-4">
                <img src={p.image || p.images?.[0]?.url} alt={p.title} className="h-32 object-contain mb-2" />
                <h3 className="font-semibold">{p.title}</h3>
                <p>${p.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : <p>No items in wishlist.</p>}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Cart</h2>
        {cart.length ? (
          <ul className="divide-y">
            {cart.map(item => (
              <li key={item.id} className="py-3 flex justify-between">
                <span>{item.title} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : <p>Your cart is empty.</p>}
      </section>
    </div>
  );
};

export default ProfilePage;
