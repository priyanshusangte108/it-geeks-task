





// src/components/ProductCard.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductCard = ({ id, title, description, price, image, images }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(wishlist.includes(id));

  const resolveImage = () => {
    if (Array.isArray(images) && images.length) {
      const first = images[0];
      return typeof first === 'object' ? first.url : first.startsWith('http') ? first : `http://localhost:5000${first}`;
    }
    if (image) return image.startsWith('http') ? image : `http://localhost:5000${image}`;
    return 'https://placehold.co/250x250?text=No+Image';
  };
  
  const imgSrc = resolveImage();

  // Truncate description to 100 characters
  const truncatedDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description;

  const handleAdd = () => {
    addToCart({ id, title, price, image: imgSrc, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1000); 
  };

  const handleLike = () => {
    toggleWishlist(id);
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col h-full relative transition-all duration-300 ease-in-out transform hover:scale-105">
      <button
        onClick={handleLike}
        className={`absolute top-2 right-2 text-xl ${liked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-all duration-300`}
        aria-label="Wishlist"
      >
        {liked ? '❤️' : '🤍'}
      </button>

      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={imgSrc} alt={title} className="max-w-full max-h-full object-contain transition-all duration-300 transform hover:scale-105" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        {/* Show truncated description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{truncatedDescription}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-600 font-bold">${typeof price === 'number' ? price.toFixed(2) : 'N/A'}</span>
          
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/products/${id}`)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
            >
              View
            </button>
            <button
              onClick={handleAdd}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
            >
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
