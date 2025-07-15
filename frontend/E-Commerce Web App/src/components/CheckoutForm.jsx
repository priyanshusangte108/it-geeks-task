// src/components/CheckoutForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const CheckoutForm = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [shipping, setShipping] = useState({
    name: '', address: '', city: '', country: '', zip: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return setError('Cart is empty');
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/payment/create-checkout-session', {
        cartItems: cart, shippingInfo: shipping
      });
      window.location = res.data.url;
      clearCart();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Shipping Information</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','address','city','country','zip','phone'].map((field) => (
          <div key={field}>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">
              {field.charAt(0).toUpperCase()+field.slice(1)}
            </label>
            <input
              name={field}
              value={shipping[field]}
              onChange={onChange}
              required
              className="w-full p-2 border rounded focus:outline-indigo-400 dark:bg-gray-700 dark:text-white"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
