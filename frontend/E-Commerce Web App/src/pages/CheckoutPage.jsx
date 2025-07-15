// src/pages/CheckoutPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center text-gray-700 dark:text-gray-300">
        Your cart is empty.{' '}
        <button onClick={() => navigate('/dashboard')} className="text-indigo-600 underline">
          Continue shopping
        </button>.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      <div className="md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Summary</h2>
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {cart.map((i) => (
            <li key={i.id} className="py-2 flex justify-between text-gray-800 dark:text-gray-200">
              {i.title} x {i.qty}
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-4 font-bold text-lg text-gray-900 dark:text-white">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      <div className="md:w-2/3">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;
