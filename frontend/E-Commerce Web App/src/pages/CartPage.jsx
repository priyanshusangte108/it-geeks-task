
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { motion } from "framer-motion";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await axios.post("/api/checkout", { cartItems: cart });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("Checkout failed: No payment URL returned.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <motion.div
        className="p-8 max-w-3xl mx-auto text-center text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Your cart is empty.
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
        🛒 Shopping Cart
      </h1>

      {/* Cart Items */}
      <div className="flex flex-col space-y-8">
        {cart.map(({ id, title, price, qty, images, image }) => {
          const imgSrc = images?.[0]?.url || image || "https://via.placeholder.com/200x260?text=No+Image";

          return (
            <motion.div
              key={id}
              className="bg-white dark:bg-gray-800 rounded-lg border shadow p-6 flex flex-wrap items-center justify-between gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Product Image */}
              <img
                src={imgSrc}
                alt={title}
                className="w-[200px] h-[260px] object-cover rounded border"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200x260?text=No+Image";
                }}
              />

              {/* Info Section */}
              <div className="flex-1 min-w-[200px] ml-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  ${price.toFixed(2)} each
                </p>
              </div>

              {/* Quantity + Remove */}
              <div className="flex flex-col items-center min-w-[160px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(id, qty - 1)}
                    disabled={qty <= 1}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    –
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) =>
                      updateQuantity(id, Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center border rounded text-gray-800 dark:bg-gray-900 dark:text-white"
                  />

                  <button
                    onClick={() => updateQuantity(id, qty + 1)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold text-lg w-full max-w-[160px]"
                >
                  Remove
                </button>
              </div>

              {/* Subtotal */}
              <p className="w-24 text-right font-bold text-gray-900 dark:text-white text-lg">
                ${(price * qty).toFixed(2)}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Cart Footer */}
      <div className="mt-10 flex flex-wrap justify-between items-center gap-6">
        <button
          onClick={clearCart}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 text-lg font-bold"
        >
          🗑️ Clear Cart
        </button>

        <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6 text-right">
        <motion.button
          onClick={handleCheckout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-indigo-600 text-white text-xl font-bold rounded hover:bg-indigo-700 transition"
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartPage;
