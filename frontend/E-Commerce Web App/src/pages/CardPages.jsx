

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0)
    return <div className="p-8 max-w-3xl mx-auto text-center text-gray-700">Your cart is empty.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map(({ _id, title, price, qty, images }) => (
          <div key={_id} className="flex items-center gap-6 border-b pb-4">
            <img
              src={images?.[0]?.url || "https://via.placeholder.com/100"}
              alt={title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-medium text-lg">{title}</h2>
              <p className="text-gray-600">${price.toFixed(2)} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(_id, qty - 1)}
                disabled={qty <= 1}
                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => updateQuantity(_id, Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center border rounded"
              />
              <button
                onClick={() => updateQuantity(_id, qty + 1)}
                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <p className="w-24 font-semibold">${(price * qty).toFixed(2)}</p>

            <button
              onClick={() => removeFromCart(_id)}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear Cart
        </button>

        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CartPage;
