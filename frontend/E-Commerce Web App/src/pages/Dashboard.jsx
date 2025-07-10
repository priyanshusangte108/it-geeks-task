// client/src/pages/Dashboard.jsx
import React from 'react';

export default function Dashboard() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-lg">Here you can manage products, orders, and users.</p>
    </div>
  );
}


// // src/pages/Dashboard.jsx
// import React from 'react';

// const Dashboard = () => {
//   return (
//     <div className="space-y-6">
//       {/* Dashboard Header */}
//       <h1 className="text-3xl font-bold mb-4 text-primary">Dashboard</h1>

//       {/* Dashboard Content */}
//       <div className="space-y-4">
//         <p className="text-lg">
//           Welcome to your dashboard. Here you can manage your products, orders, and more.
//         </p>

//         <div className="flex space-x-4">
//           {/* Links to Manage Products and Orders */}
//           <a
//             href="/products"
//             className="py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
//           >
//             Manage Products
//           </a>
//           <a
//             href="/orders"
//             className="py-3 px-6 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all duration-300"
//           >
//             Manage Orders
//           </a>
//         </div>
//       </div>

//       {/* Example of additional dynamic content, like product stats or order details */}
//       <div className="mt-8 p-6 bg-gray-100 dark:bg-darkBackground rounded-lg">
//         <h3 className="text-xl font-semibold text-primary">Dashboard Stats</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
//           {/* Example Stats Boxes */}
//           <div className="bg-white dark:bg-darkBackground p-4 rounded-lg shadow-md">
//             <h4 className="text-lg">Total Products</h4>
//             <p className="text-2xl">100</p>
//           </div>
//           <div className="bg-white dark:bg-darkBackground p-4 rounded-lg shadow-md">
//             <h4 className="text-lg">Total Orders</h4>
//             <p className="text-2xl">50</p>
//           </div>
//           <div className="bg-white dark:bg-darkBackground p-4 rounded-lg shadow-md">
//             <h4 className="text-lg">Total Revenue</h4>
//             <p className="text-2xl">$5000</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
