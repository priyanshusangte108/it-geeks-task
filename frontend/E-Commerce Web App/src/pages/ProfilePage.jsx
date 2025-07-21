
// src/pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import api from '../services/api';

const ProfilePage = () => {
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  const [user, setUser] = useState(null);
  const [wishItems, setWishItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    api.get('/user/profile')
      .then(rs => setUser(rs.data.user))
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    if (wishlist.length) {
      api.get('/products', { params: { ids: wishlist.join(',') } })
        .then(rs => setWishItems(Array.isArray(rs.data) ? rs.data : []))
        .catch(() => setWishItems([]));
    } else setWishItems([]);
  }, [wishlist]);

  useEffect(() => {
    if (cart.length) {
      api.get('/products', { params: { ids: cart.map(i => i.id).join(',') } })
        .then(rs => {
          const data = Array.isArray(rs.data) ? rs.data : [];
          setCartItems(data.map(prod => {
            const match = cart.find(c => c.id === prod._id || c.id === prod.id);
            return { ...prod, qty: match?.qty || 1 };
          }));
        })
        .catch(() => setCartItems([]));
    } else setCartItems([]);
  }, [cart]);

  const handleOrder = async () => {
    if (!cartItems.length) return;
    setOrderError('');

    try {
      const res = await api.post('/checkout', { cartItems });
      window.location.href = res.data.url;
    } catch (e) {
      console.error('Checkout error:', e);
      setOrderError('Failed to start checkout. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 transition-colors duration-300 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow transition-colors duration-300">
        {user ? (
          <>
            <p><strong className="font-semibold">Name:</strong> {user.name}</p>
            <p><strong className="font-semibold">Email:</strong> {user.email}</p>
            <p><strong className="font-semibold">Role:</strong> {user.role || 'customer'}</p>
          </>
        ) : (
          <p>Loading user...</p>
        )}
      </div>

      {/* Wishlist */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">❤️ Wishlist</h2>
        {wishItems.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishItems.map(p => (
              <li key={p._id || p.id} className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col transition-colors duration-300">
                <img
                  src={p.images?.[0]?.url || p.image || 'https://placehold.co/200'}
                  alt={p.title}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-blue-600 font-semibold mb-4">${(p.price ?? 0).toFixed(2)}</p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
                  >Add to Cart</button>
                  <button
                    onClick={() => removeFromWishlist(p._id || p.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                  >Remove</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in wishlist.</p>
        )}
      </section>

      {/* Cart */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🛒 Cart</h2>
        {cartItems.length ? (
          <>
            <ul className="divide-y dark:divide-gray-700 mb-4">
              {cartItems.map(item => (
                <li key={item._id || item.id} className="py-3 flex justify-between items-center">
                  <span>{item.title} × {item.qty}</span>
                  <span>${((item.price ?? 0) * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="text-right mb-4">
              <p className="text-lg font-bold">
                Total: ${cartItems.reduce((sum, i) => sum + ((i.price ?? 0) * i.qty), 0).toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleOrder}
              className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >Place order</button>

            {orderError && <p className="mt-2 text-red-500">{orderError}</p>}
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
