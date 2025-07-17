import api from './api';

const confirmOrder = async (sessionId) => {
  const token = localStorage.getItem('token');
  const res = await api.post(
    '/orders/confirm',
    { sessionId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.order;
};

const orderService = {
  confirmOrder,
};

export default orderService;
