import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center text-gray-700">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
        Shopping Cart
      </h1>

      {/* ✅ Cart Items List with vertical spacing */}
      <div className="flex flex-col space-y-8">
        {cart.map(({ id, title, price, qty, images, image }) => {
          const imgSrc = images?.[0]?.url || image || "https://via.placeholder.com/80";

          return (
            <div
              key={id}
              className="bg-white dark:bg-gray-800 rounded border shadow p-6 flex flex-wrap items-center justify-between"
            >
              {/* Image */}
              <img
                src={imgSrc}
                alt={title}
                className="w-[200px] h-[260px] object-cover rounded border"
              />

              {/* Details */}
<div className="flex-1 min-w-[200px] ml-4">
  <h2 className="text-xl font-bold text-gray-800 dark:text-white !font-bold !text-xl">
    {title}
  </h2>
  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1 !font-bold !text-2xl">
    ${price.toFixed(2)} each
  </p>
</div>

              {/* Quantity & Remove */}
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

                {/* Remove Button */}
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
            </div>
          );
        })}
      </div>

      {/* Footer */}
     <div className="mt-10 flex flex-wrap justify-between items-center gap-6">
  <button
    onClick={clearCart}
    className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 text-lg font-bold"
  >
    Clear Cart
  </button>

  <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
    Total: ${total.toFixed(2)}
  </div>
</div>
    </div>
  );
};

export default CartPage;
