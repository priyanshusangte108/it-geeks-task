import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Confetti from 'react-confetti';

const OrderSuccessPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionId = new URLSearchParams(search).get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    axios.post('/api/orders/confirm', { sessionId }).then(res => {
      setOrder(res.data.order);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <div>Processing...</div>;
  if (!order) return <div>Error confirming order.</div>;

  return (
    <div className="relative p-8 max-w-xl mx-auto text-center bg-white dark:bg-gray-800 rounded shadow">
      <Confetti numberOfPieces={300} />
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
      <p>Thank you for your purchase.</p>
      <div className="mt-4 text-left">
        <h2 className="text-xl font-semibold">Details:</h2>
        <ul>
          {order.items.map(i => (
            <li key={i.id}>
              {i.title} x {i.qty}: ${(i.price * i.qty).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="font-bold">Total Paid: ${order.total.toFixed(2)}</p>
      </div>
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccessPage;
