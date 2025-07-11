
 

// // src/components/Layout/Header.jsx
// import React, { useContext } from 'react';

// import { Link } from 'react-router-dom';
// import { CartContext } from '../../context/CartContext';

// const Header = () => {
//   const { cart } = useContext(CartContext);
//   const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

//   return (
//     <header className="flex justify-between items-center p-4 bg-white dark:bg-darkBackground shadow-md">
//       {/* Branding */}
//       <Link
//         to="/"
//         className="text-xl font-bold text-primary dark:text-white"
//       >
//         E-Commerce
//       </Link>

//       <div className="flex items-center gap-4">
//         {/* Cart Icon with count */}
//         <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 text-xl">
//           🛒 shop
//           {totalItems > 0 && (
//             <span className="absolute -top-2 -right-3 text-xs bg-red-600 text-white rounded-full px-1.5 py-0.5">
//               {totalItems}
//             </span>
//           )}
//         </Link>

//         {/* Theme Toggle */}
//         <button
//           onClick={() =>
//             document.documentElement.classList.toggle('dark')
//           }
//           className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
//         >
//           Toggle Theme
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;
