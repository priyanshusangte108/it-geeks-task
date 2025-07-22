// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isDark, setIsDark] = useState(false);

//   // Detect dark mode
//   useEffect(() => {
//     const checkDark = () => {
//       setIsDark(document.documentElement.classList.contains('dark'));
//     };

//     checkDark();

//     const observer = new MutationObserver(checkDark);
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

//     return () => observer.disconnect();
//   }, []);

//   // Fetch real orders from backend
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('/api/orders', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data.orders || []);
//       } catch (error) {
//         console.error('Failed to fetch orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Aggregate quantity sold per product
//   const productQtyMap = {};
//   orders.forEach(order => {
//     order.items.forEach(item => {
//       productQtyMap[item.title] = (productQtyMap[item.title] || 0) + item.qty;
//     });
//   });

//   // Revenue per order
//   const revenueByOrder = orders.map((order, index) => ({
//     label: `Order #${index + 1}`,
//     total: order.total,
//   }));

//   // Dark/light theme colors
//   const textColor = isDark ? '#D1D5DB' : '#374151';
//   const gridColor = isDark ? '#4B5563' : '#E5E7EB';
//   const legendColor = isDark ? '#D1D5DB' : '#374151';

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: { color: legendColor },
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: textColor },
//         grid: { color: gridColor },
//       },
//       y: {
//         ticks: { color: textColor },
//         grid: { color: gridColor },
//       },
//     },
//   };

//   const salesChartData = {
//     labels: Object.keys(productQtyMap),
//     datasets: [
//       {
//         label: 'Quantity Sold',
//         data: Object.values(productQtyMap),
//         backgroundColor: 'rgba(59, 130, 246, 0.7)', // indigo-500
//       },
//     ],
//   };

//   const revenueChartData = {
//     labels: revenueByOrder.map(r => r.label),
//     datasets: [
//       {
//         label: 'Revenue ($)',
//         data: revenueByOrder.map(r => r.total),
//         backgroundColor: 'rgba(16, 185, 129, 0.7)', // emerald-500
//       },
//     ],
//   };

//   if (loading) {
//     return (
//       <div className="p-6 text-gray-700 dark:text-gray-300">Loading your orders...</div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
//         Your Orders
//       </h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-lg text-gray-600 dark:text-gray-400">
//           You haven’t placed any orders yet.
//         </p>
//       ) : (
//         <>
//           {/* Orders List */}
//           <div className="mb-10">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
//               Orders List
//             </h2>
//             <div className="space-y-6">
//               {orders.map(order => (
//                 <div
//                   key={order._id}
//                   className="border rounded-lg p-5 bg-white shadow-sm dark:bg-gray-800"
//                 >
//                   <h2 className="text-xl font-bold text-indigo-600">
//                     Order #{order._id}
//                   </h2>
//                   <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
//                     {order.items.map((item, idx) => (
//                       <li key={idx}>
//                         {item.title} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
//                       </li>
//                     ))}
//                   </ul>
//                   <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
//                     Total: ${order.total.toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Sales Chart */}
//           <div className="mb-10">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
//               Sales by Product
//             </h2>
//             <Bar data={salesChartData} options={chartOptions} />
//           </div>

//           {/* Revenue Chart */}
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
//               Revenue by Order
//             </h2>
//             <Bar data={revenueChartData} options={chartOptions} />
//           </div>
//         </>
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

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy orders data
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
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode dynamically
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Simulate fetching orders
  useEffect(() => {
    setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 1000);
  }, []);

  // Aggregate quantity sold by product
  const productQtyMap = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      productQtyMap[item.title] = (productQtyMap[item.title] || 0) + item.qty;
    });
  });

  // Prepare revenue data per order
  const revenueByOrder = orders.map((order, index) => ({
    label: `Order #${index + 1}`,
    total: order.total,
  }));

  // Colors based on theme
  const textColor = isDark ? '#D1D5DB' : '#374151'; // gray-300 or gray-700
  const gridColor = isDark ? '#4B5563' : '#E5E7EB'; // gray-600 or gray-200
  const legendColor = isDark ? '#D1D5DB' : '#374151';

  // Chart config
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: legendColor },
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  // Product sales chart (by quantity)
  const salesChartData = {
    labels: Object.keys(productQtyMap),
    datasets: [
      {
        label: 'Quantity Sold',
        data: Object.values(productQtyMap),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // indigo-500
      },
    ],
  };

  // Revenue chart (by order)
  const revenueChartData = {
    labels: revenueByOrder.map(r => r.label),
    datasets: [
      {
        label: 'Revenue ($)',
        data: revenueByOrder.map(r => r.total),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // emerald-500
      },
    ],
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-700 dark:text-gray-300">Loading orders...</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Order Management
      </h1>

      {orders.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-400 text-center text-lg">
          No orders found.
        </div>
      ) : (
        <>
          {/* Orders List */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Orders List
            </h2>
            <div className="space-y-6">
              {orders.map(order => (
                <div
                  key={order._id}
                  className="border rounded p-4 bg-white shadow dark:bg-gray-800"
                >
                  <h3 className="text-xl font-bold text-indigo-600">
                    Order #{order._id}
                  </h3>
                  <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.title} x {item.qty} = ${(item.price * item.qty).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  <p className="text-gray-800 dark:text-gray-300">
                    Status: {order.paymentStatus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Product Chart */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Sales by Product
            </h2>
            <Bar data={salesChartData} options={commonOptions} />
          </div>

          {/* Revenue Trend Chart */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Revenue by Order
            </h2>
            <Bar data={revenueChartData} options={commonOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
