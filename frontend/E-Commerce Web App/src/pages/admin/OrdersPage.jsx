// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('/api/orders', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrders(res.data.orders || []);
//       } catch (err) {
//         console.error('Failed to fetch orders', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <div className="p-6">Loading orders...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
//       {orders.length === 0 ? (
//         <div className="text-gray-600 text-center text-lg">
//           You haven’t placed any orders yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border rounded p-4 bg-white shadow dark:bg-gray-800"
//             >
//               <h2 className="text-xl font-bold text-indigo-600">Order #{order._id}</h2>
//               <ul className="mt-2 text-sm text-gray-700 dark:text-gray-200">
//                 {order.items.map((item, index) => (
//                   <li key={index}>
//                     {item.title} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
//                   </li>
//                 ))}
//               </ul>
//               <p className="mt-2 font-bold text-gray-900 dark:text-white">
//                 Total: ${order.total.toFixed(2)}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;


import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyOrders = [
  {
    _id: 'order1',
    items: [
      { title: 'Product A', qty: 2, price: 30 },
      { title: 'Product B', qty: 1, price: 20 },
    ],
    total: 80,
    paymentStatus: 'Paid',
  },
  {
    _id: 'order2',
    items: [
      { title: 'Product A', qty: 1, price: 30 },
      { title: 'Product C', qty: 3, price: 15 },
    ],
    total: 75,
    paymentStatus: 'Paid',
  },
  {
    _id: 'order3',
    items: [
      { title: 'Product B', qty: 2, price: 20 },
      { title: 'Product C', qty: 1, price: 15 },
    ],
    total: 55,
    paymentStatus: 'Pending',
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetch with dummy data
  useEffect(() => {
    // simulate API delay
    setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Prepare data for Bar chart: total qty per product across all orders
  const productQtyMap = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      if (productQtyMap[item.title]) {
        productQtyMap[item.title] += item.qty;
      } else {
        productQtyMap[item.title] = item.qty;
      }
    });
  });

  const chartData = {
    labels: Object.keys(productQtyMap),
    datasets: [
      {
        label: 'Quantity Sold',
        data: Object.values(productQtyMap),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind indigo-500 with opacity
      },
    ],
  };

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Order Management</h1>

      {orders.length === 0 ? (
        <div className="text-gray-600 text-center text-lg">
          No orders found.
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Orders List</h2>
            <div className="space-y-6">
              {orders.map(order => (
                <div
                  key={order._id}
                  className="border rounded p-4 bg-white shadow dark:bg-gray-800"
                >
                  <h3 className="text-xl font-bold text-indigo-600">
                    Order #{order._id}
                  </h3>
                  <ul className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.title} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-gray-900 dark:text-white">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <p>Status: {order.paymentStatus}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Sales by Product</h2>
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
