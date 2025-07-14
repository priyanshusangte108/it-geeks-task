




import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, title, description, price, image, images }) => {
  const navigate = useNavigate();

  const resolveImage = () => {
    if (Array.isArray(images) && images.length) {
      const first = images[0];
      return typeof first === 'object'
        ? first.url
        : typeof first === 'string' && first.startsWith('http')
          ? first
          : `http://localhost:5000${first}`;
    }

    if (typeof image === 'string' && image.trim()) {
      return image.startsWith('http')
        ? image
        : `http://localhost:5000${image}`;
    }

    return 'https://placehold.co/250x250?text=No+Image';
  };

  const imgSrc = resolveImage();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col h-full">
      <div className="w-full h-48 bg-gray-100 overflow-hidden flex items-center justify-center">
        <img
          src={imgSrc}
          alt={title}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/250x250?text=No+Image';
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow line-clamp-3 mb-4">{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-indigo-600 text-lg font-bold">${price.toFixed(2)}</span>
          <button
            onClick={() => navigate(`/products/${id}`)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
