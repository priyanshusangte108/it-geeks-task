

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, title, description, price, image }) => {
  const imgSrc = image?.startsWith("http") ? image : `http://localhost:5000${image}`;
const navigate= useNavigate();

console.log('-------id', id)
  return (
    <div
      style={{ breakInside: "avoid", marginBottom: "1.5rem" }}
      className="bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.7)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.9)] transition-shadow duration-300 flex flex-col max-w-[250px] mx-auto"
    >
      {/* Product Image */}
      <div className="w-full pt-[100%] relative rounded-t-lg overflow-hidden bg-gray-50">
        <img
          src={imgSrc}
          alt={title}
          className="absolute top-1/2 left-1/2 w-[80%] h-[80%] object-contain -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105"
          loading="lazy"
          onError={(e) => (e.target.src = "https://via.placeholder.com/250?text=No+Image")}
        />
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h5 className="text-md font-semibold mb-2 text-gray-900 line-clamp-2">{title}</h5>
        <p className="text-gray-700 text-sm flex-grow line-clamp-3 mb-3">{description}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-indigo-600 font-bold text-lg">${price.toFixed(2)}</span>
          <button
          onClick={() => 
      navigate(`/products/${id}`)}
            type="button"
            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;








